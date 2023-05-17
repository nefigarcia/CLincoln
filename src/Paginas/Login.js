import React,{Component,useState} from 'react';
import { Media } from 'reactstrap';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox,MDBModalContent,MDBModalHeader,MDBModalTitle,MDBModalBody,MDBModalFooter,MDBModal,MDBModalDialog } from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom';
import admfoto from '../Fotos/registrodueno.png';
import mafot from '../Fotos/regismaestro.png';
import esfot from '../Fotos/regisestudiante.png';

class Login extends Component{
    render(){
        return(
            <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

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

          <MDBInput wrapperClass='mb-4' label='Email' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Contraseña' id='formControlLg' type='password' size="lg"/>

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

      </MDBRow>

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

    </MDBContainer>
        );
    }
}

const Mod=(props)=>{
    const [gridModal, setGridModal] = useState(false);

  const toggleShow = () => setGridModal(!gridModal);
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
                   <li>
                        <a href="/Signup" className='list-icons-container'>
                            <img src={admfoto}>
                            </img>
                            <p>Dueño escueala/Administrador</p>
                        </a>
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