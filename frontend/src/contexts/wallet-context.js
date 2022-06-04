import {createContext, useCallback, useContext, useMemo, useState} from 'react'

const Context = createContext({})

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null)

  const connectWallet = useCallback(async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      window.alert(`Metamask Wallet Required`)
      window.open(
          `https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn`,
      )
      return
    }

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });

    // ropsten
    if (chainId !== '0x3') {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: '0x3'
        }]
      })
    }

    const [address] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    if (!address) {
      window.alert('something went wrong')
      return
    }

    setAddress(address)
  }, [])

  const disconnectWallet = useCallback(() => {
    setAddress(null)
  }, [])

  const value = useMemo(() => ({
    address,
    connectWallet,
    disconnectWallet,
  }) , [address, connectWallet, disconnectWallet])

  return <Context.Provider value={value} >{children}</Context.Provider>
}

export function useWalletContext() {
  return useContext(Context)
}