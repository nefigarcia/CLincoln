import React,{Component} from 'react';
import { Media } from 'reactstrap';
import { InfoConsumer } from '../context';

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
            submitted:false
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }

    handleSubmit(e){
        e.preventDefault();
        const{nombre,apellidos,email,contrasena}=this.state;
        if(!(nombre && apellidos && email && contrasena)){
            console.log("entrando", nombre)
            return;
        }
        
        this.registrar(nombre,apellidos,email,contrasena);
    }
    registrar(nombre,apellidos,email,contrasena){
        let dat={nombre:nombre,apellidos:apellidos,email:email,contrasena:contrasena};
        console.log(dat);
        return fetch('http://localhost:3001/Signup',{
               method:'POST',
               mode:'cors',
               body:JSON.stringify(dat),
               headers:{'content-type':'application/json'},
            })
            .then(res=>res.json())
            .catch(err=>err);
    }
    handleChange(event){
        const{name,value}=event.target;
        this.setState({[name]:value});
    }

    render(){
        const{nombre,apellidos,email,contrasena,submitted}=this.state;
        return (
            <InfoConsumer>
                {data=>{
                    return(
                        <MDBContainer  fluid className='my-5'>                      
        
              <MDBRow  className='g-0 align-items-center'>
                <MDBCol col='6'>
        
                  <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
                    <MDBCardBody onClick={this.handleSubmit} className='p-5 shadow-5 text-center'>
        
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
        
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
        
                <MDBCol col='6'>
                  <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" class="w-100 rounded-4 shadow-4"
                    alt="" fluid/>
                </MDBCol>
        
              </MDBRow>
        
            </MDBContainer>
                    );
                }}
            </InfoConsumer>
            
          );
    }
}

export default Signup;