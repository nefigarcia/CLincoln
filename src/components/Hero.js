import React,{useContext,useState} from "react";
import { MDBBtn, MDBModalContent,MDBModalHeader,MDBModalTitle,MDBModalBody,MDBModal,MDBModalDialog } from 'mdb-react-ui-kit';
//import rectangle_1 from '../assets/Rectangle_1.png';
//import rectangle_2 from '../assets/Rectangle_2.png'; 
//import rectangle_1 from '../Fotos/Rectangle_1.jpg';
//import rectangle_2 from '../Fotos/Rectangle_2.png';
import cel1 from '../Fotos/cel1.png';
import { Mod } from "../Paginas/Login";
import { InfoConsumer } from "../context";
import {Link, redirect} from 'react-router-dom';
import admfoto from '../Fotos/registrodueno.png';
import mafot from '../Fotos/regismaestro.png';
import esfot from '../Fotos/regisestudiante.png';


const Hero = ({appType, tagLine, description, mainActionText, extraActionText}) => {
  const [gridModal, setGridModal] = useState(false);
    const toggleShow = () => setGridModal(!gridModal);
    const {setRol}=useContext(InfoConsumer);

  return (
    <div id="product">
      <div style={{textShadow:'0px 1px 1px gray'}} className="flex flex-col items-center justify-start font-sans min-h-96 bg-gray-50 lg:pt-10 lg:pb-20 lg:bg-hero lg:bg-cover">
        <div>
          <p className="p-3 pt-12 text-lg font-bold text-gray-500 lg:text-gray-300">{appType}</p>
        </div>
        <div>
          <p className="p-2 text-4xl font-bold text-center text-blue-800 lg:mx-auto lg:w-4/6 lg:text-5xl lg:text-gray-100">
            {tagLine}
          </p>
        </div>
        <div>
          <p className="p-4 pt-6 font-sans text-2xl leading-10 text-center text-gray-500 lg:text-gray-200">
            {description}
          </p>
        </div><Prueba/>
        <div className="relative z-50 flex flex-col items-center justify-between h-48 lg:space-x-8 pt-7 lg:pt-0 lg:flex-row lg:justify-between lg:w-90">
          {/*<button href='https://m.facebook.com/rosystemss/'
            className="pt-3 pb-3 pl-12 pr-12 text-2xl font-semibold text-center text-white transition-all bg-orange-600 rounded-full shadow-2xl lg:ml-5 hover:bg-orange-700 focus:outline-none ring-4 ring-orange-600 lg:ring-2 lg:font-medium "
          ><a href='https://m.facebook.com/rosystemss/'> {mainActionText}</a>
           
  </button>*/}
        </div>
        
      </div>
      <div className="z-0 flex flex-row items-start justify-center w-screen h-screen pt-20 -mb-16 bg-gray-50 lg:bg-white lg:mb-20 lg:w-full lg:h-96 lg:pt-0">
          <img className="absolute right-0 lg:right-auto lg:ml-24 lg:-mt-16" src={cel1} alt=""/>
        </div>
    </div>
  );
};

export const Prueba=()=>{
  const [gridModal, setGridModal] = useState(false);
    const toggleShow = () => setGridModal(!gridModal);

    const {setRol}=useContext(InfoConsumer);
    //const {setEsta}=useAuth();
     
  return(
    <>
    <button className="pt-3 pb-3 text-2xl font-semibold text-center text-orange-500 transition-all rounded-full shadow-2xl lg:mr-5 hover:text-orange-500 hover:bg-gray-50 pl-11 pr-11 bg-gray-50 focus:outline-none ring-4 ring-orange-500 lg:font-medium lg:text-gray-50 lg:bg-opacity-0 lg:ring-2 lg:ring-white" onClick={toggleShow}>Prueba 1 mes gratis!</button>

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

export default Hero;