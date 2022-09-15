const hre =require('hardhat');
async function main()
{
    const SmartContractFactory= await hre.ethers.getContractFactory('RegistryFactory');
    const smartContractFactory= await SmartContractFactory.deploy();
    await smartContractFactory.deployed();
    console.log("Factyory deployed to:",smartContractFactory.address);
}
main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(1);
});