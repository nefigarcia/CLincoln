import React,{Component} from 'react';
import { Media, Nav } from 'reactstrap';
import { InfoConsumer } from '../context';
import { Navigate } from 'react-router-dom';
import { CuentDa } from '../Gets';
import  '../App.css';
import {
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Label,
    Input,
    Button,
    Alert
  } from 'reactstrap';

class RegEscuela extends Component{

    constructor(props){
        super(props);
        this.state={
            nombre:'',
            submitted:false,
            rolId:'',
            menuSta:false,
            escuelaid:'',
           // daCuentas:'',
            daEscuelas:'',
            loading:false
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }

    
    getEscuelas(){
    fetch("http://localhost:3001/Escuelas")
   // fetch("https://shielded-brushlands-89617.herokuapp.com/Escuelas")
    .then(res=>res.json())
    .then(res=>{//alert(JSON.stringify(res))
      if(res){
        this.setState({daEscuelas:res,loading:true},()=>
          console.log("daEscuelasGet:",this.state.daEscuelas)
        )
      }
    })
    .catch(res=>{
      console.log("error en REGescuela Escuealas:",res)
    })
  }

    handleSubmit(e){
        e.preventDefault();
        const{nombre,escuelaid}=this.state;
        if(!(nombre && escuelaid)){
            return;
        }
        this.registrar(nombre,escuelaid)
        .then(this.setState({submitted:true}))
        .catch((error)=>{
          alert(JSON.stringify(error));
          console.log("hanadleEscErr:",error);
        });
    }
    registrar(nombre,escuelaid){
        let dat={nombre:nombre,escuelaid:escuelaid};
        return fetch('http://localhost:3001/Regescuela',{
       //   return fetch('https://shielded-brushlands-89617.herokuapp.com/Regescuela',{
               method:'POST',
               mode:'cors',
               body:JSON.stringify(dat),
               headers:{'content-type':'application/json'},
            })
            .then(res=>{
              if(res.ok){
                this.getEscuelas();
                this.setState({menuSta:true},()=>{
                })
               
              }
            })
            .catch((error)=>{
              alert(JSON.stringify(error));
              console.log("registroEscErr:",error);
            });
    }
    handleChange(event){
        const{name,value}=event.target;
        this.setState({[name]:value});
    }

    

    render(){
        const{nombre,submitted,menuSta,escuelaid,daCuentas,daEscuelas,loading}=this.state;
        return (
           
            <InfoConsumer>
                {data=>{
                    return(

                        <div className="container">
                        <h2>Registro de Escuela, un paso mas </h2>
                        <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
                        <FormGroup>
                            <Label for="examplePassword">Nombre de Escuela</Label>
                            <Input
                              type="name"
                              name="nombre"
                              id="nameId"
                              placeholder="Nombre"
                              value={nombre}
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup> <br/>
                          <FormGroup>
                            <Label for="escuealaId">ID Escuela</Label>
                            <Input
                              type="name"
                              name="escuelaid"
                              id="apellidosId"
                              placeholder="Id Escuela"
                              value={escuelaid}
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup> <br/>
                          
                        
                          <Button>Submit</Button>
                          {submitted &&
              <Alert color="success">Registro exitoso!</Alert>}
                        </Form>
                                                                           
                         {loading &&
                          data.setEscuelas(daEscuelas)
                         }
                         {loading &&
                         data.getDataCuenta(null)}
                        
                         
                        {!data.loading &&
                        <Navigate to={"/Escuela"}  
                        />
                        }
                      </div>

    
                    );
                }}
            </InfoConsumer>
           
          );
    }
}

export default RegEscuela;