import React,{Component} from 'react';
import { Media, Nav } from 'reactstrap';
import { InfoConsumer } from '../context';
import { Navigate } from 'react-router-dom';
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
            menuSta:'',
            escuelaid:''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }

    handleSubmit(e){
        e.preventDefault();
        const{nombre,escuelaid}=this.state;
        if(!(nombre && escuelaid)){
            console.log("entrando", nombre)
            return;
        }
        console.log("registrando", nombre)
        this.registrar(nombre,escuelaid)
        .then(this.setState({submitted:true}));
    }
    registrar(nombre,escuelaid){
        let dat={nombre:nombre,escuelaid:escuelaid};
        console.log(dat);
        //return fetch('http://localhost:3001/Regescuela',{
          return fetch('https://shielded-brushlands-89617.herokuapp.com/Signup',{
               method:'POST',
               mode:'cors',
               body:JSON.stringify(dat),
               headers:{'content-type':'application/json'},
            })
            .then(res=>{
              if(res.ok){
                this.setState({menuSta:true},()=>{
                  console.log("RegEscu:",this.state.menuSta)
                })
              }
            })
            .catch(err=>err);
    }
    handleChange(event){
        const{name,value}=event.target;
        this.setState({[name]:value});
    }

    

    render(){
        const{nombre,submitted,menuSta,escuelaid}=this.state;
        return (
           
            <InfoConsumer>
                {data=>{
                    return(

                        <div className="container">
                        <h2>Registro de Escuela</h2>
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
                        {menuSta &&
                         data.setEsta(menuSta)}
                        {menuSta &&
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