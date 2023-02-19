import { useState, useEffect, useContext } from "react";
import { StyleSheet, ActivityIndicator, TextInput } from "react-native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Text, View } from "../components/Themed";
import Button from "../components/Button";
import * as WebBrowser from "expo-web-browser";
import Web3 from "web3";
import { ThemeContext } from "../context/ThemeProvider";
import AccountAddress from "../components/AccountAddress";
import AccountBalance from "../components/AccountBalance";
import Colors from "../constants/Colors";

export default function Account() {
  const connector = useWalletConnect();
  const { styles } = useContext(ThemeContext);
  const [accountLink, setAccountLink] = useState();
  useEffect(() => {
    setAccountLink(`https://celoscan.io/address/${connector.accounts[0]}`);
  }, [connector]);

  function handlePress() {
    WebBrowser.openBrowserAsync(accountLink);
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text className="font-bold bg-slate-50 text-xl">
          Account Info
        </Text>
        <Button style={styles.externalLink} onPress={handlePress}>
          <AccountAddress />
          <AccountBalance />
        </Button>
      </View>
      <View style={styles.separator}></View>
      <Button onPress={() => connector.killSession()}>
        <Text style={{ color: Colors.brand.snow }}>Disconnect Wallet</Text>
      </Button>
    </View>
  );
}
