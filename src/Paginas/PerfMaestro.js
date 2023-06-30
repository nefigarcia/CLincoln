import React, {Component, useContext, useState} from 'react';
import { InfoContext } from '../context';
import nousuario from '../Fotos/nousuario.jpg'
import classnames from 'classnames';

import {DropdownToggle, Form, FormGroup, Label, Input, FormText,Alert, DropdownItem, Dropdown, DropdownMenu, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Table,Card,CardTitle,CardText  } from 'reactstrap';

const Perfmaestro=()=>{
    const {daMaestro}=useContext(InfoContext)
    const [activeTab,setActivetab]=useState('1');
    const ButtonToggle=(tap)=>{
        if(activeTab!==tap){
            setActivetab(tap)
        }
    }
    return(
        <div className='container'>
            <h5>Perfil Maestro</h5>
            <hr/>
            <Row>
                <Col md={3}>
                <div className='thumbnail-bg' >
                    <img src={nousuario}></img>
                </div>
                </Col>
                <Col md={3}>
                    <div>{daMaestro.NOMBRE}</div>
                    <p>{daMaestro.EMAIL}</p>
                    <p>{daMaestro.TEL}</p>
                </Col>
            </Row>
            <Row>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { ButtonToggle('1'); }}
                >
                  Perfil
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => {ButtonToggle('2'); }}
                >
                  Clases
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Table>
        <tbody className='border'>
            <tr>
                <td>
                   <div ><div>Tel.</div><div>{daMaestro.TEL}</div></div> 
                </td>
                <td>
                <div ><div>Email</div><div>{daMaestro.EMAIL}</div></div> 
                </td>
            </tr>
            <tr>
                <td>
                <div ><div>Nacimiento</div><div>{daMaestro.NACIMIENTO}</div></div> 
                </td>
                <td>
                <div ><div>Id Num.</div><div></div></div> 
                </td>
            </tr>
            <tr>
                <td>
                <div ><div>Direccion</div><div>{daMaestro.DIRECCION}</div></div> 
                </td>
                <td>
                <div ><div>Metodo Pago</div><div></div></div> 
                </td>
            </tr>
            <tr>
                <td>
                <div ><div>Notas Generales</div><div></div></div> 
                </td>
                <td>
                <div ><div>Notas Medicas</div><div></div></div> 
                </td>
            </tr>
              {/*<InfoConsumer>
                    {value=>{
                      console.log("renderingPreRegistros:",value.daEstudiantes)
                        return value.daEstudiantes.map(item=>{
                            return <Registros key={item.ID} item={item}/>;
                            
                        })
                    }}
                </InfoConsumer> */}
                </tbody>       
                </Table>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>En proceso</CardTitle>
                      <CardText>En desarrollo.</CardText>
                      <Button>Proximamente</Button>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
            </Row>
        </div>
    );
}
export default Perfmaestro;