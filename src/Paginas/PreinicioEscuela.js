import React,{Component} from 'react';
import styled from 'styled-components';
import InicioEscuela from './InicioEscuela';
import { InfoConsumer } from '../context';
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
  getEst(){console.log("getEstudiantesRegEscueal:")
    //fetch("http://localhost:3001/Estudiantes")
    fetch("https://shielded-brushlands-89617.herokuapp.com/Estudiantes")
    .then(res=>res.json())
    .then(res=>{
      if(res){
        this.setState({daEstudiantes:res},()=>{
          console.log("daEStuIniciEs",this.state.daEstudiantes)
        })
      }
    })
  }
  getEscuelas(){ console.log("getEscuelasRegEscueala:")
    //fetch("http://localhost:3001/Escuelas")
    fetch("https://shielded-brushlands-89617.herokuapp.com/Escuelas")
    .then(res=>res.json())
    .then(res=>{//alert(JSON.stringify(res))
      if(res){
        this.setState({daEscuelas:res},()=>{
          console.log("daEscuelasPreinicioEscuela:",this.state.daEscuelas)
        })
      }
    })
    .catch(res=>{
      console.log("error en REGescuela Escuealas:",res)
    })
  }
  componentDidMount(){
    this.getEst();
  }

  cambLoading(loading){
    this.state.loading=loading;
  }
    render(){
      //this.getEscuelas();
      const{loading,daEstudiantes,daEscuelas}=this.state; 
        return(
            <div className="container">
                Plataforma
            <React.Fragment>
            <Header hidden={loading} className="container-fluid align-items-center">
          <div className="loader-cont" >
              <div className="loader"></div>
          </div>
          </Header>
          </React.Fragment>
                <div className="row mt-5">
                <InfoConsumer >
                    {value=>{
                      value.setEstudiantes(daEstudiantes);
                     // value.setEscuelas(daEscuelas);
                      //value.getDataEscuela();
                      //this.cambLoading(value.loading)
                      //  return value.daEscuela.map(item=>{ 
                       
                            return <InicioEscuela />//key={item.id} item={item}/>;
                      //  })
                      
                    } }
                   
                </InfoConsumer>
                </div>
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