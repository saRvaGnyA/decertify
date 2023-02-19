import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Button from "./Button";
import { Text } from "./Themed";

const ConnectWallet = () => {
  const connector = useWalletConnect();
  console.log(connector);
  return (
    <Button onPress={() => connector.connect()}>
      <Text style={{ fontSize: 16, color: "white" }}>Connect Wallet</Text>
    </Button>
  );
};

export default ConnectWallet;
