import React,{Component} from "react";
import { InfoConsumer } from "../context";

class Inicio extends Component{
    state={estaMenu:true}
    render(){
        return(
            <InfoConsumer>
            {data=>{                

                return(
                    <div> Rosystems.
                    </div>
                   
                );
            }}
        </InfoConsumer>
        );
        
    }
}

export default Inicio;