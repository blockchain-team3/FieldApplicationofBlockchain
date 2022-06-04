import {WalletProvider} from './contexts/wallet-context'
import styled from 'styled-components'
import Header from './components/Header'

const Layout = styled.div`
  width: 100%;
  padding: 80px 0 40px 0;
`

function App() {
  return (
    <WalletProvider>
      <Layout>
        <Header />

      </Layout>
    </WalletProvider>
  );
}

export default App;
