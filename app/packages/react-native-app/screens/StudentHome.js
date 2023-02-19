import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import "@ethersproject/shims";
import { ethers, Contract } from "ethers";
import { abi, contractAddress } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import React from "react";
import { styled } from "nativewind";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import Certificate from "../components/Certificate";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function StudentHome() {
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const [name, setName] = useState("");
  const [student, setStudent] = useState({});
  const [cfkts, setCfkts] = useState([]);

  const studentDetails = async () => {
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
    const getStudent = await regContract.getStudentDetails();
    console.log(getStudent);
    setStudent(getStudent);
    setName(getStudent.studentName);
  };

  const studentPrevRequests = async () => {
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
    const getStudentReq = await regContract.getStudentRequests();
    console.log(getStudentReq);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    studentDetails();
    studentPrevRequests();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StyledView className="">
        <StyledView className="py-8 px-3">
          <TouchableOpacity>
            <Ionicons
              className="align-left"
              name="menu-outline"
              size={32}
            ></Ionicons>
          </TouchableOpacity>
        </StyledView>
        <StyledView className="flex-2 items-center justify-center">
          <StyledImage
            source={{
              uri: "https://thumbs.dreamstime.com/b/user-profile-grey-icon-web-avatar-employee-symbol-user-profile-grey-icon-web-avatar-employee-symbol-sign-illustration-design-191067342.jpg",
            }}
            className="h-24 w-24 rounded-full border-solid border-slate-500 border-4"
          />
          <StyledText className="font-bold my-2 text-lg ">{name}</StyledText>
          <StyledText
            numberOfLines={1}
            className="w-52 bg-purple-200 text-sm rounded-full overflow-hidden p-2"
          >
            {connector.accounts[0]}
          </StyledText>
        </StyledView>

        <StyledView className="flex-1 items-center justify-center space-y-8 my-8">
          <Button
            className="bg-green-500 rounded-full h-12"
            onPress={() => {
              navigation.navigate("Search", { student });
            }}
          >
            <StyledView className="flex-row items-center">
              <StyledText className="font-extrabold text-xl mr-2">
                Apply
              </StyledText>
              <Ionicons name="enter-outline" className="px-4" size={24} />
            </StyledView>
          </Button>
        </StyledView>
        <StyledView>
          <StyledText className="px-0 py-2 mt-2 font-bold text-2xl border-b-2 border-solid bg-gray-100">
            {" "}
            Certificates{" "}
          </StyledText>
          {cfkts.map((cfkt) => {
            if (cfkt.status.toString() === "2")
              return (
                <Certificate
                  imageURI="https://www.iasplus.com/en-gb/images/responsive/icons/generic/document-dk-gray/image"
                  name="Marksheet"
                  date={cfkt.closeTime}
                  issuer={cfkt.department}
                ></Certificate>
              );
          })}
        </StyledView>
      </StyledView>
    </ScrollView>
  );
}
