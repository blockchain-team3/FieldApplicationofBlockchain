import { WalletProvider } from "./contexts/wallet-context";
import styled from "styled-components";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./components/Home";

const Layout = styled.div`
  width: 100%;
  padding: 80px 0 40px 0;
`;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <Layout>
          <Header />

          <Home />
        </Layout>
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default App;
