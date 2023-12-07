import React,{useContext} from 'react'
import { InfoContext } from '../context';
import styled from 'styled-components';


export const Loading=()=>{
    const{loadinglogo}=useContext(InfoContext)    

    return(
      <React.Fragment>
      <Header hidden={!loadinglogo} className="container-fluid align-items-center">
    <div className="loader-cont" >
        <div className="loader"></div>
    </div>
    </Header>
    </React.Fragment>
    );
}
const Header=styled.header`
.loader {
  position:absolute;
  top:50%;
  left:50%;
  margin-left:-50px;
  margin-top:-50px;
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0%  { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`