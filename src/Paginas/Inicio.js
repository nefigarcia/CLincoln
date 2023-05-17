import React,{Component} from "react";
import { InfoConsumer } from "../context";

class Inicio extends Component{
    state={estaMenu:true}
    render(){
        return(
            <InfoConsumer>
            {data=>{
                const{estaMenu}=data.estaMenu;
                

                return(
                    <div> Rosystems.
                    {
                        this.state.estaMenu && 
                        data.cambiarEsta(this.state.estaMenu)
                    }
                    {                console.log("me=",data.estaMenu)
}
                    </div>
                   
                );
            }}
        </InfoConsumer>
        );
        
    }
}

export default Inicio;