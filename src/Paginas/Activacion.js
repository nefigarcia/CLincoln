import React,{Component} from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { InfoContext } from "../context";
import { Navigate } from "react-router-dom";


class Activacion extends Component{
  apiUrl=process.env.REACT_APP_API
  static contextType=InfoContext

  constructor(props){
    super(props)
    this.state={mensaje:""};
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const{mensaje,codigo}=this.state
    if(!codigo){
      return
    }
    this.revisar()
  }

  handleChange(event){
    const{name,value}=event.target
    this.setState({[name]:value})
  }

  async revisar(){console.log("heee")
    var contex=this.context
    var codigo=this.state.codigo
    await fetch(this.apiUrl+`/Codigo/${codigo}`)
      .then(res=>res.json())
        .then(res=>{
          console.log("res",res)
          if(res.length==1){
            contex.setEscuela(res[0])
            this.setState({mensaje:"Escuela encontrada"})
          }
          if(res.length>1){
            this.setState({mensaje:"Escuela duplicada, contacta admin, whatsapp 5523847937"})
          }
          if(res.message==="no existe"){this.setState({mensaje:"no existe"})}
        })
  }

    render(){
      const{codigo,mensaje}=this.state
        return (
            <div className="container">
              <Form onSubmit={(e)=>{this.handleSubmit(e)}}>
              <div className="form-title">
                <h1>Ingresa tu codigo de activacion</h1>
                <p>
                    "Pregunta por el codigo a tu escuela"
                </p>
              </div>
              <FormGroup className="">
                <Label for="examplePassword" className="mr-sm-2">Codigo</Label>
                <Input 
                type="password" 
                name="codigo" 
                value={codigo}
                id="examplePassword" 
                placeholder="Ingresa codigo" 
                onChange={(e)=>this.handleChange(e)}
                />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
            {this.state.mensaje==="Escuela encontrada"&&
              <Navigate to={"/Signup"}/>
            }
            {this.state.mensaje==="no existe" &&
              <Alert color="warning">Verifica el codigo con administrador</Alert>
            }
            {this.state.mensaje==="Escuela duplicada, contacta admin, whatsapp 5523847937" &&
              <Alert color="warning">{this.state.mensaje}</Alert>
            }
            </div>
            
          );
    }
}
export default Activacion;