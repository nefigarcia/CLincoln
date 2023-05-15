import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import {FaRegCalendarAlt} from "react-icons/fa";
import {FaPeopleArrows} from "react-icons/fa";
import {FaCreditCard} from "react-icons/fa";
import {BsBookFill} from "react-icons/bs";
import {BsMegaphone} from "react-icons/bs";
import {FaAddressBook} from "react-icons/fa";
import {FaArchive} from "react-icons/fa";
import {BsPlusLg} from "react-icons/bs";
import {AiOutlineUserAdd} from "react-icons/ai";
import {IoIosPersonAdd} from "react-icons/io";
import { InfoConsumer } from '../context';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from 'reactstrap';

const NavApp = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);


  return (
    <div>    
      <InfoConsumer>
      <Navbar color="light" light >
        <NavbarBrand  href="/">CLincoln</NavbarBrand>
        <Nav>
          <Link>
          <Button to="/PreLogin" color="primary" size="sm">Login</Button>{' '}
          </Link>

        <Dropdown isOpen={collapsed} toggle={toggleNavbar}>
      <DropdownToggle><BsPlusLg/>
         <i className="fas fa-caret-up"></i>

        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Agregar ...</DropdownItem>
        <DropdownItem><FaCreditCard/>Pagos</DropdownItem>
        <DropdownItem disabled>Personal </DropdownItem>
        <DropdownItem divider />
        <Link to="/Regestudiante">
        <DropdownItem><AiOutlineUserAdd/>Estudiante</DropdownItem>
        </Link>
        
        <DropdownItem><BsBookFill/>Clase</DropdownItem>
        <DropdownItem><IoIosPersonAdd/>Maestro</DropdownItem>
        <DropdownItem><FaArchive/>Staff</DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </Nav>

        <Nav className="container-fluid">
        <NavbarToggler className="me-2" onClick={toggle} />
        </Nav>
        <Collapse isOpen={isOpen} navbar>
          <Nav  navbar >
            <NavItem >
              <Link to="/preTraba"><NavLink ><FaHome/>Portal </NavLink></Link>
            </NavItem>
            <NavItem>
              <Link><NavLink><FaRegCalendarAlt/>Calendario</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link to="/PreRegistros"><NavLink><FaPeopleArrows/>Registros</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link><NavLink><BsBookFill/>Clases & Eventos</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link><NavLink><FaCreditCard/>Pagos</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link><NavLink><BsMegaphone/>Mensajeria grupal</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link><NavLink><FaAddressBook/>Reportes</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link><NavLink><FaArchive/>Administracion escolar</NavLink></Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      </InfoConsumer>
    </div>
  );
}


export default NavApp;
