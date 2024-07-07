import React, {Component, useContext, useState} from 'react';
import { PickList } from 'primereact/picklist';
import moment from 'moment/moment';
import {DropdownToggle, Button, Form, FormGroup, Label, Input, FormText,Alert,Row,Col, DropdownItem, Dropdown, DropdownMenu } from 'reactstrap';
import { InfoContext } from '../context';
import { Navigate } from 'react-router-dom';
import Moment from 'moment'
import { extendMoment } from 'moment-range';



const RegClase=(props)=>{
  const apiUrl=process.env.REACT_APP_API;
  const momen = extendMoment(Moment);
 
  const {daMaestros, daEstudiantes, daEscuela,daClases}=useContext(InfoContext)
  const [estado,setEstado]=useState(false);
  const [source, setSource] = useState(daEstudiantes);
  const [target, setTarget] = useState([]);
  const [listpickest, setListpickest]=useState(false);
  const [formValue, setFormValue] = useState({
    nombre: "",
    maestro:daMaestros[0].NOMBRE,
    salon:"",
    fecha: "",
    fecha2: "",
    salon:"",
    target:"",
    idmaestro:0,
    source:daEstudiantes,
    validacionvalores:false
  });
  const[formFields,setFormFields]=useState([
    {dia:'Lunes',horai:'',horaf:'',nivel:''},
  ])
  const [alerta,setAlerta]=useState(false)
  const[alerMensaje,setAlermensaje]=useState("")
 
  const addFields=()=>{
    let object={
      dia:'',
      horai:'',
      horaf:'',
      nivel:''
    }
    setFormFields([...formFields,object])
  }
  const removeFields = (index) => {
    console.log("ELIdia",index)
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }
  
const registrar=async()=>{
  const idmaestro=daMaestros.find(i=>i.NOMBRE===maestro)
      setFormValue({idmaestro:idmaestro.ID})
  let da={nombre:nombre,maestro:maestro,salon:salon,fecha:formValue.fecha,fecha2:formValue.fecha2,escuelaid:daEscuela.ID,idmaestro:idmaestro.ID};
  console.log("PROPclase",da)
  try {
  let res=await fetch(apiUrl+`/Regclase`,{
      method:'POST',
      mode:'cors',
      body:JSON.stringify(da),
      headers:{'content-type':'application/json'},}
  )
  .then(res=>{
    if(res.ok){
      if(formFields.length>0){
          reglecciones()
          .then();
        }else{
          setEstado(true)
        }
    }
  })
 } catch (error) {
  
 }
}
const regclaseid=async()=>{
  let da={target:target}
  try {
    let res=await fetch(apiUrl+`/Claseid`,{
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
   let res=await fetch(apiUrl+`/Reglecciones`,{
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
        if(!(nombre && maestro && fecha && fecha2 )){
          setFormValue({validacionvalores:true})
            return;
        }
        let ban=false
        let banniv=false
        var grup=" "
  
        daClases.map(el => {
        
          formFields.map((v,i)=>{

            if(el.DIA===v.dia ){
          
              var ho1=[momen(el.HORAI.slice(0,-10),'HH:mm'),momen(el.HORAF.slice(0,-10),'HH:mm')]
              var ho2=[momen(v.horai,'HH:mm'),momen(v.horaf,'HH:mm')]
              var range1=momen.range(ho1)
              var range2=momen.range(ho2)
              if(el.NIVEL.includes(",")){
                el.NIVEL.split(",").map(ni=>{
                  if(v.nivel.includes(ni))
                  grup=ni
                  banniv=true
                })
              }else{
                if(v.nivel.includes(el.NIVEL)){
                  grup=nivel
                  banniv=true
                  
                }            
              }
            
                if(range1.overlaps(range2)){
                    if(el.MAESTRO===maestro){
                      ban=true
                      setAlermensaje(", "+el.MAESTRO+" tiene clase en la misma hora dia: "+el.DIA)
                      setAlerta(true)
                      return
                    }
                    if(banniv){
                      setAlermensaje(",grupo "+grup+" ocupado con Maestro(a):"+" "+el.MAESTRO+", dia: "+v.dia)
                      ban=true
                      setAlerta(true)
                      return
                    }
                   
                
              }
            }
          })
         
        });
        if(ban){
          return
        }

        if(target){
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
const { nombre, nivel, fecha,fecha2,maestro,salon,idmaestro} = formValue;
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
<div className="container">{console.log("formfields",formFields)}
 <h5>Agregar Clase</h5>
 <hr/>
<Form className='border ' onSubmit={handleSubmit}>
<div className="p-2 bg-light border">Ingresa datos de clase</div>

  <Row md={2}>{console.log("proclase:",idmaestro)}
    <Col >
      <FormGroup>
        <Label for="Nombre">
          Nombre Clase
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
        {daMaestros.map((item,i)=>{
          return (
            <option key={i} onClick={()=>{console.log("IDMAES:",item.ID); setFormValue({idmaestro:item.ID})}} >
              {item.NOMBRE}
              </option>

          )
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
    <h5>Recurrencia</h5>

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
    <>
   <Row md={2} key={index}>
      <Col>
      <FormGroup>
        <Label for="Nombre">
          Dia de la clase
        </Label>
        <Input  
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
          <>Nivel</>
        </Label>
        <Input
         // bsSize="lg"
          type="text"
          name="nivel"
          value={form.nivel}
          onChange={event=>handleFormChange(event,index)}
        />
           </FormGroup>
        </Col>
       

      </Row>
      <Row md={2}>
        <Col >        
        <FormGroup>
        <Label for="Nombre">
          <>Hora inicio</>
        </Label>
        <Input 
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
        <Input 
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
      <hr/>
      </>
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
  {formValue.validacionvalores &&
    <Alert color='warning'>Campos amarillos Obligatorio</Alert>
  }
</Form>
    {estado &&
    <Navigate to={'/Escuela'}/>}
    {alerta &&
      <Alert color='danger'>Elije otro horario {alerMensaje}</Alert>
    }    
 </div>
    );
}
export default RegClase;