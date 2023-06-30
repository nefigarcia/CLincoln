import React,{Component} from 'react'
import styled from 'styled-components'
import { InfoConsumer } from '../context'
class InicioEscuela extends Component{

render(){
    //const{id,nombre}=this.props.item;
    return(
     <InfoConsumer>
        {value=>{
            return(
                <div className="col-10 col-lg-4 mx-auto mb-5">
                        <div className="card" style={{width:'18rem'}}>
                            <div className="card-body">
                                <h3 className="card-title text-uppercase">
                                    {value.daEscuela.NOMBRE}
                                </h3>
                                <p className="card-text">{value.daEscuela.ID}</p>
                              {/*  <p className="card-text fa fa-usd">{precio}</p><br></br>
                                <Link to='/Details' onClick={()=>value.handleDetail(id)} className="btn btn-primary">
                                    Mas Info...
                                </Link>
                                <Link to='/Details' >
                                    <button className="btn btn-primary" disabled={!loading}>Modificar</button>
            </Link>*/}
                            </div>
                        </div>{/*
                            this.state.estado &&
                            value.cambiarEst(this.state.estado)*/
                        }
                    </div>
            );
        }

        }
     </InfoConsumer>
        );
}
    
}
export default InicioEscuela;