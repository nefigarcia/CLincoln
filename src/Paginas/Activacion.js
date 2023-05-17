import React,{Component} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Activacion extends Component{
    render(){
        return (
            
            <Form inline>
              <div className="form-title">
            <h1>Ingresa tu codigo de activacion</h1>
            <p>
                "Pregunta por el codigo a tu escuela"
            </p>
</div>
              <FormGroup className="">
                <Label for="examplePassword" className="mr-sm-2">Codigo</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="Ingresa codigo" />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          );
    }
}
export default Activacion;