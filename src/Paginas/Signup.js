import React,{Component} from 'react';
import { InfoConsumer, InfoContext } from '../context';
import { Navigate } from 'react-router-dom';
import  '../App.css';
import {
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Input,
    Alert
  } from 'reactstrap';


class Signup extends Component{

    constructor(props){
        super(props);
        this.state={
            nombre:'',
            apellidos:'',
            email:'',
            contrasena:'',
            submitted:false,
            loading:false,
            mensaje:'',
            dacuenta:[],
      validate: {
        emailState: '',
      },
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }
    static contextType=InfoContext;
     apiUrl=process.env.REACT_APP_API;

  async getCuentas(em){
      
      const cont=this.context;
      try {
        const res=await fetch(this.apiUrl+`/Cuentas`)

        .then((res)=>res.json())
        if(res){
          cont.cambCuentas(res)
          cont.setEmaCuenta(em)
          this.setState({loading:true},()=>
          console.log("daCueantsSignUp",this.state.daCuentas)
         
          )
        }
      } catch (error) {
        console.log(error)
      }
    
    }

    handleSubmit(e){
        e.preventDefault();
        const{nombre,apellidos,email,contrasena}=this.state;
        if(!(nombre && apellidos && email && contrasena)){
            return;
        }
        this.registrar(nombre,apellidos,email,contrasena)
        .then(()=> {
         // this.context.getDataCuenta(null); 
          this.setState({submitted:true});
         // this.setState({mensaje:"Estudiante actualizado"});
      });
    }
  
  async  registrar(nombre,apellidos,email,contrasena){
      const co=this.context
      const rolId=co.rol
      const em=email;
      let dat={nombre:nombre,apellidos:apellidos,email:email,contrasena:contrasena,rol_id:rolId,daescuela:co.daEscuela};
       
        return await fetch(this.apiUrl+`/Signup`,{
               method:'POST',
               mode:'cors',
               body:JSON.stringify(dat),
               headers:{'content-type':'application/json'},
            })
            .then(res=>res.json())
            .then(res=>{
              if(res.message=="Cuenta agregada"){
                this.getCuentas(em);          
              }
              if(res.message=="Estudiante guardado"){
                co.setCuenta(res.body[0])
                co.setEmaCuenta(em)
                //co.getDataCuenta(null)
                co.setState(true)
                this.setState({mensaje:"Estudiante guardado"})
              }
              if(res.message=="Estudiante actualizado"){
                co.setCuenta(res.body[0])
                co.setEsta(true) 
                this.setState({mensaje:"Estudiante actualizado"})
              }
              if(res.message=="Maestro guardado"){
                co.setCuenta(res.body[0])
                co.setEmaCuenta(em)
                co.getDataCuenta(null)
                co.setState(true)
                this.setState({mensaje:"Maestro guardado"})
              }
              if(res.message=="Maestro actualizado"){
                co.setCuenta(res.body[0])
                co.setEmaCuenta(em)
                co.getDataCuenta(null)
                co.setEsta(true)
                this.setState({mensaje:"Maestro actualizado"})
              }
              if(res.error){
                console.log("er")
                this.setState({submitted:false})
                throw "Error"
              }
            })
            .catch(err=>err);
    }
    handleChange(event){
        const{name,value}=event.target;
        this.setState({[name]:value});
    }

    validateEmail(e) {
        const emailRex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     
        const { validate } = this.state;
     
        if (emailRex.test(e.target.value)) {
          validate.emailState = 'Exitoso';
        } else {
          validate.emailState = 'Peligro';
        }
     
        this.setState({ validate });
      }

    render(){
        const{nombre,apellidos,email,contrasena,submitted,loading,mensaje}=this.state;
        return (
           
            <InfoConsumer>
                {data=>{
                    return(

                        <div className=" div-center">
                        <h1><span className='text-center'>Registro</span></h1>

                        <Form className="border signup-form" onSubmit={(e) => this.handleSubmit(e)}>
                        <FormGroup>
                            <Input
                              type="name"
                              name="nombre"
                              id="nameId"
                              placeholder="Nombre"
                              value={nombre}
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup> 
                          <FormGroup>
                            <Input
                              type="name"
                              name="apellidos"
                              id="apellidosId"
                              placeholder="Apellidos"
                              value={apellidos}
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup> 
                          <FormGroup>
                            <Input
                              type="email"
                              name="email"
                              id="exampleEmail"
                              placeholder="email@ejemplo.com"
                              valid={this.state.validate.emailState === "Exitoso"}
                              invalid={this.state.validate.emailState === "Peligro"}
                              value={email}
                              onChange={(e) => {
                                this.validateEmail(e);
                                this.handleChange(e);
                              }}
                            />
                            <FormFeedback>
                              Uh oh! Algo esta mal en el formato de tu email. Corrigelo.
                            </FormFeedback>
                            <FormFeedback valid>
                              Correcto.
                            </FormFeedback>
                            <FormText>Tu usuario es tu email.</FormText>
                          </FormGroup>
                          <FormGroup>
                            <Input
                              type="password"
                              name="contrasena"
                              id="examplePassword"
                              placeholder="Contrasena"
                              value={contrasena}
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup> 
                          <div className='d-grid'><button className="btn-md btn btn-primary">Aceptar</button></div>
                          {submitted &&
              <Alert color="success">Registro exitoso!</Alert>}
                        </Form>
                       
                        {loading &&
                        <Navigate to={"/Regescuela"}  
                        />                         
                        }
                        {mensaje==='Estudiante actualizado' &&
                          <Navigate to={'/Escuela'}/>

                        }
                        {mensaje==='Estudiante guardado' &&
                          <Navigate to={'/Escuela'}/>
                          }

                         {mensaje==='Maestro actualizado' &&
                          <Navigate to={'/Escuela'}/>

                        }
                        {mensaje==='Maestro guardado' &&
                          <Navigate to={'/Escuela'}/>
                          }  

                       
                      </div>

    
                    );
                }}
            </InfoConsumer>
           
          );
    }
}

export default Signup;