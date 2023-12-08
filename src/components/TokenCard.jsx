import { useEffect, useState } from "react";
import TokenAbi from "../TokenAbi.json";
import ContractAddress from "../ContractAddress.json";
import OptionCard from "./OptionCard";

const TokenCard = ({ account, web3, setAccount }) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [balance, setBalance] = useState();
  const [contract, setContract] = useState();
  const [inputAccount, setInputAccount] = useState("");
  const [inputValue, setInputValue] = useState();

  const onSubmitSend = async (e) => {
    e.preventDefault();

    await contract.methods
      .transfer(inputAccount, web3.utils.toWei(inputValue, "ether"))
      .send({ from: account });
  };

  const getName = async () => {
    const response = await contract.methods.name().call();

    setName(response);
  };

  const getSymbol = async () => {
    const response = await contract.methods.symbol().call();

    setSymbol(response);
  };

  const getBalance = async () => {
    const response = await contract.methods.balanceOf(account).call();

    setBalance(web3.utils.fromWei(response, "ether"));
  };

  useEffect(() => {
    if (!web3) return;

    setContract(
      new web3.eth.Contract(
        TokenAbi,
        "0x7defd2de6cc10a13bbe99156c4494306a7a34cce"
      )
    );
  }, [web3]);

  useEffect(() => {
    if (!account || !contract) return;
    getName();
    getSymbol();
    getBalance();
  }, [account, contract]);

  return (
    <>
      <div>{account}</div>
      <button onClick={() => setAccount("")}>LogOut</button>
      <span>{name}</span>
      <span>{symbol}</span>
      <span>{balance}</span>
      <form onSubmit={onSubmitSend}>
        <select
          className="border-2"
          onChange={(e) => setInputAccount(e.target.value)}
          value={inputAccount}
        >
          {ContractAddress.map((v, i) => (
            <OptionCard
              key={i}
              owner={v.owner}
              walletAccount={v.walletAccount}
            />
          ))}
        </select>
        <input
          className="border-2"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button value="submit">Send</button>
      </form>
    </>
  );
};

export default TokenCard;
