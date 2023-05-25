import React,{Component,useContext,useState} from 'react';
import { Media } from 'reactstrap';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox,MDBModalContent,MDBModalHeader,MDBModalTitle,MDBModalBody,MDBModalFooter,MDBModal,MDBModalDialog } from 'mdb-react-ui-kit';
import {Link, redirect} from 'react-router-dom';
import admfoto from '../Fotos/registrodueno.png';
import mafot from '../Fotos/regismaestro.png';
import esfot from '../Fotos/regisestudiante.png';
import { InfoConsumer,useAuth } from '../context';
import { Navigate } from 'react-router-dom';
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


class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            emai:'',
			passwor:'',
			loading:true,
			submitted:false,
			error:'',
            authen:'',
            validate: {
              emailState: '',
            },
      emailCuen:''      
        };
        this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
    }

   

    login(emai,passwor){
      let da={email:emai,contrasena:passwor};
      console.log("data:",da);
        const requestOpt={
            method:'POST',
            mode:'cors',
            body:JSON.stringify(da),
            headers:{'content-type':'application/json'}
        };
       // return fetch("http://localhost:3001/Login",requestOpt)
        return fetch("https://shielded-brushlands-89617.herokuapp.com/Login",requestOpt)
        .then(response=>response.json())
        .then(response=>{
          //alert(JSON.stringify(response));
          let item=response.find(item=>{
            return item.NOMBRE;
          });
          console.log("item:",item)
          if(response){
            this.setState({authen:true,emailCuen:item},()=>
            console.log("login then",this.state.authen),

            )
          }
        })
        .catch((error)=>{
          alert(JSON.stringify(error));
          console.log("err log",error);
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const{emai,passwor,authen}=this.state;
        if(!(emai && passwor)){
            return;
        }console.log("handle");
        this.login(emai,passwor)
        .then(
        this.setState({submitted:true},()=>
        console.log("submit",this.state.submitted)
        )
        ).catch(error=>this.setState({error:error, authen:false}));console.log("auth=",this.state.authen);console.log("error",this.state.error);
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
        validate.emailState = 'Ha sido exitoso';
      } else {
        validate.emailState = 'En peligro';
      }
   
      this.setState({ validate });
    }

    render(){
      const{error,submitted,emai,passwor,authen,emailCuen}=this.state;
        return(
    <InfoConsumer>
      {data=>{
        return(
      <div className="container">
          <h2>Sign In</h2>
          <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="emai"
                id="exampleEmail"
                placeholder="example@example.com"
                valid={this.state.validate.emailState === "Ha sido exitoso"}
                invalid={this.state.validate.emailState === "En peligro"}
                value={emai}
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
              <Label for="examplePassword">Contrasena</Label>
              <Input
                type="password"
                name="passwor"
                id="examplePassword"
                placeholder="********"
                value={passwor}
                onChange={(e) => this.handleChange(e)}
              />
            </FormGroup> <br/>
            <Button>Submit</Button>
            <p className="small fw-bold mt-2 pt-1 mb-2">No tienes cuenta? 
            <Mod/>
            </p>
            {authen &&
<Alert color="success">Ingreso exitoso! Ya puedes ingresar.</Alert>}
{authen &&
data.setEsta(authen)}
{
 authen &&
  data.setCuentaEmail(emailCuen)
}
{authen  &&
<Navigate to={"/Escuela"}/>
}
          </Form>
        </div>
          );
        }}
       </InfoConsumer>

   /*         <MDBContainer fluid className="p-3 my-5 h-custom">

      <Form onSubmit={(e) => this.handleSubmit(e)}>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Ingresa con ..</p>

            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <Input onChange={(e) => this.handleChange(e)} wrapperClass='mb-4' name='emai' value={emai} label='Email' id='formControlLg' type='email' size="lg"/>
          <Input onChange={(e) => this.handleChange(e)} wrapperClass='mb-4'name='passwor' value={passwor} label='Contraseña' id='formControlLg' type='password' size="lg"/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Olvidaste contraseña?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">No tienes cuenta? 
            <Mod/>
            </p>
          </div>

        </MDBCol>

      </Form>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. Derechos reservados a Rosystems.
        </div>

        <div>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='twitter' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='google' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='linkedin-in' size="md"/>
          </MDBBtn>

        </div>

      </div>

        </MDBContainer> */
        );
    }
}

const Mod=()=>{
    const [gridModal, setGridModal] = useState(false);
    const toggleShow = () => setGridModal(!gridModal);

    const {rol,setRol,eata,setEsta}=useContext(InfoConsumer);
    //const {setEsta}=useAuth();
     
  return(
    <>
    <MDBBtn onClick={toggleShow}>Registrar</MDBBtn>

    <MDBModal tabIndex='-1' show={gridModal} setShow={setGridModal}>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Registro como...</MDBModalTitle>
            <MDBBtn
              type='button'
              className='btn-close'
              color='none'
              onClick={toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <div className='container-fluid bd-example-row'>
               <ul className='list-unstyled list-icons clearfix'>
                   <li><Link to={"/Signup"}>
                        <a  onClick={setRol(1)}  className='list-icons-container'>
                       {console.log("rolll",rol)}
                            <img src={admfoto}>
                            </img>
                            <p>Dueño escueala/Administrador</p>
                        </a>
                        </Link>
                    </li>
                     <li>
                        <a href="/Activacion" className='list-icons-container'>
                            <img src={mafot}>        
                            </img>
                            <p>Maestro</p>
                        </a>
                    </li>
                    <li>
                        <a href="/Activacion" className='list-icons-container'>
                            <img src={esfot}>
                            </img>
                            <p>Estudiante</p>
                        </a>
                    </li> 
                </ul>
            </div>
          </MDBModalBody>
          
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  </>
  );
   
}

export default Login;