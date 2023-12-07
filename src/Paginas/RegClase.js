import React, {Component, useContext, useState} from 'react';
import { PickList } from 'primereact/picklist';
import moment from 'moment/moment';
import {DropdownToggle, Button, Form, FormGroup, Label, Input, FormText,Alert,Row,Col, DropdownItem, Dropdown, DropdownMenu } from 'reactstrap';
import { InfoContext } from '../context';
import { Navigate } from 'react-router-dom';


const RegClase=(props)=>{
  const [dropDownValue,setDropDownValue]=useState();
  const [open,setOpen]=useState(false);
  const toggle=()=>setOpen(!open);
 // const [diaDiv,setdiaDiv]=useState(['0']);
  //const [likes,setLikes]=useState(0);
  const {daMaestros, daEstudiantes, daEscuela}=useContext(InfoContext)
  const [estado,setEstado]=useState(false);
  const [source, setSource] = useState(daEstudiantes);
  const [target, setTarget] = useState([]);
  const [listpickest, setListpickest]=useState(false);
  const [formValue, setFormValue] = useState({
    nombre: "",
    nivel: "",
    maestro:daMaestros[0].NOMBRE,
    salon:"",
    fecha: "",
    fecha2: "",
    salon:"",
    target:"",
    source:daEstudiantes
  });
  const[formFields,setFormFields]=useState([
    {dia:'Lunes',horai:'',horaf:''},
  ])
 /* function addDia(){console.log("mas")
    setLikes(likes+1)
    let cloneDia=diaDiv;
    cloneDia.push(likes);
    setdiaDiv(cloneDia);

  }*/
  const addFields=()=>{
    let object={
      dia:'',
      horai:'',
      horaf:'',
    }
    setFormFields([...formFields,object])
  }
  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }
  
const registrar=async()=>{
  let da={nombre:nombre,nivel:nivel,maestro:maestro,salon:salon,fecha:formValue.fecha,fecha2:formValue.fecha2,escuelaid:daEscuela.ID};
  try {
  let res=await fetch("http://localhost:3001/Regclase",{
   //let res=await fetch("https://shielded-brushlands-89617.herokuapp.com/Regclase",{
      method:'POST',
      mode:'cors',
      body:JSON.stringify(da),
      headers:{'content-type':'application/json'},}
  )
  .then(res=>{
    if(res.ok){
      if(formFields){
          reglecciones()
          .then();
        }
    }
  })
 } catch (error) {
  
 }
}
const regclaseid=async()=>{
  let da={target:target}
  try {
    let res=await fetch("http://localhost:3001/Claseid",{
    //let res=await fetch("https://shielded-brushlands-89617.herokuapp.com/Claseid",{
      method:'POST',
      mode:'cors',
      body:JSON.stringify(da),
      headers:{'content-type':'application/json'},
    })
    .then(res=>{
      if(res.ok){
        console.log("bien")
      }
    })
  } catch (error) {
    
  }
}
const reglecciones=async()=>{
  let da={formFields:formFields}
  try {
    let res=await fetch("http://localhost:3001/Reglecciones",{
   //let res=await fetch("https://shielded-brushlands-89617.herokuapp.com/Reglecciones",{
      method:'POST',
      mode:'cors',
      body:JSON.stringify(da),
      headers:{'content-type':'application/json'},
    })
    .then(res=>{
      if(res.ok){
        setEstado(true);
      }
    })
  } catch (error) {
    
  }
}
 function handleSubmit(e){
        e.preventDefault();
        if(!(nombre && maestro)){console.log("empty",maestro)
            return;
        }
        if(target){console.log("target")
          regclaseid()
          .then();
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
    const handleFormChange=(event,index)=>{
      let data=[...formFields];
      data[index][event.target.name]=event.target.value;
      setFormFields(data);
    }
    const onChange = (event) => {
      setSource(event.source);
      setTarget(event.target);
  }
const { nombre, nivel, fecha,fecha2,maestro,salon} = formValue;
const itemTemplate = (item) => {
  return (
      <div className="product-item">
          <div className="product-list-detail">
              <h5 className="mb-2">{item.NOMBRE}</h5>
    
          </div>
          <div className="product-list-action">
              <h6 className="mb-2">Id: {item.ID}</h6>
          </div>
      </div>
  );
}
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
        {daMaestros.map((item)=>{
          return <option key={item}>{item.NOMBRE}</option>
    })} 
        </Input>
           </FormGroup>   
        </Col>
         <Col >
         <FormGroup>
        <Label>Salon de clase
       
        </Label>
        <Input 
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

{formFields.map((form,index)=>{
   return   ( 
   <Row md={4} key={index}>
      <Col>
      <FormGroup>
        <Label for="Nombre">
          Dia de la clase
        </Label>
        <Input  style={{backgroundColor:"#fffde3"}}
          id={index}
          name='dia'
          type="select"
          value={form.dia}
          onChange={event=>handleFormChange(event,index)}
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
          name="horai"
          value={form.horai}
          onChange={event=>handleFormChange(event,index)}
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
          name="horaf"
          value={form.horaf}
          onChange={event=>handleFormChange(event,index)}
        />
           </FormGroup>
        </Col>
        <Col sm={2}>
        <a className='label d-flex justify-content-start' style={{color:"red"}} onClick={()=>removeFields()} >X</a>
        </Col>

      </Row>
       )
}
)}    
 
 <a className='label d-flex justify-content-start' onClick={()=>addFields()} >+ Agregar dia</a>
 <div className="p-2 bg-light border">Estudiantes</div>
    <Row md={2}>
      <Col>
      <h9>Selecciona estudiantes</h9>
      </Col>
      <Col>
      </Col>
    </Row>
   <Row md={2}>
    <Col>
     <a className='label ' onClick={()=>setListpickest(false)}>Omitir </a>
     <a className='label ' onClick={()=>setListpickest(true)}> +Agregar estudiantes</a>
    </Col>
    <Col>
    </Col>
   </Row>
    
    <div className="picklist-demo" hidden={!listpickest}>
            <div className="card">
                <PickList 
                source={source} 
                target={target} 
                itemTemplate={itemTemplate} 
                sourceHeader="Inscritos" 
                targetHeader="Seleccionados"
                sourceStyle={{ height: '242px' }} 
                targetStyle={{ height: '242px' }} 
                onChange={onChange}
                filterBy="NOMBRE" sourceFilterPlaceholder="Busqueda por nombre" targetFilterPlaceholder="Busqueda por nombre" />
            </div>
        </div>
    
   <Button>
    Aceptar
  </Button>
</Form>
    {estado &&
    <Navigate to={'/Escuela'}/>}    
 </div>
    );
}
export default RegClase;