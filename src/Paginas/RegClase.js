import React, {Component, useState} from 'react';
import {DropdownToggle, Button, Form, FormGroup, Label, Input, FormText,Alert,Row,Col, DropdownItem, Dropdown, DropdownMenu } from 'reactstrap';


const RegClase=(props)=>{
  const [dropDownValue,setDropDownValue]=useState();
  const [open,setOpen]=useState(false);
  const toggle=()=>setOpen(!open);
  const [diaDiv,setdiaDiv]=useState(['nDia']);
  const [likes,setLikes]=useState(0);
  const [formValue, setFormValue] = useState({
    nombre: "",
    nivel: "",
    date: "",
    date2: "",
    maestro: "",
    salon:"",
    hora:"",
    hora2:"",
    dia:""

  });
  function addDia(){
    setLikes(likes+1)
    console.log("array")
    let cloneDia=diaDiv;
    cloneDia.push('nDia');
    setdiaDiv(cloneDia);
    console.log("array",cloneDia)

  }

 function handleSubmit(e){
        e.preventDefault();
        this.setState({submitted:true});
        const{nombre,apellidos}=this.state;
        console.log(nombre,apellidos,"handleSubmit");
        if(!(nombre && apellidos)){
            return;
        }
        this.registrar(nombre,apellidos)
        .then(this.setState({log:true}));
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
   
const { nombre, nivel, date,date2,maestro,salon,hora,hora2 ,dia} = formValue;

    return(
<div className="container">
 <h5>Agregar Clase</h5>
 <hr/>
<Form className='border ' onSubmit={handleSubmit}>
<div className="p-2 bg-light border">Ingresa datos de clase</div>

  <Row>
    <Col md={4}>
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
    <Col md={4}>
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
      <Row>
        <Col md={3}>
       
        <FormGroup>
        <Label>Maestro
        <span className='required' style={{color:"red"}}>*</span>
        </Label>
        <Input style={{backgroundColor:"#fffde3"}}
          type="select"
          name="maestro"
          value={maestro}
          onChange={handleChange}
   />
           </FormGroup>
       
          
        </Col>
         <Col md={3}>
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

    <Row>
        <Col md={3}>      
        <FormGroup>
        <Label>Fecha inicio
        <span className='required' style={{color:"red"}}>*</span>
        </Label>
        <Input style={{backgroundColor:"#fffde3"}}
          //bsSize="lg"
          type="date"
          name="date"
          value={date}
          onChange={handleChange}
   />
           </FormGroup>
       
          
        </Col>
         <Col md={3}>
        
        <FormGroup>
        <Label>Fecha termino
        <span className='required' style={{color:"red"}}>*</span>
        </Label>
        <Input style={{backgroundColor:"#fffde3"}}
         // bsSize="lg"
          type="date"
          name="date2"
          value={date2}
          onChange={handleChange}
        />
           </FormGroup>

        </Col>
      </Row>

{diaDiv.map(item=>{
   return   <Row key={item}>
      <Col md={3}>
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
          <option>Domingo</option>
        </Input>
      </FormGroup>
    </Col>
    <Col md={3}>        
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
        <Col md={3}>        
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
  <Button>
    Aceptar
  </Button>
</Form>
        
            </div>
    );
}
export default RegClase;