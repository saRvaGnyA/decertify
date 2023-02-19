import { Text, View, TextInput } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import "@ethersproject/shims";
import { ethers, Contract } from "ethers";
import { abi, contractAddress } from "../constants";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function StudentRegister() {
  const navigation = useNavigation();
  const connector = useWalletConnect();

  const [name, setName] = useState("");
  const [regId, setRegId] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const registerStudent = async () => {
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
    const getregistered = await regContract.registerStudent(
      name,
      regId,
      email,
      mobile
    );
    console.log(getregistered);
    navigation.navigate("Student");
  };

  return (
    <StyledView className="flex-1 items-center justify-center ">
      <StyledText className="text-3xl font-extrabold">
        Student Registration{" "}
      </StyledText>
      <StyledView className="p-4 rounded shadow-md">
        <StyledText className="text-lg m-1">Name:</StyledText>
        <TextInput
          placeholder="Toshan Luktuke"
          value={name}
          onChangeText={(e) => {
            setName(e);
          }}
          className="bg-gray-300 rounded w-64 pt-2 p-2 text-lg"
        ></TextInput>
        <StyledText className="text-lg m-1">Registration ID:</StyledText>
        <TextInput
          value={regId}
          onChangeText={(e) => {
            setRegId(e);
          }}
          placeholder="Enter your Reg ID"
          className="bg-gray-300 rounded w-64 pt-2 p-2 text-lg"
        ></TextInput>
        <StyledText className="text-lg m-1">Email ID:</StyledText>
        <TextInput
          value={email}
          onChangeText={(e) => {
            setEmail(e);
          }}
          placeholder="toshan@gmail.com"
          className="bg-gray-300 rounded w-64 pt-2 p-2 text-lg"
        ></TextInput>
        <StyledText className="text-lg m-1">Mobile No:</StyledText>
        <TextInput
          value={mobile}
          onChangeText={(e) => {
            setMobile(e);
          }}
          placeholder="912319210932"
          className="bg-gray-300 rounded w-64 pt-2 p-2 text-lg"
        ></TextInput>
      </StyledView>
      <StyledView className="flex-row">
        <Button
          onPress={() => {
            registerStudent();
          }}
          className="bg-blue-300 mx-2 "
        >
          <StyledText className="font-bold text-lg"> Submit </StyledText>
        </Button>
        <Button
          onPress={() => {
            setName("");
            setEmail("");
            setRegId("");
            setMobile("");
          }}
          className="bg-blue-300 mx-2"
        >
          <StyledText className="font-bold text-lg"> Clear </StyledText>
        </Button>
      </StyledView>
    </StyledView>
  );
}
