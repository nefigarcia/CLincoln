import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText,Alert,Row,Col } from 'reactstrap';


class regEstudiante extends Component{
    constructor(props){
        super(props);
        this.state={
            nombre:'',
            apellidos:'',
            submitted:false,
            log:''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }
handleSubmit(e){
    e.preventDefault();
    console.log('testing');
    this.setState({submitted:true});
    const{nombre,apellidos}=this.state;
    console.log(nombre,apellidos,"handleSubmit");
    if(!(nombre && apellidos)){
        return;
    }
    this.registrar(nombre,apellidos)
    .then(this.setState({log:true}));
}
registrar(nombre,apellidos){
    let dat={nombre:nombre,apellidos:apellidos};console.log("nombre",nombre);
    //return fetch("https://shielded-brushlands-89617.herokuapp.com/Regestudiante",{
      return fetch("https://localhost:3001/Regestudiante",{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(dat),
        headers:{'content-type': 'application/json'},
    })//.then(this.handleResponse)
    .then(res=>res.json())
    .catch(err=>err);
}
handleChange(event){
  const{name,value}=event.target;
  this.setState({[name]:value});
}

handleResponse(response){
	return response.text().then(text=>{
		const data=text && JSON.parse(text);
		if(!response.ok){
			if(response.ok===401){
				console.log('error 401');
			}console.log("error401")
			const error=(data && data.message) || response.statusText;
			return Promise.reject(error);
		}
		return data;
	});
} 

    render(){
   //   const{nombre,apellidos}=this.state;
        return(
            <div className="container">
<Form onSubmit={this.handleSubmit}>
  <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="Nombre">
          Nombre
        </Label>
        <Input onChange={this.handleChange} 
          id="nombre"
          name="nombre"
          placeholder="Obligatorio"
          type="text"
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="exApellidos">
          Apellidos
        </Label>
        <Input onChange={this.handleChange}
          id="nombre"
          name="apellidos"
          placeholder=" "
          type="text"
        />
      </FormGroup>
    </Col>
  </Row>
  <FormGroup>
    <Label for="exDireccion">
      Direccion
    </Label>
    <Input
      id="exDireccion"
      name="direccion"
      placeholder="1234 San Marcos"
    />
  </FormGroup>
 
  <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="exCiudad">
          Ciudad
        </Label>
        <Input
          id="exCiudad"
          name="ciudad"
        />
      </FormGroup>
    </Col>
    <Col md={4}>
      <FormGroup>
        <Label for="exEstado">
          Estado
        </Label>
        <Input
          id="exEstado"
          name="estado"
        />
      </FormGroup>
    </Col>
    <Col md={2}>
      <FormGroup>
        <Label for="exCp">
          C.P
        </Label>
        <Input
          id="exCP"
          name="cp"
        />
      </FormGroup>
    </Col>
  </Row>
  <FormGroup check>
    <Input
      id="exampleCheck"
      name="check"
      type="checkbox"
    />
    <Label
      check
      for="exampleCheck"
    >
      Click
    </Label>
  </FormGroup>
  <Button>
    Aceptar
  </Button>
</Form>
            </div>
        );
    }
}

export default regEstudiante;