import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText,Alert,Row,Col } from 'reactstrap';
import { InfoConsumer } from '../context';
import { Navigate } from 'react-router-dom';
import {InfoContext} from '../context'

class regEstudiante extends Component{
    constructor(props){
        super(props);
        this.state={
            nombre:'',
            apellidos:'',
            nacimiento:'',
            tel:'',
            email:'',
            direccion:'',
            municipio:'',
            estado:'',
            cp:'',
            estado:'',
            submitted:false,
            dataChange:false,
            daEstudiantes:'',
            daEstudiante:'',
            nextpagina:false,
            daEscuela:'',
            validacionCampos:false
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }
    static contextType=InfoContext;
     apiUrl=process.env.REACT_APP_API;

    componentDidMount(){
      const contex=this.context;
      this.setState({daEscuela:contex.daEscuela})
      
    }
    getEst(){     
    fetch(this.apiUrl+`/Estudiantes`)
    .then(res=>res.json())
    .then(res=>{
      if(res){
        const daestudiantesEscuela=res.filter(i=>
           i.ID_ESCUELA==this.context.daEscuela.ID
        )
        this.context.setEstudiantes(daestudiantesEscuela)
        this.setState({daEstudiantes:this.context.daEstudiantes, dataChange:true},()=>{
        })
        this.getEstudiante(this.state.email)
      }
    })
  }

  getEstudiante(email){
    const estudiante=this.state.daEstudiantes.find(item=>item.EMAIL===email)
    this.setState({daEstudiante:estudiante})
    this.setState({nextpagina:true})
    this.context.setLoadinglogo(false)
  }
handleSubmit(e){
    e.preventDefault();
    this.setState({submitted:true});
    const{nombre,apellidos,nacimiento,tel,email,direccion,municipio,estado,cp,daEscuela}=this.state;
    if(!(nombre && apellidos && email)){
      this.setState({validacionCampos:true})
        return;
    }
    this.context.setLoadinglogo(true)
    this.registrar(nombre,apellidos,nacimiento,tel,email,direccion,municipio,estado,cp,daEscuela.ID)
    .then(this.setState({log:true}));
}
registrar(nombre,apellidos,nacimiento,tel,email,direccion,municipio,estado,cp,ID){
    let dat={nombre:nombre,apellidos:apellidos,nacimiento:nacimiento,tel:tel,email:email,direccion:direccion,municipio:municipio,estado:estado,cp:cp,ID_ESCUELA:ID};
    
    return fetch(this.apiUrl+`/Regestudiante`,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(dat),
        headers:{'content-type': 'application/json'},
    })//.then(this.handleResponse)
    .then(res=>{
      if(res.ok){
        this.getEst();
      }
      
    })
    .catch(err=>err);
}
handleChange(event){
  const{name,value}=event.target;
  this.setState({[name]:value});
}

    render(){
      const{nombre,apellidos,dataChange,estado,daEstudiantes,nextpagina,daEstudiante,validacionCampos}=this.state;
        return(
<InfoConsumer> 
  {data=>{
  return(        
<div className="container">
<h5>Agregar Estudiante</h5>
 <hr/>
<Form className='border formas-registros' onSubmit={this.handleSubmit}>
<div className="p-2 bg-light border">Ingresa datos de estudiante</div>

  <Row md={2}>
    <Col >
      <FormGroup>
        <Label for="Nombre">
          Nombre
          <span className='required' style={{color:"red"}}>*</span>
        </Label>
        <Input onChange={this.handleChange} style={{backgroundColor:"#fffde3"}}
          id="nombre"
          name="nombre"
          placeholder="Obligatorio"
          type="text"
        />
      </FormGroup>
    </Col>
    <Col >
      <FormGroup>
        <Label for="exApellidos">
          Apellidos
          <span className='required' style={{color:"red"}}>*</span>
        </Label>
        <Input onChange={this.handleChange} style={{backgroundColor:"#fffde3"}}
          id="nombre"
          name="apellidos"
          placeholder=" "
          type="text"
        />
      </FormGroup>
    </Col>
  </Row>
  <hr/>
  <Row md={2}>
   
    <Col >
    <FormGroup>
        <Label>Nacimiento
        <span >(Opcional)</span>
        </Label>
        <Input
          //bsSize="lg"
          type="date"
          name="nacimiento"
         // value={date}
          onChange={this.handleChange}
   />
           </FormGroup>
    </Col>
  </Row>
  <div className='p-2 bg-light'>Datos Contacto</div>
  <Row md={2}>
  <Col>
    <FormGroup>
    <Label for="tel">
      Num. Tel.
    </Label>
    <Input
      id="tel"
      name="tel"
      placeholder="Tel."
      type='number'
      onChange={this.handleChange}
    />
  </FormGroup>
    </Col>
    <Col >
    <FormGroup>
    <Label for="email">
      Email
      <span className='required' style={{color:"red"}}>*</span>
    </Label>
    <Input style={{backgroundColor:"#fffde3"}}
      id="email"
      name="email"
      placeholder="email@xx.com"
      type='email'
      onChange={this.handleChange}
    />
  </FormGroup>
    </Col>
  </Row>
  <hr/>
    <Row>
    <Col md={6}>
    <FormGroup>
    <Label for="direccion">
      Direccion
    </Label>
    <Input
      id="direccion"
      name="direccion"
      placeholder="1234 San Marcos"
      type='text'
      onChange={this.handleChange}
    />
  </FormGroup>
    </Col>
    </Row>
  <Row md={3}>
    <Col>
      <FormGroup>
        <Label for="municipio">
          Municipio
        </Label>
        <Input
          id="municipio"
          name="municipio"
          onChange={this.handleChange}
        />
      </FormGroup>
    </Col>
    <Col >
      <FormGroup>
        <Label for="estado">
          Estado
        </Label>
        <Input  
          id="estado"
          name="estado"
          type="select"
          value={estado}
          onChange={this.handleChange}
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
    <Col >
      <FormGroup>
        <Label for="exCp">
          C.P
        </Label>
        <Input
          id="exCP"
          name="cp"
          onChange={this.handleChange}
        />
      </FormGroup>
    </Col>
  </Row>
  <Button >
    Aceptar
  </Button>
  {validacionCampos &&
    <Alert color='warning'>Campos amarillos Obligatorios</Alert>
  }
</Form>
{dataChange &&
            data.setDatachange(dataChange)}
{dataChange &&
data.setEstudiantes(daEstudiantes)} 
{nextpagina &&
data.setEstudiante(daEstudiante)}             
{nextpagina &&
<Navigate to={'/Perfestudiante'} />
}            
            </div>
           
  );}}
            </InfoConsumer>           
        );
    }
}

export default regEstudiante;