import React, {Component, useContext, useState} from 'react';
import {DropdownToggle, Button, Form, FormGroup, Label, Input, FormText,Alert,Row,Col, DropdownItem, Dropdown, DropdownMenu } from 'reactstrap';
import { InfoContext } from '../context';


const RegClase=(props)=>{
  const [dropDownValue,setDropDownValue]=useState();
  const [open,setOpen]=useState(false);
  const toggle=()=>setOpen(!open);
  const [diaDiv,setdiaDiv]=useState(['nDia']);
  const [likes,setLikes]=useState(0);
  const {daMaestros}=useContext(InfoContext)
  const [estado,setEstado]=useState(false);
  const [formValue, setFormValue] = useState({
    nombre: "",
    nivel: "",
    maestro:"",
    salon:"",
    fecha: "",
    fecha2: "",
    maestro: "",
    salon:"",
    hora:"",
    hora2:"",
    dia:""
  });
  function addDia(){console.log("mas")
    setLikes(likes+1)
    let cloneDia=diaDiv;
    cloneDia.push('nDia');
    setdiaDiv(cloneDia);

  }
const registrar=async()=>{console.log("regis")
  let da={nombre:nombre,nivel:nivel,maestro:maestro,salon:salon,fecha:formValue.fecha,fecha2:formValue.fecha2,dia:dia,hora:hora,hora2:hora2};
 try {
  let res=await fetch("http://localhost:3001/Regclase",{
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
        e.preventDefault();console.log("handle",formValue)
        if(!(nombre && maestro)){
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
   
const { nombre, nivel, fecha,fecha2,maestro,salon,hora,hora2 ,dia} = formValue;

    return(
<div className="container">
 <h5>Agregar Clase</h5>
 <hr/>
<Form className='border ' onSubmit={handleSubmit}>
<div className="p-2 bg-light border">Ingresa datos de clase</div>

  <Row md={2}>
    <Col >
      <FormGroup>
        <Label for="Nombre">
          Nombre Clase
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
          Nivel
        </Label>
        <Input onChange={handleChange}
          id="nivel"
          name="nivel"
          placeholder=" "
          type="text"
          value={nivel}
        />
      </FormGroup>
    </Col>
  </Row>
 
 
  <div className="p-2 bg-light border">Maestro & Salon de clases</div>
      <Row md={2}>
        <Col >
       
        <FormGroup>
        <Label>Maestro
        <span className='required' style={{color:"red"}}>*</span>
        </Label>
        <Input style={{backgroundColor:"#fffde3"}}
          type="select"
          name="maestro"
          value={maestro}
          onChange={handleChange}
   >

        
        {daMaestros.map((item)=>{console.log("maesmap",item)
          return <option key={item}>{item.NOMBRE}</option>
    })} 
        </Input>
           </FormGroup>   
        </Col>
         <Col >
         <FormGroup>
        <Label>Salon de clase
        <span className='required' style={{color:"red"}}>*</span>
        </Label>
        <Input style={{backgroundColor:"#fffde3"}}
          //bsSize="lg"
          type="select"
          name="salon"
          value={salon}
          onChange={handleChange}
          
   />
           </FormGroup>
        </Col>
      </Row>
<div className="p-2 bg-light border">Horario Clase</div>
    <h5>Clase semanal</h5>

    <Row md={2}>
        <Col >      
        <FormGroup>
        <Label>Fecha inicio
        <span className='required' style={{color:"red"}}>*</span>
        </Label>
        <Input style={{backgroundColor:"#fffde3"}}
          //bsSize="lg"
          type="date"
          name="fecha"
          value={fecha}
          onChange={handleChange}
   />
           </FormGroup>
       
          
        </Col>
         <Col >
        
        <FormGroup>
        <Label>Fecha termino
        <span className='required' style={{color:"red"}}>*</span>
        </Label>
        <Input style={{backgroundColor:"#fffde3"}}
         // bsSize="lg"
          type="date"
          name="fecha2"
          value={fecha2}
          onChange={handleChange}
        />
           </FormGroup>

        </Col>
      </Row>

{diaDiv.map(item=>{
   return   <Row md={3} key={item}>
      <Col>
      <FormGroup>
        <Label for="Nombre">
          Dia de la clase
        </Label>
        <Input  style={{backgroundColor:"#fffde3"}}
          id="dia"
          name="dia"
          type="select"
          value={dia}
          onChange={handleChange}
        >
          <option>Lunes</option>
          <option>Martes</option>
          <option>Miercoles</option>
          <option>Jueves</option>
          <option>Viernes</option>
          <option>Sabado</option>
        </Input>
      </FormGroup>
    </Col>
    <Col >        
        <FormGroup>
        <Label for="Nombre">
          <>Hora inicio</>
        </Label>
        <Input style={{backgroundColor:"#fffde3"}}
         // bsSize="lg"
          type="time"
          name="hora"
          value={hora}
          onChange={handleChange}
        />
           </FormGroup>

        </Col>
        <Col >        
        <FormGroup>
        <Label for="Nombre">
          <>Hora final</>
        </Label>
        <Input style={{backgroundColor:"#fffde3"}}
         // bsSize="lg"
          type="time"
          name="hora2"
          value={hora2}
          onChange={handleChange}
        />
           </FormGroup>

        </Col>
      </Row>
      
}
)}    
 
 <a className='label d-flex justify-content-start' onClick={addDia}>+ Agregar dia</a>
 <div className="p-2 bg-light border">Estudiantes</div>
    <h9>Selecciona estudiantes</h9>
  <Button>
    Aceptar
  </Button>
</Form>
        
            </div>
    );
}
export default RegClase;