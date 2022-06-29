import { toast } from "react-toastify";
import Web3 from "web3";

const provider =
  "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
const web3 = new Web3(provider);

const contract = require("../contract/apedoods.json");
const contractAddress = "0xE3290CAf67189816d8817920C32cCb47dfe901f5";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

export const totalSupply = async () => {
  const result = await nftContract.methods.totalSupply().call();
  return result;
};

export const publicsale = async (setter) => {
  const result = await nftContract.methods.publicsale().call();
  if (setter) setter(result);
  return result;
};

export const mintedBalance = async (walletAddress) => {
  const result = await nftContract.methods.mintedBalance(walletAddress).call();
  return result;
};

/* MINT */

export const mint = async () => {
  if (!window.ethereum) {
    toast.error("Please download Metamask wallet first.");
    return false;
  }
  if (!window.ethereum.selectedAddress) {
    toast.error("Please connect your wallet first.");
    return false;
  }

  const _mintedBalance = await mintedBalance(window.ethereum.selectedAddress);
  if (_mintedBalance > 0) {
    return toast.error("You're already minted your free mint.");
  }

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    // value: parseInt(web3.utils.toWei(cost, "ether") * mintAmount).toString(16), // hex
    gasLimit: "0",
    data: nftContract.methods.mint().encodeABI(), //make call to NFT smart contract
  };
  //sign the transaction via Metamask
  try {
    await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return toast.success(
      "Transaction successfully sent! Please do not rush to start a new transaction before your transaction is approved."
    );
  } catch (error) {
    return {
      success: false,
      status: "Something went wrong",
    };
  }
};
