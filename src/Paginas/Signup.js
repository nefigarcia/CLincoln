import React,{Component} from 'react';
import { Media, Nav } from 'reactstrap';
import { InfoConsumer, InfoContext } from '../context';
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
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBRow,
    MDBCol,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';

class Signup extends Component{

    constructor(props){
        super(props);
        this.state={
            nombre:'',
            apellidos:'',
            email:'',
            contrasena:'',
            submitted:false,
            rolId:'',
            menuSta:'',
            daCuent:'',
            loading:false,
            daCuentas:'',
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
        //const res=await fetch("http://localhost:3001/Cuentas")
        const res=await fetch(this.apiUrl+`/Cuentas`)

        .then((res)=>res.json())
        if(res){//console.log("res:",res)
          cont.cambCuentas(res)
          cont.setEmaCuenta(em)
          this.setState({menuSta:true,daCuentas:res,loading:true},()=>
          console.log("daCueantsSignUp",this.state.daCuentas)
         
          )
        }
      } catch (error) {
        console.log(error)
      }
     /* fetch("http://localhost:3001/Cuentas")
      //fetch("https://shielded-brushlands-89617.herokuapp.com/Cuentas")
      .then(res=>res.json())
      .then(res=>{
        
        if(res){//console.log("res:",res)
          this.setState({menuSta:true,daCuentas:res,loading:true},()=>
            console.log("daCueantsSignUp",this.state.daCuentas)
          )
        }
      })*/
    }

    handleSubmit(e){
        e.preventDefault();
        const{nombre,apellidos,email,contrasena,rolId}=this.state;
        if(!(nombre && apellidos && email && contrasena)){
            return;
        }
        this.registrar(nombre,apellidos,email,contrasena,rolId)
        .then(this.setState({submitted:true}));
    }
    registrar(nombre,apellidos,email,contrasena,rolId){
      const em=email;
        let dat={nombre:nombre,apellidos:apellidos,email:email,contrasena:contrasena,rol_id:rolId};
       //return fetch('http://localhost:3001/Signup',{
       return fetch(this.apiUrl+`/Signup`,{
               method:'POST',
               mode:'cors',
               body:JSON.stringify(dat),
               headers:{'content-type':'application/json'},
            })
            .then(res=>{console.log("respon",res)
            this.getCuentas(em);
              if(res.ok){
                
                this.setState({ daCuent:dat,email:email},()=>{
                  console.log("stDATACUENTAS:",this.state.daCuentas)
                })
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
        const{nombre,apellidos,email,contrasena,submitted,rolId,password,menuSta,daCuent,loading,daCuentas}=this.state;
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
                            />{this.state.rolId=data.rol}
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
                        {/*{menuSta &&
                          data.setEmaCuenta(email)
                        }*/}
                       {/* {menuSta &&
                          data.cambCuentas(daCuentas)
                        }*/}
                       
                        
                        {loading &&
                        <Navigate to={"/Regescuela"}  
                        />                         
                        }

                       
                      </div>

    /*     <MDBContainer  fluid className='my-5'>                      
            <Form onClick={this.handleSubmit}>
              <MDBRow  className='g-0 align-items-center'>
                <MDBCol col='6'>
        
                  <MDBCard  className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
                    <MDBCardBody  className='p-5 shadow-5 text-center'>
        
                      <h2 className="fw-bold mb-5">Sign up ahora</h2>
        
                      <MDBRow>
                        <MDBCol col='6'>
                            <div className={'form-group'+(submitted && !nombre ? 'has-error':'')}>
                            <MDBInput onChange={this.handleChange} wrapperClass='mb-4' label='Nombre' id='form1' type='text' name='nombre'/>
                            {submitted && !nombre &&
                                <div className="help-block">Nombre es requerido</div>
                            }
                            </div>
                        </MDBCol>
        
                        <MDBCol col='6'>
                          <MDBInput onChange={this.handleChange} wrapperClass='mb-4' label='Apellidos' id='form2' type='text'/>
                        </MDBCol>
                      </MDBRow>
        
                      <MDBInput onChange={this.handleChange} wrapperClass='mb-4' label='Email' id='form3' type='email' name='email'/>
                      <MDBInput wrapperClass='mb-4' label='Contrasena' id='form4' type='password' name='contrasena'/>
                        {
                            this.state.rolId=data.rol
                            
                        }    {console.log("valor rol",this.state.rolId)}
                      <MDBBtn className='w-100 mb-4' size='md'>sign up</MDBBtn>
        
                      <div className="text-center">
        
                        <p>o sign up con:</p>
        
                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                          <MDBIcon fab icon='facebook-f' size="sm"/>
                        </MDBBtn>
        
                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                          <MDBIcon fab icon='twitter' size="sm"/>
                        </MDBBtn>
        
                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                          <MDBIcon fab icon='google' size="sm"/>
                        </MDBBtn>
        
                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                          <MDBIcon fab icon='github' size="sm"/>
                        </MDBBtn>
        
                      </div>
      { console.log("sii",data.rol)}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
        
                <MDBCol col='6'>
                  <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" class="w-100 rounded-4 shadow-4"
                    alt="" fluid/>
                </MDBCol>
        
              </MDBRow>
              </Form>
            </MDBContainer>
            */
                    );
                }}
            </InfoConsumer>
           
          );
    }
}

export default Signup;