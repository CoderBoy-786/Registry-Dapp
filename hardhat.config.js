require("@nomiclabs/hardhat-waffle");
require("dotenv").config({path: './.env.local'});

task("accounts","print the list of accounts",async (taskArg,hre)=>{
  const accounts= await hre.ethers.getSigners(); 
  for(const account of accounts)
  {
    console.log(account.address);
  }
})
const {NEXT_PUBLIC_RPC_URL,NEXT_PUBLIC_PRIVATE_KEY}=process.env;
const privateKey=NEXT_PUBLIC_PRIVATE_KEY;
module.exports = {
  solidity: "0.8.10",
  defaultNetwork:"polygon",
  networks:{
    hardhat:{},
    polygon:{
      url:NEXT_PUBLIC_RPC_URL,
      accounts:[privateKey],
      chainId:80001
    }
  }
}
