import styled from 'styled-components';
import { FormState } from '../Form';
import { useContext } from 'react';

const FormLeftWrapper = () => {
  const Handler = useContext(FormState);

  return (
    <FormLeft>
      <FormInput>
        <label>Document Number</label>
        <Input onChange={Handler.FormHandler} value={Handler.form.documentNumber} placeholder='eg:11102020' type="number"  name="documentNumber" required >
        </Input>
      </FormInput>
      <FormInput>
        <label>Decribe Important Information</label>
        <TextArea onChange={Handler.FormHandler} value={Handler.form.documentInformation}  name="documentInformation" placeholder='1. Full Property Value&#13;&#10;2. Bank Valuation&#13;&#10;3. Sale Certificate&#13;&#10;4. Owner and Buyer Name&#13;&#10;....etc'>
        </TextArea>
      </FormInput>
    </FormLeft>
  )
}

const FormLeft = styled.div`
  width:48%;
`

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;
`
const Input = styled.input`
  padding:15px;
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
`

const TextArea = styled.textarea`
  padding:15px;
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none;
  border-radius:8px ;
  outline:none;
  font-size:large;
  max-width:100%;
  min-width:100%;
  overflow-x:hidden;
  min-height:160px ;
`

export default FormLeftWrapper;