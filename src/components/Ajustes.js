import React, {Component, useContext, useState} from 'react';
import {Button, Col, Form, Nav,NavItem,NavLink, Row,FormGroup,Label,Input, TabContent, TabPane, Alert} from 'reactstrap';
import { InfoContext } from '../context';
import classnames from 'classnames';


const Ajustes=()=>{
    const apiUrl=process.env.REACT_APP_API;

    const{daEscuela}=useContext(InfoContext)
    const[open,setOpen]=useState('1')
    const[formValue,setFormValue]=useState({nombre:"",capacidad:""})
    const[estado,setEstado]=useState(false)

    const{nombre,capacidad}=formValue;
    function tog(tag){
        if(tag!=open){
            setOpen(tag)
        }
    }
    const registrar=async()=>{
        let da={nombre:nombre,capacidad:capacidad};
       try {
        //let res=await fetch("http://localhost:3001/Salon",{
        let res=await fetch(apiUrl+`/Salon`,{          
            method:'POST',
            mode:'cors',
            body:JSON.stringify(da),
            headers:{'content-type':'application/json'},}
        )
        .then(res=>{
          if(res.ok){console.log("res",res)
            setEstado(true);
          }
        })
       } catch (error) {
        
       }
      }
    function handleSubmit(e){
        e.preventDefault();console.log("handle",nombre)
        if(!(nombre && capacidad)){
            return;
        }
        registrar()
        .then();
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
      };      
    return(
        <div className='container'>
         <h5>Ajustes Escuela</h5>   
         <hr/>
         <Row md={2}>
            <Col >
            <Nav vertical border>
         <NavItem>
            <NavLink  className={classnames({ active:open === '1' })}  onClick={()=>tog('1')}>
             Escuela
            </NavLink>
         </NavItem>
         <NavItem>
           <NavLink  className={classnames({ active: open === '2' })} onClick={()=>tog('2')}>
             Salones
        </NavLink>
        </NavItem>
        </Nav>
            </Col>
            <TabContent activeTab={open}>
                <TabPane tabId={"1"}>
                <Col>
             <div className='border formas-registros'>
                <div className='p-2 bg-light border'>Informacion Escuela</div>
                <Row>
                    <Col>
                    <FormGroup>
                     <Label for="Nombre">
                      Nombre
                     </Label>
                     <Input disabled placeholder={daEscuela.NOMBRE}>*</Input>  
                    </FormGroup>
                    </Col>
                </Row>
             </div>
            </Col>
                </TabPane>
                <TabPane tabId={"2"}>
                <Form className='border formas-registros' onSubmit={handleSubmit}>
                <div className='p-2 bg-light border'>Salones</div>
                <Row>
                    <Col>
                    <FormGroup>
                        <Label for="Nombre">
                        Nombre Salon
                        </Label>
                        <Input  style={{backgroundColor:"#fffde3"}}
                        id="nombre"
                        name="nombre"
                        placeholder="Obligatorio"
                        type="text"
                        value={formValue.nombre}
                        onChange={handleChange}
                        />
                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label for="Capacidad">
                        Capacidad
                        </Label>
                        <Input  style={{backgroundColor:"#fffde3"}}
                        id="capacidad"
                        name="capacidad"
                        placeholder="Obligatorio"
                        type="text"
                        value={formValue.capacidad}
                        onChange={handleChange}

                        />
                    </FormGroup>
                    </Col>
                </Row>
                <Button>
                Guardar
            </Button>
            {estado &&
            <Alert color='success'>Salon guardado!</Alert>}
             </Form>
                </TabPane>
            </TabContent>
           
         </Row>
         
        </div>
    );
}
export default Ajustes;