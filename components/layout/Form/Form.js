import styled from 'styled-components';
import FormLeftWrapper from './Components/FormLeftWrapper'
import FormRightWrapper from './Components/FormRightWrapper'
import { createContext, useState } from 'react';
import {TailSpin} from 'react-loader-spinner';
import {ethers} from 'ethers';
import {toast} from 'react-toastify';
import RegistryFactory from './artifacts/contracts/Greeter.sol/RegistryFactory.json'




const FormState = createContext();

const Form = () => {
    const [form, setForm] = useState({
        documentNumber: "",
        documentInformation: "",
       category: "Reselling",
    });

    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const [storyUrl, setStoryUrl] = useState();
    const [imageUrl, setImageUrl] = useState();

    const FormHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const [image, setImage] = useState(null);

    const ImageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const startUpload = async (e) => {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
    
        if(form.documentNumber&&form.documentNumber.length === "") {
          toast.warn("Title Field Is Empty");
        } else if(form.documentInformation === "" ) {
          toast.warn("Story Field Is Empty");
        }  else if(uploaded == false) {
            toast.warn("Files Upload Required")
        }
        else {        
          setLoading(true);  
    
          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_ADDRESS,
            RegistryFactory.abi,
            signer
          );
            
        
    
          const RegistryData = await contract.createRegistry(
            form.documentNumber,
           
            imageUrl,
            form.category,
            storyUrl
          );
    
          await RegistryData.wait();   
    
          setAddress(RegistryData.to);
        }
    }

  return (
      <FormState.Provider value={{form, setForm, image, setImage, ImageHandler, FormHandler, setImageUrl, setStoryUrl, startUpload, setUploaded}} >
    <FormWrapper>
        <FormMain>
            {loading == true ?
                address == "" ?
                    <Spinner>
                        <TailSpin height={60} />
                    </Spinner> :
                <Address>
                    <h1>Campagin Started Sucessfully!</h1>
                    <h1>{address}</h1>
                    <Button>
                        Go To Campaign
                    </Button>
                </Address>
                :
                    <FormInputsWrapper>
                        <FormLeftWrapper />
                        <FormRightWrapper />
                    </FormInputsWrapper>               
            }
        </FormMain>
    </FormWrapper>
    </FormState.Provider>
  )
}

const FormWrapper = styled.div`
    width: 100%;
    display:flex;
    justify-content:center;
`

const FormMain = styled.div`
    width:80%;
`

const FormInputsWrapper = styled.div`
    display:flex;
    justify-content:space-between ;
    margin-top:45px ;
`

const Spinner = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    justify-content:center ;
    align-items:center ;
`
const Address = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    display:flex ;
    flex-direction:column;
    align-items:center ;
    background-color:${(props) => props.theme.bgSubDiv} ;
    border-radius:8px;
`

const Button = styled.button`
    display: flex;
  justify-content:center;
  width:30% ;
  padding:15px ;
  color:white ;
  background-color:#00b712 ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%) ;
  border:none;
  margin-top:30px ;
  cursor: pointer;
  font-weight:bold ;
  font-size:large ;
`

export default Form;
export {FormState};