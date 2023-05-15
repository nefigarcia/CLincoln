import React, {Component} from "react";
import { Table } from 'reactstrap';

import { InfoConsumer } from "../context";


class Registros extends Component{

    render(){
        const{ID,NOMBRE,APELLIDOS
        }=this.props.item;
        
    return(
        <InfoConsumer>
            {value=>{console.log("data",ID);
                return(
          <tr>
            <th scope="row">{ID}</th>
            <td>{NOMBRE}</td>
            <td>{APELLIDOS}</td>
            <td></td>
          </tr>
                );
            }}
        </InfoConsumer>

        
    );

    }
}


    

export default Registros;