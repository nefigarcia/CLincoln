import React,{Component,useContext,useState} from 'react';
import { Card, CardBody, Col, Container, Media, Row } from 'reactstrap';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox,MDBModalContent,MDBModalHeader,MDBModalTitle,MDBModalBody,MDBModalFooter,MDBModal,MDBModalDialog } from 'mdb-react-ui-kit';
import {Link, redirect} from 'react-router-dom';
import admfoto from '../Fotos/registrodueno.png';
import mafot from '../Fotos/regismaestro.png';
import esfot from '../Fotos/regisestudiante.png';
import { InfoConsumer,InfoContext,useAuth } from '../context';
import { Navigate } from 'react-router-dom';
import {
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Label,
  Input,
  Button,
  Alert, Jumbotron
} from 'reactstrap';
import { Loading } from '../components/Loading';


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
static contextType=InfoContext;


    login(emai,passwor){
      const cont=this.context;
      cont.setLoadinglogo(true)
      let da={email:emai,contrasena:passwor};
        const requestOpt={
            method:'POST',
            mode:'cors',
            body:JSON.stringify(da),
            headers:{'content-type':'application/json'}
        };

      return fetch("http://localhost:3001/Login",requestOpt)
      //return fetch("https://shielded-brushlands-89617.herokuapp.com/Login",requestOpt)
        .then(response=>response.json())
        .then(response=>{
          
          if(response!=="Revisa tus datos") {
             const contex=this.context;   
              var item=response.find(item=>{
              return item.EMAIL;
          });
          contex.setCuenta(item)
          if(response){
            this.setState({authen:true,emailCuen:item},()=>
            console.log("login then",this.state.authen),
            cont.setLoadinglogo(false)
            )
          }
        }else{
          this.setState({error:response})
        }})
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
        }
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
      <div  className='div-center'>     <Loading/>     
         <h1><span className='text-center'>Ingreso</span></h1>
        
             <Form className='login-form border' onSubmit={(e) => this.handleSubmit(e)}>
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
            </FormGroup>
            <div className='d-grid'><button className="btn-md btn btn-primary">Aceptar</button></div>
            
                <div className='text-center pt-3'>--O--</div>
            <p className="small fw-bold mt-2 pt-1 mb-2">No tienes cuenta? 
            <Mod/>
            </p>
            {authen &&
<Alert color="success">Ingreso exitoso! Ya puedes ingresar.</Alert>}
{error=="Revisa tus datos" &&
  <Alert color="danger">Revisa email o contrasena!!!.</Alert>}

{authen &&
data.setEsta(authen)}
{/*{
 authen &&
 data.setCuenta(emailCuen)
}*/}
{
 authen &&
 data.getDataCuenta(emailCuen)
}
{!data.loading &&
<Navigate to={"/Escuela"}/>
}

          </Form>                       
        </div>
          );
        }}
       </InfoConsumer>
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
    <Button className='btn-sm' onClick={toggleShow}>Registrar</Button>

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
                            <img src={admfoto}>
                            </img>
                            <p>Directivo escuela/Administrador</p>
                        </a>
                        </Link>
                    </li>
                     <li><Link to={"/Activacion"}>
                     <a className='list-icons-container'>
                            <img src={mafot}>        
                            </img>
                            <p>Maestro</p>
                        </a>
                        </Link>
                        
                    </li>
                    <li><Link to={"/Activacion"}>
                    <a className='list-icons-container'>
                            <img src={esfot}>
                            </img>
                            <p>Estudiante</p>
                        </a>
                        </Link>
                        
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