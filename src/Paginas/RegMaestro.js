import { render } from '@testing-library/react';
import React, {Component, useContext, useState,useEffect} from 'react';
import {DropdownToggle, Button, Form, FormGroup, Label, Input, FormText,Alert,Row,Col } from 'reactstrap';
import { InfoContext } from '../context';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';




const RegMaestro=(props)=>{
  const{setMaestros,daMaestros,daMaestro,setMaestro,daEscuela}=useContext(InfoContext)
  const [formValue, setFormValue] = useState({
        nombre: "",
        apellidos: "",
        nacimiento: "",
        num: "",
        tel: "",
        direccion:"",
        ciudad:"",
        estado:"",
        cp:"",
        submitted:"",
        esta:"",
        email:"",
        nextpagina:false,
        datachange:false,
        loading:false,
        error:false
      });
      const { nombre, apellidos, nacimiento,num,tel,email,estado,cp,direccion,ciudad,submitted,loading,error,nextpagina} = formValue;
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
      };      
      function handleSubmit(e){
        e.preventDefault();
        setFormValue({submitted:true})
        console.log("handleSubmit",submitted);
        if(!(nombre && email)){
            return;
        }
        registrar(nombre, apellidos, nacimiento,num,tel,email,estado,cp,direccion,ciudad)
        .then(setFormValue({esta:true}));
    }
    const getMaestros=async()=>{
      try{
        const res=await fetch("http://localhost:3001/Maestros")
       // const res=await fetch("https://shielded-brushlands-89617.herokuapp.com/Maestros")
      .then((res)=>res.json())
      const maestrosIdescuela=res.filter(function(item){
        return item.ID_ESCUELA==daEscuela.ID;
      })
      setMaestros(maestrosIdescuela)
      if(res){      
        setFormValue({loading:false,nextpagina:true})
      console.log("da",daMaestro)

      }
      }catch(error){
        console.log("error",error)
      }
    }
    const registrar=(nombre, apellidos, nacimiento,num,tel,email,estado,cp,direccion,ciudad)=>{
        let da={NOMBRE:nombre,APELLIDOS:apellidos,NACIMIENTO:nacimiento,NUM:num,TEL:tel,EMAIL:email,ESTADO:estado,CP:cp,DIRECCION:direccion,CIUDAD:ciudad,ID_ESCUELA:daEscuela.ID};
        setFormValue({loading:true})
       return fetch('http://localhost:3001/Regmaestro',{
       //return fetch('https://shielded-brushlands-89617.herokuapp.com/Regmaestro',{
            method:'POST',
            mode:'cors',
            body:JSON.stringify(da),
            headers:{'content-type':'application/json'},
         })
         .then(res=>{console.log("maes",res)
          setMaestro(da)
          getMaestros();
            if(res.ok){
              

            }
         })
         .catch((error)=>{
            alert(JSON.stringify(error));
            console.log("ErrorRegMaestro",error);
         })
    }

    return(
        <div className="container">
<h5>Agregar Maestro</h5>
 <hr/>
<Form className='border formas-registros' onSubmit={handleSubmit}>
<div className="p-2 bg-light border">Ingresa datos del maestro</div>
<React.Fragment>
            <Header hidden={!loading} className="container-fluid align-items-center">
          <div className="loader-cont" >
              <div className="loader"></div>
          </div>
          </Header>
          </React.Fragment>
  <Row md={2}>
    <Col >
      <FormGroup>
        <Label for="Nombre">
          Nombre
          <span className='required' style={{color:"red"}}>*</span>
        </Label>
        <Input onChange={handleChange} style={{backgroundColor:"#fffde3"}}
          id="nombre"
          name="nombre"
          placeholder="Obligatorio"
          type="text"
          value={nombre}
        />
      </FormGroup>
    </Col>
    <Col >
      <FormGroup>
        <Label for="exApellidos">
          Apellidos
        </Label>
        <Input onChange={handleChange}
          id="nombre"
          name="apellidos"
          placeholder=" "
          type="text"
          value={apellidos}
        />
      </FormGroup>
    </Col>
  </Row>
  <hr/>
  <Row md={2}>
    <Col >
    <FormGroup>
        <Label>Nacimiento
        </Label>
        <Input 
          //bsSize="lg"
          type="date"
          name="nacimiento"
          value={nacimiento}
          onChange={handleChange}
   />
           </FormGroup>
    </Col>
    <Col >
    <FormGroup>
        <Label>Identificacion
        </Label>
        <Input
          //bsSize="lg"
          type="text"
          name="num"
          value={num}
          onChange={handleChange}
   />
           </FormGroup>
    </Col>
  </Row>
  <div className='p-2 bg-light'>Datos Contacto</div>
  <Row md={2}>
  <Col>
    <FormGroup>
    <Label for="exDireccion">
      Num. Tel.
    </Label>
    <Input
      id="tel"
      name="tel"
      placeholder="Tel."
      type="tel"
      value={tel}
      onChange={handleChange}
    />
  </FormGroup>
    </Col>
    <Col>
    <FormGroup>
    <Label for="exDireccion">
      Email
      <span className='required' style={{color:"red"}}>*</span>
    </Label>
    <Input style={{backgroundColor:"#fffde3"}}
      id="email"
      name="email"
      placeholder="email@xx.com"
      type='email'
      onChange={handleChange}
    />
  </FormGroup>
    </Col>
  </Row>
  <hr/>
    <Row>
    <Col md={6}>
    <FormGroup>
    <Label for="exDireccion">
      Direccion
    </Label>
    <Input
      id="exDireccion"
      name="direccion"
      placeholder="1234 San Marcos"
      type='text'
      value={direccion}
      onChange={handleChange}
    />
  </FormGroup>
    </Col>
    </Row>
  <Row md={3}>
    <Col>
      <FormGroup>
        <Label for="exCiudad">
          Ciudad
        </Label>
        <Input
          id="exCiudad"
          name="ciudad"
          type='text'
          value={ciudad}
          onChange={handleChange}
        />
      </FormGroup>
    </Col>
    <Col >
      <FormGroup>
        <Label for="exEstado">
          Estado
        </Label>
        <Input 
          id="estado"
          name="estado"
          type="select"
          value={estado}
          onChange={handleChange}
        >
          <option>Hidalgo</option>
          <option>Michoacan</option>
          <option>Yucatan</option>
          <option>Nuevo Leon</option>
          <option>Viernes</option>
          <option>Zacatecas</option>
          <option>Durango</option>
        </Input>
      </FormGroup>
    </Col>
    <Col>
      <FormGroup>
        <Label for="exCp">
          C.P
        </Label>
        <Input
          id="exCP"
          name="cp"
          value={cp}
          type="text"
          onChange={handleChange}
        />
      </FormGroup>
    </Col>
  </Row>
  <Button >
    Aceptar
  </Button>
</Form>

{nextpagina &&
<Navigate to={'/Perfmaestro'}/>
}
{error &&
<Alert color='warning'>Problema servidor</Alert>}
            </div>
    );
}

export default RegMaestro

const Header=styled.header`
.loader {
    position:absolute;
    top:50%;
    left:50%;
    margin-left:-50px;
    margin-top:-50px;
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0%  { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`