
import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import RegistryFactory from '../components/layout/Form/artifacts/contracts/Greeter.sol/RegistryFactory.json'
import { useState } from 'react';
import Link from 'next/link'

export default function Index({AllData, ResellingData, FirstTimesellData,GovernmentPropertyData}) {
  const [filter, setFilter] = useState(AllData);

  return (
    <HomeWrapper>

      {/* Filter Section */}
      <FilterWrapper>
        <FilterAltIcon style={{fontSize:40}} />
        <Category onClick={() => setFilter(AllData)}>All</Category>
        <Category onClick={() => setFilter(ResellingData)}>Reselling</Category>
        <Category onClick={() => setFilter(FirstTimesellData)}>FirstTimesell</Category>
        <Category onClick={() => setFilter(GovernmentPropertyData)}>GovernmentProperty</Category>
      </FilterWrapper>

      {/* Cards Container */}
      <CardsWrapper>

      {/* Card */}
      {filter.map((e) => {
        return (
          <Card key={e.documentNumber}>
          <CardImg>
            <Image 
              alt="Registry dapp"
              layout='fill' 
              src={"https://registry.infura-ipfs.io/ipfs/" + e.image} 
            />
          </CardImg>
          <Title>
            {e.documentNumber}
          </Title>
          <CardData>
            <Text>Owner<AccountBoxIcon /></Text> 
            <Text>{e.owner.slice(0,6)}...{e.owner.slice(39)}</Text>
          </CardData>
          {/* <CardData>
            <Text>Amount<PaidIcon /></Text> 
            <Text>{e.amount} Matic</Text>
          </CardData> */}
          <CardData>
            <Text><EventIcon /></Text>
            <Text>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
          </CardData>
          <Link passHref href={'/' + e.address}><Button>
            Go to File
          </Button></Link>
        </Card>
        )
      })}
        {/* Card */}

      </CardsWrapper>
    </HomeWrapper>
  )
}



export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    RegistryFactory.abi,
    provider
  );

  const getAllCampaigns = contract.filters.RegistryCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => {
    return {
     documentNumber : parseInt(e.args.documentNumber),
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      // amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.RegistryAddress
    }
  });

  const getResellingCampaigns = contract.filters.RegistryCreated(null,null,null,null,null,'Reselling');
  const ResellingCampaigns = await contract.queryFilter(getResellingCampaigns);
  const ResellingData = ResellingCampaigns.map((e) => {
    return {
      documentNumber :parseInt(e.args.documentNumber),
       image: e.args.imgURI,
       owner: e.args.owner,
       timeStamp: parseInt(e.args.timestamp),
      address: e.args.RegistryAddress
     }
  });

  const getFirstTimesellCampaigns = contract.filters.RegistryCreated(null,null,null,null,null,'FirstTimesell');
  const FirstTimesellCampaigns = await contract.queryFilter(getFirstTimesellCampaigns);
  const FirstTimesellData = FirstTimesellCampaigns.map((e) => {
    return {
      documentNumber : parseInt(e.args.documentNumber),
       image: e.args.imgURI,
       owner: e.args.owner,
       timeStamp: parseInt(e.args.timestamp),
       address: e.args.RegistryAddress
     }
  });

  const getGovernmentPropertyCampaigns = contract.filters.RegistryCreated(null,null,null,null,null,'GovernmentProperty');
  const GovernmentPropertyCampaigns = await contract.queryFilter(getGovernmentPropertyCampaigns);
  const GovernmentPropertyData = GovernmentPropertyCampaigns.map((e) => {
    return {
      documentNumber : parseInt(e.args.documentNumber),
       image: e.args.imgURI,
       owner: e.args.owner,
       timeStamp: parseInt(e.args.timestamp),
      address: e.args.RegistryAddress
     }
  });

  return {
    props: {
      AllData,
      ResellingData,
      FirstTimesellData,
      GovernmentPropertyData
    }
  }
}
const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 15px;
`
const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px 15px;
  border-radius: 8px;
  font-family: 'Poppins';
  font-weight: normal;
  cursor: pointer;
`
const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};
  &:hover{
    transform: translateY(-10px);
    transition: transform 0.5s;
  }
  
  &:not(:hover){
    transition: transform 0.5s;
  }
`
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
`
const Title = styled.h2`
  font-family: 'Roboto';
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  `
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
`
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color:#00b712 ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%); 
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`