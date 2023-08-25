import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useContext } from 'react';
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
  List
} from 'reactstrap';

const NavApp = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [collapsed, setCollapsed] = useState(false);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const [collapsedd, setCollapsedd] = useState(false);
  const toggleNavbarr = () => setCollapsedd(!collapsedd);
const {esta,setEsta,estaMenu,cuentEmail,daCuenta,dataChange}=useContext(InfoContext);
     
        return(
          <div>    
        <Navbar color="light" light >
          <NavbarBrand  href="/">CLincoln</NavbarBrand>
          <Nav>
            <Link to="/Login">
            <Button hidden={esta} outline color="primary">Login</Button>{' '}
            </Link>
            
            
            <Dropdown hidden={!esta}  isOpen={collapsed} toggle={toggleNavbar}>
              <DropdownToggle><BsPlusLg/>        
                </DropdownToggle>
              <DropdownMenu>     
                <DropdownItem header>Agregar ...</DropdownItem>
                <DropdownItem><FaCreditCard/>Pagos</DropdownItem>
                <DropdownItem disabled>Personal </DropdownItem>
                <DropdownItem divider />
                <Link to="/Regestudiante">
                <DropdownItem><AiOutlineUserAdd/>Estudiante</DropdownItem>
                </Link>
                <Link to="/RegClase"><DropdownItem ><BsBookFill/>Clase</DropdownItem></Link>
                <Link to="/Regmaestro">
                <DropdownItem><IoIosPersonAdd/>Maestro</DropdownItem>
                </Link>
                <DropdownItem><FaArchive/>Staff</DropdownItem>
              </DropdownMenu>
            </Dropdown>
             
            <i className="fas fa-caret-up"> {daCuenta.NOMBRE} </i>
            <Dropdown hidden={!esta}  isOpen={collapsedd} toggle={toggleNavbarr}>
              <DropdownToggle><BsFillPersonFill/>
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
            <Nav  navbar >
              <NavItem >
                <Link to="/Escuela"><NavLink ><i className='icon'><FaHome/>Portal</i> </NavLink></Link>
              </NavItem>
              <NavItem>
                <Link><NavLink><i className='icon'><FaRegCalendarAlt/>Calendario</i> </NavLink></Link>
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
