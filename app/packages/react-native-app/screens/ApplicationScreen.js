import { View, Text, TextInput } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import Button from "../components/Button";
import { v4 as uuidv4 } from "uuid";

import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import "@ethersproject/shims";
import { ethers, Contract } from "ethers";
import { abi, contractAddress } from "../constants";

const StyledText = styled(Text);

const ApplicationScreen = ({ route }) => {
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const { orgAddress } = route.params;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const registerReq = async () => {
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
    const timeStamp = parseInt(new Date() / 1000);
    const registerRequest = await regContract.regRequest(
      orgAddress,
      uuidv4(),
      title,
      desc,
      "Marksheet",
      timeStamp.toString(),
      "Registrar"
    );
    console.log(registerRequest);
    navigation.navigate("Student");
  };

  const StyledView = styled(View);
  return (
    <StyledView className="p-4 rounded shadow-md items-center justify-center">
      <Text className="text-3xl m-3 font-extrabold"> Application Form </Text>
      <StyledView className="bg-gray-300 rounded-lg p-4">
        <StyledText className="text-lg m-1">Request Title/Subject:</StyledText>

        <TextInput
          defaultValue={title}
          onChangeText={(e) => setTitle(e)}
          placeholder="Enter Subject"
          className="bg-gray-50 m-2 rounded w-64 pt-2 p-2 text-lg"
        ></TextInput>

        <StyledText className="text-lg m-1">Request Description:</StyledText>
        <TextInput
          defaultValue={desc}
          onChangeText={(e) => setDesc(e)}
          placeholder="Enter Body"
          className="bg-gray-50 m-2 rounded w-64 pt-2 p-2 text-lg"
        ></TextInput>
      </StyledView>
      <Button onPress={() => registerReq()} className="bg-blue-500">
        <Text className="font-bold text-lg text-gray-100"> Submit </Text>
      </Button>
    </StyledView>
  );
};

export default ApplicationScreen;
