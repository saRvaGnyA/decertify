import { StyleSheet, Text, View } from "react-native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import WalletConnectProvider from "@walletconnect/web3-provider";
import "@ethersproject/shims";
import { ethers, Contract } from "ethers";
import { abi, contractAddress } from "../constants";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { styled } from "nativewind";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import { getDocumentAsync } from "expo-document-picker";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState("");
  const connector = useWalletConnect();
  const [blobFile, setBlobFile] = useState();
  const [fileName, setFileName] = useState("");
  const [cid, setCid] = useState("");

  const handleReg = async (data) => {
    const provider = new WalletConnectProvider({
      rpc: {
        44787: "https://alfajores-forno.celo-testnet.org",
      },
      chainId: 44787,
      connector: connector,
    });
    await provider.enable();
    const ethers_provider = new ethers.providers.Web3Provider(provider);
    const signer = ethers_provider.getSigner();

    const regContract = new Contract(contractAddress, abi, signer);
    const cidVal = await regContract.getHashedVal(data);
    setCid(cidVal);
    console.log(cidVal);
  };

  const compareDocs = async () => {
    const url = `https://ipfs.io/ipfs/${cid}/verified_doc.pdf`;
    let blob = await fetch(url).then((r) => r.blob());
    console.log(blob);
    console.log(blob == blobFile);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanData(data);
    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);
    handleReg(data);
  };

  const pickDocument = async () => {
    let result = await getDocumentAsync({
      copyToCacheDirectory: false,
    });
    console.log(result);
    if (result != null) {
      const r = await fetch(result.uri);
      const b = await r.blob();
      setFileName(result.name);
      setBlobFile(b);
      //setIsChoosed(true)
      console.log(b);
      compareDocs();
    }
  };

  return (
    <View style={styles.container}>
      {!scanData ? (
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
      ) : (
        <StyledView className="flex-1 items-center justify-center ">
          <StyledText className="font-extrabold text-3xl ">
            Upload your copy of the
          </StyledText>
          <StyledText className="animate-bounce font-extrabold text-3xl">
            document
          </StyledText>
          <Button
            className="bg-gray-300 px-4 rounded-full"
            onPress={() => {
              pickDocument();
            }}
          >
            <View className="flex-row items-center">
              <Ionicons name="document" className="px-12" size={48} />
              <StyledText className="font-extrabold text-xl px-4">
                Pick Document
              </StyledText>
            </View>
          </Button>
        </StyledView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
