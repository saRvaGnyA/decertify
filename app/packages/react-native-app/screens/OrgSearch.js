import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "react-native-dynamic-search-bar";
import DocumentList from "../components/DocumentList";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import "@ethersproject/shims";
import { ethers, Contract } from "ethers";
import { abi, contractAddress } from "../constants";

const StyledText = styled(Text);
const StyledView = styled(View);

const OrgSearch = () => {
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const [orgs, setOrgs] = useState([]);

  const orgsDetails = async () => {
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
    const getOrgs = await regContract.getOrganizations();
    console.log(getOrgs);
    setOrgs(getOrgs);
  };

  useLayoutEffect(() => {
    orgsDetails();
  }, []);

  return (
    <View className="flex-1 items-center">
      <StyledText className="font-bold text-2xl mt-4">
        Organisation Search
      </StyledText>
      <SearchBar className="my-4"></SearchBar>
      <StyledView>
        <StyledText className="px-0 py-2 font-bold text-2xl border-b-2 border-solid">
          Applicable Documents
        </StyledText>
        <ScrollView className="py-2">
          {orgs &&
            orgs.map((org) => (
              <DocumentList
                orgName={org.organizationName}
                orgAddress={org.organizationAddress}
              />
            ))}
        </ScrollView>
      </StyledView>
    </View>
  );
};

export default OrgSearch;
