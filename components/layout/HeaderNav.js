import styled from "styled-components"
import {useRouter} from 'next/router'
import Link from 'next/link'

const HeaderNav = () => {
  const Router=useRouter();
  return (
    
    <HeaderNavWrapper>
      <Link href={'/'}>  
      <HeaderNavLink active={Router.pathname=="/"?true:false}>
        ALL-PROPERTY
        </HeaderNavLink>
        </Link>
        <Link href={'/create'}> 
         <HeaderNavLink active={Router.pathname=="/create"?true:false}>
         CREATE
        </HeaderNavLink>
        </Link>
        <Link href={'/dashboard'}> 
         <HeaderNavLink active={Router.pathname=="/dashboard"?true:false}>
         DASHBOARD
        </HeaderNavLink>
        </Link>
        
    </HeaderNavWrapper>
  )
}
const HeaderNavWrapper=styled.div`
display:flex;
align-items: center;
justify-content: space-between;
background-color: ${(props)=>props.theme.bgDiv};
padding:6px;
height:50%;
border-radius:10px;
`
const HeaderNavLink=styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background-color:${(props)=>props.active?props.theme.bgSubDiv:props.theme.bgDiv};
font-family:'Roboto';
height:100%;
margin:7px;
border-radius:10px;
padding:0 5px 0 5px;
cursor:pointer;
font-weight:bold;
font-size:small;
text-transform:uppercase;
`

export default HeaderNav