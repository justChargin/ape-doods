import { useEffect, useState } from "react";
import { mint, publicsale } from "../utils/contract";

export default function MintButton() {
  const [sale, setSale] = useState();

  const config = async () => {
    const _sale = await publicsale();
    setSale(_sale);
  };

  useEffect(() => {
    config();
  }, []);

  return (
    <div>
      {sale ? (
        <button onClick={() => mint()}>Mint</button>
      ) : (
        <button disabled>Coming Soon</button>
      )}
    </div>
  );
}
