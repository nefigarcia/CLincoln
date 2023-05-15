import React,{Component} from "react";
import { InfoConsumer } from "../context";
import Login from "./Login";

class PreLogin extends Component{
    
    render(){
        return(<div>dsf</div>
        /*    <InfoConsumer>
                {Value=>{
                    return Value.da.map(item=>{
                        return <Login key={item.ID} item={item}/>
                    } )
                }}
            </InfoConsumer>*/
        );
    }
}

export default PreLogin;