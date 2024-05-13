import React, {Component, useContext} from "react";
import { Table } from 'reactstrap';

import { InfoConsumer, InfoContext } from "../context";
import { Link } from "react-router-dom";


export function Registros(props){
    const{setIdEstudiante}=useContext(InfoContext);
    return(
        <tr>
          <Link to='/PerfEstudiante' >
          <td onClick={()=>setIdEstudiante(props.item.ID)}>{props.item.NOMBRE}</td>
          </Link>
          <td>{props.item.TELEFONO}</td>
          <td>{props.item.REGISTRO}</td>
          <td></td>
        </tr>
              );
}
export function RegistrosMaestros(props){
    const{setIdMaestro}=useContext(InfoContext);
    return(
        <tr>
          <Link to='/PerfMaestro' >
          <td onClick={()=>setIdMaestro(props.item.ID)}>{props.item.NOMBRE}</td>
          </Link>
          <td>{props.item.TELEFONO}</td>
          <td></td>
        </tr>
              );
}