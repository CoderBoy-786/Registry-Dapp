import styled from "styled-components";
import { ethers } from "ethers";
import { useState } from "react";
const networks = {
  polygon: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};

const Wallet = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    if (provider.network !== "matic") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks["polygon"],
          },
        ],
      });
      const account = provider.getSigner();
      const Address = await account.getAddress();
      setAddress(Address);
      const Balance = ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance);
    }
  };
  return (
    <ConnectWalletWrapper onClick={connectWallet}>
      {balance==''?<Balance></Balance>:<Balance>{balance.slice(0,4)} Matic</Balance>}
      {address==''?<Address>CONNECT WALLET</Address>:<Address>{address}</Address>}
    </ConnectWalletWrapper>
  );
};
const ConnectWalletWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  height: 100%;
  padding: 5px 9px;
  border-radius: 10px;
  color: ${(props) => props.theme.color};
  margin-right: 15px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size:small;
`;
const Address=styled.h2`
background-color:${(props)=>props.theme.bgSubDiv};
height:100%;
display: flex;
align-items:Center;
justify-content:Center;
padding:0px 5px 0px 5px;
border-radius:10px;
`
const Balance=styled.h2`
display: flex;
align-items:Center;
justify-content:Center;
height:100%;
margin-right:5px;
`

export default Wallet;
