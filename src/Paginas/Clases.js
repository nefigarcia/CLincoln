import React, {Component, useContext, useState} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table } from 'reactstrap';
import classnames from 'classnames';
import { InfoContext } from '../context';
import { Link } from "react-router-dom";
import moment from 'moment';

export const Clases=(props)=>{
    const[activeTab,setActiveTab]=useState('1');
    const{daClases,leccionesDate}=useContext(InfoContext);
    function toggle(tab){
        if(activeTab!==tab){
            setActiveTab(tab)
        }
    }
    const daClasesunic=leccionesDate.filter((value,index,self)=>
        index===self.findIndex((t)=>(
            t.ID_CLASE===value.ID_CLASE
        ))
    )
    return(
        <div className='container'>
            <h5>Clases</h5>
            <hr/>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => {toggle('1'); }}
                >
                  Clases
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { toggle('2'); }}
                >
                  Eventos
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Table>
                <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Maestro</th>
            <th>Inicio</th>
            <th>Final</th>
            <th>Dias/horas</th>
          </tr>
        </thead>
        <tbody>{console.log("CLASES:",leccionesDate)}
            {daClasesunic.map(item=>{
                return <Clasess key={item.ID} item={item} clasesunic={daClasesunic}/>
            })}
        </tbody>       
                </Table>
              </TabPane>

              <TabPane tabId="2">
              <Table>
                <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
          </tr>
        </thead>
                <tbody>
            
                </tbody>       
                </Table>
              </TabPane>
            </TabContent>
        </div>
    );
}

export const Clasess=(props)=>{
  const{setClase}=useContext(InfoContext);
  function setIdclase(id){
    setClase(props.clasesunic.find(item=>item.ID_CLASE===id))
    console.log("unic",props.clasesunic);
    console.log("propItem",props.item)
  }
    return(
        <tr>
          <th scope="row">{props.item.ID}</th>
          <Link to='/Perfclase' >
          <td onClick={()=>setIdclase(props.item.ID_CLASE)}>{props.item.NOMBRE}</td>
          </Link>
          <td>{props.item.MAESTRO}</td>
          <td>{props.item.FECHAI}</td>
          <td>{props.item.FECHAF}</td>
          <td>{props.item.DIA}</td>
        </tr>
              );
}

export const Perfclase=(props)=>{

  const[activeTab,setActiveTab]=useState('1');
  const{daClase,daClases,leccionesDate}=useContext(InfoContext);
  const lecciones=leccionesDate.filter(function(item){
  return  item.ID_CLASE==daClase.ID_CLASE
  });

  function toggle(tab){
    if(activeTab!==tab){
        setActiveTab(tab)
    }
}
  return(
    <div className='container'>
       <h5>Clase</h5>
       <hr/>
       <Row md={2}>
        <Col>
         <h6>{daClase.NOMBRE}</h6>
         <div>
          <i>{lecciones.map(item=>{return <>{item.DIA} {item.HORAI.slice(0,-10)}-{item.HORAF.slice(0,-10)} </> })}</i>
         </div>

        </Col>
        <Row>
          <Col>
          <span>Maestra:{daClase.MAESTRO}</span>
          </Col>
        </Row>
        <Col>
        </Col>
       </Row>

       <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => {toggle('1'); }}
                >
                  Clases
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { toggle('2'); }}
                >
                  Eventos
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Table>
                <thead>
          <tr>
             Lecciones
          </tr>
        </thead>
        <tbody>{console.log("LEC",lecciones)}
           {lecciones.map(item=>{
             return <tr>
             <th scope="row">{moment(item.FECHA).format("DD/MM/YYYY")}</th>
             {/*<Link to='/Perfclase' >
             <td onClick={()=>setIdclase(item.ID)}>{item.NOMBRE}</td>
           </Link>*/}
        
             <td>{item.DIA} {item.HORAI.slice(0,-10)}-{item.HORAF.slice(0,-10)}</td>
             <td>{item.MAESTRO}</td>
           </tr>
           })}
        </tbody>       
                </Table>
              </TabPane>

              <TabPane tabId="2">
              <Table>
                <thead>
                  <tr>

                  </tr>
               </thead>
                 <tbody>
            
                </tbody>       
                </Table>
              </TabPane>
            </TabContent>
    </div>
   
  );
}