import "../styles/globals.css";
import { CeloProvider, Alfajores } from '@celo/react-celo';
import '@celo/react-celo/lib/styles.css';

import Layout from "../components/Layout";
import { ContractKitProvider } from "@celo-tools/use-contractkit";

function App({ Component, pageProps }) {
  return (
    <CeloProvider
      dapp={{
        name: 'celo-composer dapp',
        description: 'My awesome celo-composer description',
        url: 'https://example.com',
        icon: 'https://example.com/favicon.ico',
      }}
      defaultNetwork={Alfajores.name}
      connectModal={{
        providersOptions: { searchable: true },
      }}
    >
      <ContractKitProvider dapp={{
        name: 'celo-composer dapp',
        description: 'My awesome celo-composer description',
        url: 'https://example.com',
        icon: 'https://example.com/favicon.ico',
      }}
      defaultNetwork={Alfajores.name}
      connectModal={{
        providersOptions: { searchable: true },}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </ContractKitProvider>
    </CeloProvider>
  )
}

export default App;