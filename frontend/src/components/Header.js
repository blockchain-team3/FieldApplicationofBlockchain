import { useWalletContext } from "../contexts/wallet-context";
import { Menu } from "semantic-ui-react";

export default function Header() {
  const { address, connectWallet, disconnectWallet } = useWalletContext();

  return (
    <Menu inverted size="large" fixed="top">
      <Menu.Item header>NFT DAO</Menu.Item>

      <Menu.Item
        position="right"
        onClick={address ? disconnectWallet : connectWallet}
      >
        {address ? `${address.slice(0, 6)}....${address.slice(-4)}` : "Connect"}
      </Menu.Item>
    </Menu>
  );
}
