import React, { useContext, useEffect, useState } from 'react';
import { Progress,Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { InfoContext } from '../context';

 export const Progres=(props)=>{
  const[progres,setProgres]=useState(false)
  const{daEstudiantes,daMaestros,daClases,progresoTool,setProgresotool,progresoTipo,setProgresoTipo,
    tipoTool,setTipo}=useContext(InfoContext)

  const[total,setTotal]=useState(25)

  function suma(re){
    var r=re+total;
    setTotal(r)
  }
  const changeProgre=(ti)=>{
    setProgresotool(true)
    setTipo(ti)
    setProgresoTipo(true)
  }
  useEffect(()=>{
    var es=25
    if(daEstudiantes.length>0){
      console.log("daest:",daEstudiantes)
     es+=25
    }
    if(daMaestros.length>0){
      es+=25
    }
    if(daClases.length>0){
      es+=25
    }
    setTotal(es)
  },[])
  
function togg(){
  setProgres(!progres)
}
    return(
        <>
            <div>{total}%</div>
            <Progress hidden={progres} onClick={()=>togg()} value={total}style={{maxWidth:"100px"}}/>
            <div className='login-form' hidden={!progres}>
              <Card>
                <CardBody>
                  <CardTitle>Progreso configuracion <Button onClick={()=>togg()}>X</Button></CardTitle>
                  <CardSubtitle>Esta lista de pasos ayudan para configurar tu escuela</CardSubtitle>
                   {total}%
                  <Progress value={total} style={{maxWidth:"100px"}} />
                  <CardText>
                     <ListGroup>
                     <ListGroupItem disabled={progres==!false ? true:false} className="justify-content-between">+Creacion de cuenta ✅</ListGroupItem>
                     <ListGroupItem disabled={daEstudiantes.length>0 ? true:false} className="justify-content-between" onClick={()=>{changeProgre("es")}}>+Agregar estudiante {daEstudiantes.length>0 ? `✅`:null}</ListGroupItem>
                     <ListGroupItem disabled={daMaestros.length>0 ? true:false} className="justify-content-between"onClick={()=>{changeProgre("pr")}}>+Agregar profesor {daMaestros.length>0? `✅`:null}</ListGroupItem>
                     <ListGroupItem disabled={daClases.length>0 ? true:false} className="justify-content-between" onClick={()=>{changeProgre("cl")}}>+Agregar clase {daClases.length>0 ? `✅`:null}</ListGroupItem>
                     </ListGroup>
                  </CardText>
                  
                </CardBody>
              </Card>
           </div>
        </>
    );
 }
 