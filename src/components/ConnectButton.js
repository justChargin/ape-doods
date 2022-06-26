import { useEffect, useState } from "react";
import { connectWallet, walletListener, currentWallet } from "../utils/wallet";

export default function ConnectButton() {
  const [walletAddress, setWalletAddress] = useState();

  const config = async () => {
    await walletListener(setWalletAddress);
    await currentWallet(setWalletAddress);
  };

  useEffect(() => {
    config();
  }, []);

  return (
    <div>
      {walletAddress ? (
        <button>{walletAddress}</button>
      ) : (
        <button onClick={() => connectWallet(setWalletAddress)}>
          Connect Metamask
        </button>
      )}
    </div>
  );
}
