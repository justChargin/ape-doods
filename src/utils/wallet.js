import MobileDetect from "mobile-detect";
import { toast } from "react-toastify";

const openInstallPage = () => {
  const md = new MobileDetect(navigator.userAgent);
  const iosLink =
    "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202";
  // "https://metamask.app.link/dapp/";
  const androidLink =
    "https://play.google.com/store/apps/details?id=io.metamask";
  // "https://metamask.app.link/dapp/";
  const chromeLink =
    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";

  if (md.is("iPhone")) window.open(iosLink);
  else if (md.os() || md.mobile()) window.open(androidLink);
  else window.open(chromeLink);
};

export async function connectWallet(setWalletAddress) {
  if (window.ethereum) {
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((acc) => {
        let account = acc[0];
        setWalletAddress(account);
        return account;
      })
      .catch((err) => {
        console.log({ err });
        return;
      });
  } else {
    openInstallPage();
  }
}

export async function currentWallet(setWalletAddress) {
  if (window.ethereum) {
    await window.ethereum
      .request({ method: "eth_accounts" })
      .then((acc) => {
        let account = acc[0];
        setWalletAddress(account);
        if (window.ethereum.chainId != "0x1") {
          toast.dismiss();
          toast.error("You must be use Ethereum Main Network to mint!");
        }
        return account;
      })
      .catch((err) => {
        return;
      });
  }
}

export async function walletListener(setWalletAddress) {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", async (accounts) => {
      if (accounts > 0) {
        setWalletAddress(accounts[0]);
        if (window.ethereum.chainId != "0x1") {
          toast.dismiss();
          toast.error("You must be use Ethereum Main Network to mint!");
        }
      } else setWalletAddress("");
    });
    window.ethereum.on("chainChanged", (chainId) => {
      if (chainId != "0x1") {
        toast.dismiss();
        toast.error("You must be use Ethereum Main Network to mint!");
      }
    });
  }
}
