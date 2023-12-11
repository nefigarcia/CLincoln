import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import {FaRegCalendarAlt} from "react-icons/fa";
import {FaPeopleArrows} from "react-icons/fa";
import {FaCreditCard} from "react-icons/fa";
import {BsBookFill} from "react-icons/bs";
import {BsMegaphone,BsFillPersonFill} from "react-icons/bs";
import {FaAddressBook} from "react-icons/fa";
import {FaArchive} from "react-icons/fa";
import {BsPlusLg} from "react-icons/bs";
import {AiOutlineUserAdd} from "react-icons/ai";
import {IoIosPersonAdd} from "react-icons/io";
import { InfoConsumer, InfoContext } from '../context';
 
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  List,Tooltip,UncontrolledTooltip
} from 'reactstrap';

const NavApp = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [collapsed, setCollapsed] = useState(false);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const [collapsedd, setCollapsedd] = useState(false);
  const toggleNavbarr = () => setCollapsedd(!collapsedd);

  const addToggle=()=>{
    setTool(false)
    setProgresotool(false)
  }
const {esta,tipoTool,setTipo,daCuenta,dataChange,daEscuela,progresoTool,setProgresotool,progresoTipo}=useContext(InfoContext);
const[toolTip,setTool]=useState(true)
const[sty,setSty]=useState(false)
const toggtool=()=>setSty(!sty);
var gen;

const pp=pr();
function pr(){
  if(esta){
    var lo=document.getElementById('me').style.inset;
    console.log("loooo",lo);
 if(lo=='0px 0px auto auto'){
  //setSty(true)
  gen=lo;
  console.log("siii")
 }else{
  gen='no';
 }
  }
  
 
}
return(
          <div>
         {console.log("GEN",gen)}
        <Navbar color="light" light >
          <NavbarBrand  href="/">{esta ? daEscuela.NOMBRE:"Rosystems"}</NavbarBrand>
          <Nav>{console.log("too",toolTip, progresoTool,sty)}
            <Link to="/Login">
            <Button hidden={esta} outline color="primary">Login</Button>{' '}
            </Link>
           {progresoTipo ?
           <>
            <Tooltip placement="bottom" isOpen={toolTip} autohide={false} target="tool" >
             Da click aqui!!
           </Tooltip>
           </>:null
           }
           {/* {progresoTipo && gen!='0px 0px auto auto'?//( document.getElementById('me').style.inset='0px 0px auto auto') ?
           <>{console.log("pp",gen)}
            <Tooltip placement="left" isOpen={true} autohide={false} target="est" toggle={toggtool} delay={{ show:250, hide:250  }}>
             Da !!
           </Tooltip>
           </>:null
           }*/}
          
            <Dropdown id="sh" hidden={!esta}  isOpen={collapsed} toggle={toggleNavbar} onClick={addToggle}>
              <DropdownToggle id='tool'><BsPlusLg/>        
                </DropdownToggle>
              <DropdownMenu id='me'>     
                <DropdownItem header>Agregar ...</DropdownItem>
                <DropdownItem ><FaCreditCard/>Pagos</DropdownItem>
                <DropdownItem disabled >Personal </DropdownItem>
                <DropdownItem divider />
                <Link  to="/Regestudiante">
               <DropdownItem id="est" title='estu' ><AiOutlineUserAdd />Estudiante</DropdownItem>     
                </Link>        
        
                <Link to="/Regmaestro">
                <DropdownItem><IoIosPersonAdd/>Maestro</DropdownItem>
                </Link>
                <Link to="/RegClase"><DropdownItem ><BsBookFill/>Clase</DropdownItem></Link>
                <DropdownItem><FaArchive/>Staff</DropdownItem>
              </DropdownMenu>
            </Dropdown>
             
            <i className="fas fa-caret-up"> {daCuenta.NOMBRE} </i>
            <Dropdown hidden={!esta}  isOpen={collapsedd} toggle={toggleNavbarr}>
              <DropdownToggle id='per'><BsFillPersonFill/>
                </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>
                <i className="fas fa-caret-up">Perfil    {daCuenta.NOMBRE}</i>
                </DropdownItem>
                <DropdownItem>Mi perfil</DropdownItem>
                <Link to={"/Ajustes"}>
                <DropdownItem >Escuela configuracion </DropdownItem>
                </Link>
                <DropdownItem divider />
                
                <DropdownItem><AiOutlineUserAdd/>Permisos</DropdownItem>
            
                
                <DropdownItem>Soporte</DropdownItem>
                <DropdownItem>logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>           
          </Nav>

        
  
          <Nav className="container-fluid">
          <NavbarToggler hidden={!esta} className="me-2" onClick={toggle} />
          </Nav>
          <Collapse isOpen={isOpen} navbar>
            <Nav  navbar onClick={toggle}>
              <NavItem >
                <Link to="/Escuela"><NavLink ><i className='icon'><FaHome/>Portal</i> </NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/Calendario"><NavLink><i className='icon'><FaRegCalendarAlt/>Calendario</i> </NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/PreRegistros"><NavLink><i className='icon'><FaPeopleArrows/> Registros</i> </NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/Clases"><NavLink><i className='icon'><BsBookFill/>Clases & Eventos</i></NavLink></Link>
              </NavItem>
              <NavItem>
                <Link><NavLink><i className='icon'><FaCreditCard/>Pagos</i></NavLink></Link>
              </NavItem>
              <NavItem>
                <Link><NavLink><i className='icon'><BsMegaphone/>Mensajeria grupal</i></NavLink></Link>
              </NavItem>
              <NavItem>
                <Link><NavLink><i className='icon'><FaAddressBook/>Reportes</i></NavLink></Link>
              </NavItem>
              <NavItem>
                <Link><NavLink><i className='icon'><FaArchive/>Administracion escolar</i></NavLink></Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      
      </div>
        );
}


export default NavApp;
