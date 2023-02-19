import { Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import "@ethersproject/shims";
import { ethers, Contract } from "ethers";
import { abi, contractAddress } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function StudentConnectWallet() {
  const navigation = useNavigation();
  const connector = useWalletConnect();

  const handleReg = async () => {
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
    const getregistered = await regContract.checkIfStudentRegistered();
    if (getregistered) {
      navigation.navigate("Register");
    } else {
      navigation.navigate("Student");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const connectWalletFn = async () => {
    await connector.connect();
  };

  return (
    <StyledView className="flex-1 items-center justify-center ">
      <StyledText className="font-extrabold text-3xl "> Welcome to </StyledText>
      <StyledText className="animate-bounce font-extrabold text-3xl">
        DeCertify
      </StyledText>

      <View>
        {connector.accounts.length == 0 ? (
          <>
            <StyledText className="font-extrabold text-xl py-2">
              Please connect to your wallet
            </StyledText>
            <Button
              className="bg-gray-300 px-4 rounded-full"
              onPress={() => {
                connectWalletFn();
              }}
            >
              <View className="flex-row items-center">
                <Ionicons name="wallet" className="px-12" size={48} />
                <StyledText className="font-extrabold text-xl px-4">
                  Connect Wallet
                </StyledText>
              </View>
            </Button>
          </>
        ) : (
          <>
            <View className="flex items-center">
              <StyledText className="font-extrabold text-xl py-2">
                Wallet connected
              </StyledText>
              <StyledText className="font-extrabold text-xs px-4">
                {connector.accounts[0]}
              </StyledText>
            </View>
            <Button
              className="bg-gray-300 px-4 rounded-full"
              onPress={() => {
                connector.killSession();
              }}
            >
              <View className="flex-row items-center">
                <Ionicons name="wallet" className="px-12" size={48} />
                <StyledText className="font-extrabold text-xl px-4">
                  Disconnect Wallet
                </StyledText>
              </View>
            </Button>
            <Button
              className="bg-gray-300 px-4 rounded-full"
              onPress={() => {
                handleReg();
              }}
            >
              <View className="flex-row items-center">
                <Ionicons name="person" className="px-12" size={48} />
                <StyledText className="font-extrabold text-xl px-4">
                  Go to Profile
                </StyledText>
              </View>
            </Button>
          </>
        )}
      </View>
    </StyledView>
  );
}
