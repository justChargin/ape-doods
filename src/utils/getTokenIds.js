import { currentWallet } from "../utils/wallet";
import { tokensOfOwner } from "../utils/contract";

export const getTokenIds = async (ipfs) => {
  const address = await currentWallet();
  const tokens = await tokensOfOwner(address);

  // If IPFS link given then result automatically will be like this
  // (Array) => ["given_ipfs_link/tokens[i].png"]

  if (ipfs && tokens.length > 0) {
    let tokensWithIpfs = [];

    for (let i = 0; i < tokens.length; i++) {
      tokensWithIpfs.push(ipfs + "/" + tokens[i] + ".png");
    }

    return tokensWithIpfs;
  }

  // Ohterwise only token IDs will return
  return tokens;
};
