import { Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function StudentConnectWallet() {
  const navigation = useNavigation();
  const connector = useWalletConnect();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const goToVerify = () => {
    navigation.navigate("Verifier");
  };

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
                goToVerify();
              }}
            >
              <View className="flex-row items-center">
                <Ionicons name="document" className="px-12" size={48} />
                <StyledText className="font-extrabold text-xl px-4">
                  Verify a Document
                </StyledText>
              </View>
            </Button>
          </>
        )}
      </View>
    </StyledView>
  );
}
