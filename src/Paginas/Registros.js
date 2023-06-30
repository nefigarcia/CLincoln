import React, {Component, useContext} from "react";
import { Table } from 'reactstrap';

import { InfoConsumer, InfoContext } from "../context";
import { Link } from "react-router-dom";


/*class Registros extends Component{

    render(){
        const{ID,NOMBRE,APELLIDOS,TELEFONO,EMAIL,REGISTRO
        }=this.props.item;
        
    return(
        <InfoConsumer>
            {value=>{
                return(
          <tr>
            <th scope="row">{ID}</th>
            <Link to='/PerfEstudiante' >
            <td onClick={value.setIdEstudiante(ID)}>{NOMBRE}</td>
            </Link>
            <td>{TELEFONO}</td>
            <td>{EMAIL}</td>
            <td>{REGISTRO}</td>

            <td></td>
          </tr>
                );
            }}
        </InfoConsumer>      
    );
    }
}
export default Registros;*/

export function Registros(props){
    const{setIdEstudiante}=useContext(InfoContext);
    return(
        <tr>
          <th scope="row">{props.item.ID}</th>
          <Link to='/PerfEstudiante' >
          <td onClick={setIdEstudiante(props.item.ID)}>{props.item.NOMBRE}</td>
          </Link>
          <td>{props.item.TELEFONO}</td>
          <td>{props.item.EMAIL}</td>
          <td>{props.item.REGISTRO}</td>
          <td></td>
        </tr>
              );
}
export function RegistrosMaestros(props){
    const{setIdMaestro}=useContext(InfoContext);
    return(
        <tr>
          <th scope="row">{props.item.ID}</th>
          <Link to='/PerfMaestro' >
          <td onClick={setIdMaestro(props.item.ID)}>{props.item.NOMBRE}</td>
          </Link>
          <td>{props.item.TELEFONO}</td>
          <td>{props.item.EMAIL}</td>
          <td></td>
        </tr>
              );
}