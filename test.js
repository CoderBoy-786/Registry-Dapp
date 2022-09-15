const RegistryFactory = require("./components/layout/Form/artifacts/contracts/Greeter.sol/RegistryFactory.json");
const Registry = require("./components/layout/Form/artifacts/contracts/Greeter.sol/Registry.json");
const { ethers } = require("ethers");
require("dotenv").config({ path: "./.env.local" });

const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_ADDRESS,
      RegistryFactory.abi,
      provider
    );

    const getDeployedCampaign = contract.filters.RegistryCreated(null,null,null,null,null,'Reselling');
    let events = await contract.queryFilter(getDeployedCampaign);
    let event = events.reverse();
    console.log(event);

  // const provider = new ethers.providers.JsonRpcProvider(
  //   process.env.NEXT_PUBLIC_RPC_URL
  // );

  // const contract = new ethers.Contract(
  //   "0x813b7E7972D4E64D0481BA48517bCe4df480d51e",
  //   Campaign.abi,
  //   provider
  // );

  // const Donations = contract.filters.donated('0xc538779A628a21D7CCA7b1a3E57E92f5226C3E27');
  // const AllDonations = await contract.queryFilter(Donations);

  // const DonationsData =  AllDonations.map((e) => {
  //   return {
  //     donar: e.args.donar,
  //     amount: parseInt(e.args.amount),
  //     timestamp : parseInt(e.args.timestamp)
  // }});

  // console.log(DonationsData);

};

main();