// const Contract = require("web3-eth-contract");

$("#but").click(function () {
  let k = getCurrNum();
});

const web3 = new Web3(
  "https://ropsten.infura.io/v3/3c52917848e945229c0d33d632b10490"
);
const contractAddress = "0xda78b7B746f961Fc3c177579FE8AC70c422240f1";
const minABI = [
  // currentNum
  {
    constant: true,
    inputs: [],
    name: "currentNum",
    outputs: [{ name: "num", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [{ type: "uint256" }],
    name: "currentNum",
    outputs: [{ type: "string" }],
    type: "function",
  },
];

const contract = new web3.eth.Contract(minABI, contractAddress);

const getCurrNum = async () => {
  let num = await contract.methods.currentNum().call();
  alert(num);
};

// const getURI = async(int num) => {
//     await contract.methods.tokenURI(num)
// }
