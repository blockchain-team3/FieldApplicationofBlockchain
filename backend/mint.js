import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";

export const mint = async (url, name) => {
  const myPrivateKeyHex =
    "8407318fe39414665196b94da9bc02f6988c592f0e93f6073217633285861d27";
  const provider = new Web3.providers.HttpProvider(
    `https://ropsten.infura.io/v3/3c52917848e945229c0d33d632b10490`
  );
  Web3.providers.HttpProvider.prototype.sendAsync =
    Web3.providers.HttpProvider.prototype.send;
  const localKeyProvider = new HDWalletProvider({
    privateKeys: [myPrivateKeyHex],
    providerOrUrl: provider,
  });
  const web3 = new Web3(localKeyProvider);
  const myAccount = web3.eth.accounts.privateKeyToAccount(myPrivateKeyHex);

  const contractAddress = "0xda78b7B746f961Fc3c177579FE8AC70c422240f1";
  const minABI = [
    // currentNum
    // {
    //   constant: true,
    //   inputs: [],
    //   name: "currentNum",
    //   outputs: [{ name: "num", type: "uint256" }],
    //   type: "function",
    // },
    // mintT3NFT,
    {
      constant: true,
      inputs: [
        { name: "tokenURI", type: "string" },
        { name: "ppl", type: "string" },
      ],
      name: "mintT3NFT",
      outputs: [],
      type: "function",
    },
  ];
  const myContract = new web3.eth.Contract(minABI, contractAddress);

  // const url =
  //   "https://res.cloudinary.com/daeyong/image/upload/v1652179259/kvfebgbjr0grtcw7kmvf.jpg";
  // const name = "daeyong, jiseung";
  const receipt = await myContract.methods
    .mintT3NFT(url, name)
    .send({ from: myAccount.address });
  console.log(receipt);
  // console.log("Done");
  return 1;
};
