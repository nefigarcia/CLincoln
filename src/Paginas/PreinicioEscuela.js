import React,{Component} from 'react';
import styled from 'styled-components';
import {InicioEscuela} from './InicioEscuela';
import { InfoConsumer, InfoContext } from '../context';
import { EstDa } from '../Gets';


class PreinicioEscuela extends Component{
  constructor(props){
    super(props);
    this.state={
      loading:true,
      daEstudiantes:'',
      daEscuelas:''
    }
  }
  
static contextType=InfoContext;
  cambLoading(loading){
    this.state.loading=loading;
  }
    render(){
      const{loading}=this.state; 
        return(
            <div className="container">
              <h5>Portal</h5>
              <hr/>
              <i>Lecciones </i>            
            <React.Fragment>
            <Header hidden={loading} className="container-fluid align-items-center">
          <div className="loader-cont" >
              <div className="loader"></div>
          </div>
          </Header>
          </React.Fragment>            
                <InfoConsumer >
                    {value=>{                 
                            return <InicioEscuela />                 
                    } }                  
                </InfoConsumer>               
            </div>
        );
    }
}
export default PreinicioEscuela;
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