import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";
import { Web3 } from "web3";

import TokenCard from "./components/TokenCard";

const App = () => {
  const { sdk, provider } = useSDK();
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");

  const metaMaskLogin = async () => {
    try {
      const accounts = await sdk?.connect();

      setAccount(accounts[0]);
    } catch (error) {
      console.warn("Errrr");
    }
  };

  useEffect(() => {
    if (!provider) return;

    setWeb3(new Web3(provider));
  }, [provider]);

  return (
    <div className="max-w-screen-md mx-auto min-h-screen flex flex-col justify-center items-center">
      {account ? (
        <>
          <TokenCard account={account} web3={web3} setAccount={setAccount} />
        </>
      ) : (
        <button onClick={metaMaskLogin}>Login</button>
      )}
    </div>
  );
};

export default App;
