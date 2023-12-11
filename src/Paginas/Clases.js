import React, {Component, useContext, useState} from 'react';
import {FormGroup, Label, Input,  TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table,Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import classnames from 'classnames';
import { InfoContext } from '../context';
import { Link } from "react-router-dom";
import moment from 'moment';
import { async } from 'q';

export const Clases=(props)=>{
    const[activeTab,setActiveTab]=useState('1');
    const{daClases,leccionesDate}=useContext(InfoContext);
    function toggle(tab){
        if(activeTab!==tab){
            setActiveTab(tab)
        }
    }
    const daClasesunic=leccionesDate.filter((value,index,self)=>
        index===self.findIndex((t)=>(
            t.ID_CLASE===value.ID_CLASE
        ))
    )
    function clasesDias(){
      daClasesunic.map(item=>{
        return item.DIAS=[];
      })
      daClases.forEach(function(element){
       daClasesunic.forEach(function(ele){
        if(ele.ID_CLASE==element.ID_CLASE){
          ele.DIAS.push(element.DIA)
        }
       })
        
      })
    }
    
    return(
        <div className='container'>
            <h5>Clases</h5>
            <hr/>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => {toggle('1'); }}
                >
                  Clases
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { toggle('2'); }}
                >
                  Eventos
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Table>
                <thead>
          <tr>
            
            <th>Nombre</th>
            <th>Maestro</th>
            <th>Inicio</th>
            <th>Final</th>
            <th>Dias/horas</th>
          </tr>
        </thead>
        <tbody>{clasesDias()}
            {daClasesunic.map(item=>{
                return <Clasess key={item.ID} item={item} clasesunic={daClasesunic}/>
            })}
        </tbody>       
                </Table>
              </TabPane>

              <TabPane tabId="2">
              <Table>
                <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
          </tr>
        </thead>
                <tbody>
            
                </tbody>       
                </Table>
              </TabPane>
            </TabContent>
        </div>
    );
}

export const Clasess=(props)=>{
  const{setClase,daClases}=useContext(InfoContext);
  const diasClases=(id)=>{daClases.filter(item=>{console.log("ID:",id)
    return item.ID_CLASE==id;
  })}
  function setIdclase(id){
    setClase(props.clasesunic.find(item=>item.ID_CLASE===id))
    
  }
    return(
        <tr>
          <Link to='/Perfclase' >
          <td onClick={()=>setIdclase(props.item.ID_CLASE)}>{props.item.NOMBRE}</td>
          </Link>
          <td>{props.item.MAESTRO}</td>
          <td>{props.item.FECHAI}</td>
          <td>{props.item.FECHAF}</td>
          <td>{props.item.DIAS.map(ite=>{
            return <i>{ite}</i>
          })}</td>
        </tr>
              );
}

export const Perfclase=(props)=>{
  const[agregar,setAgregar]=useState(false)
  const[editmodal,setEditmodal]=useState(false);
  const[alerta,setAlerta]=useState(false)
  const[modal,setModal]=useState(false);
  const[formValue,setFormValue]=useState({id:"",dia:"",horai:"",horaf:"",maestro:"",idclase:""})
  const[activeTab,setActiveTab]=useState('1');
  const{daEscuela,daClase,daClases,setClases, leccionesDate,daLeccion,setLeccion}=useContext(InfoContext);
  const toggl=()=>{
    setModal(!modal)
  }
  const togglelecc=()=>{
    setEditmodal(!editmodal)
  }
  const lecciones=leccionesDate.filter(function(item){
  return  item.ID_CLASE==daClase.ID_CLASE && item.DIA!=null
  });

  const leccClase=daClases.filter(function(item){
    return item.ID_CLASE==daClase.ID_CLASE
  })
  
  const leccionId=(ID)=>{
    const lecc=leccClase.find(item=>item.ID===ID);
    console.log("LE:",lecc);
    setFormValue({id:lecc.ID,dia:lecc.DIA,horai:lecc.HORAI.slice(0,-10),horaf:lecc.HORAF.slice(0,-10),maestro:lecc.MAESTRO})
  }

  const refreshlecciones=async()=>{
  try {//console.log("inife:",new Date(f.replace(/-/g, '\/')))
      let dat={escuelaId:daEscuela.ID};
      let res=await fetch("http://localhost:3001/Clases",{
      //let res=await fetch("https://shielded-brushlands-89617.herokuapp.com/Clases",{
  
          method:'POST',
          mode:'cors',
          body:JSON.stringify(dat),
          headers:{'content-type':'application/json'},
      })
      .then(res=>res.json())
      .then(res=>{
        setClases(res);
        alert("Operacion exitosa")

   } )
  }catch(error){
    console.log(error)
  }}
  const eliminarLecc=async()=>{
   await fetch(`http://localhost:3001/Eliminarleccion/${formValue.id}`,{
   //await fetch(`https://shielded-brushlands-89617.herokuapp.com/Eliminarleccion/${formValue.id}`,{
   
      method:'DELETE'
    })
    .catch(err=>console.error(err))
    .then(()=>{
      setEditmodal(false)
      setModal(false)
      refreshlecciones();
      console.log("exitoso")
    })
  }
  const editLeccion=()=>{
    const a=[];
    console.log("FORMVALUE:",formValue)
    daClases.forEach(function(item){
      if(item.DIA===formValue.dia && item.MAESTRO===formValue.maestro){
        if(item.HORAI.slice(0,-13)==formValue.horai.slice(0,-3) || item.HORAF.slice(0,-13)==formValue.horaf.slice(0,-3)){
          console.log("if")
          setAlerta(true)
          a.push("1");
        }
      }
    })
    if(a.length>0){
      return;
    }
    if(!formValue.id){
      console.log("AGREGAR")
      regleccion();
    }
    if(formValue.id && formValue.maestro){
      updateLeccion()
    }
  }
  const agregarLecc=()=>{
    setAgregar(true)
    setFormValue({id:"",horai:"",horaf:"",dia:"Lunes",maestro:daClase.MAESTRO,idclase:daClase.ID_CLASE});
  }
  const guardarLecc=()=>{
    if(!(formValue.dia && formValue.horai && formValue.horaf)){
      console.log("HAND:",formValue.maestro)

      return;
    }
      editLeccion()
    
  }
  const regleccion=async()=>{
    let da={formFields:formValue}
    try {
      let res=await fetch("http://localhost:3001/Agregarleccion",{
      //let res=await fetch("https://shielded-brushlands-89617.herokuapp.com/Agregarleccion",{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(da),
        headers:{'content-type':'application/json'},
      })
      .then(res=>{
        if(res.ok){
          setModal(false)
         refreshlecciones()
        }
      })
    } catch (error) {
      
    }
  }
  const updateLeccion=async()=>{
    let da={id:formValue.id,dia:formValue.dia,horai:formValue.horai,horaf:formValue.horaf}
    try {
      let res=await fetch("http://localhost:3001/Updateleccion",{
      //let res=await fetch("https://shielded-brushlands-89617.herokuapp.com/Updateleccion",{

          method:'PUT',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(da)
      })
      .then((res)=>res.json())
      .then(res=>{
        if(res=="Edicion exitosa"){
          refreshlecciones();
          setModal(false)
        }
      })
    } catch (error) {
      console.log("error",error)
    }
  }
  function toggle(tab){
    if(activeTab!==tab){
        setActiveTab(tab)
    }
}
const handleChange = (event) => {
  const { name, value } = event.target;
  setFormValue((prevState) => {
    return {
      ...prevState,
      [name]: value,
    };
  });
};   
  return(
    <div className='container' style={{fontSize:'13px'}}>{console.log("hor",formValue.horai)}
       <h5>Clase</h5>
       <hr/>
       <Row md={2}>
        <Col>
         <h6>{daClase.NOMBRE}</h6>
         <div>{console.log("lecc",lecciones)}
          {lecciones.length>0 ?
          <>
             <i>{lecciones.map(item=>{return <>{item.DIA} {item.HORAI.slice(0,-10)}-{item.HORAF.slice(0,-10)} </> })}</i>
          </>
          :null
          }
          {lecciones.length>0 ?
      <a href='#' onClick={()=>togglelecc()} >(Editar)</a>
      :   <a href='#' onClick={()=>{agregarLecc();setModal(true)}} >+Agregar leccion</a>

          }
          
         </div>
         
        </Col>
        <Row>
          <Col>
          <span>Maestra:{daClase.MAESTRO}</span>
          </Col>
        </Row>
        <Col>
        </Col>
       </Row>
        {editmodal ?
        <>
        {lecciones.length>0 ?
         <>
          <Table striped>
         <thead>
           <tr>
           
             <th>InicioFinalFecha</th>
             <th>Dia</th>
             <th>InicioFinalHora</th>
             <th>Maestro</th>
             <th>Salon</th>
           </tr>
         </thead>
         <tbody>
           {leccClase.map(item=>{
             return <tr>
              
               <td style={{color:'#1274de'}} onClick={()=>{setModal(true);leccionId(item.ID)}}>{item.FECHAI}/{item.FECHAF}</td>
               <td>{item.DIA}</td>
               <td>{item.HORAI.slice(0,-10)}-{item.HORAF.slice(0,-10)}</td>
               <td>{item.MAESTRO}</td>
             </tr>
           })}
         </tbody>
       </Table>
         </>
            :null
        }
        
         </>:null
        }
          

            <Modal style={{fontSize:"13px", maxWidth:"380px"}} isOpen={modal} toggle={toggl} onClosed={()=>{setAlerta(false);setAgregar(false)}}>
          <ModalHeader toggle={toggl}>
          Editar Dia y hora
            <br/>
           
            </ModalHeader>
          <ModalBody>
          <div >
    <h5><span className='text-center'>Selecciona dia y horas</span></h5>
   
    <div className="card shadow " >
           
            <div className="card-body">
                
               <Row md={3}>
                <Col>
                      <FormGroup>
                        <Label for="Nombre">
                          Dia de la clase
                        </Label>
                        <Input  style={{backgroundColor:"#fffde3",fontSize:"13px"}}
                          
                          name='dia'
                          type="select"
                          value={formValue.dia}
                          onChange={handleChange}
                        >
                          <option>Lunes</option>
                          <option>Martes</option>
                          <option>Miercoles</option>
                          <option>Jueves</option>
                          <option>Viernes</option>
                          <option>Sabado</option>
                        </Input>
                      </FormGroup>
                </Col>                
                <Col>
                     <FormGroup>
                        <Label for="Nombre">
                          <>Hora inicio</>
                        </Label>
                        <Input style={{backgroundColor:"#fffde3",fontSize:"13px"}}
                        // bsSize="lg"
                          type="time"
                          name="horai"
                          value={formValue.horai}
                          onChange={handleChange}
                        />
                   </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="Nombre">
                      <>Hora final</>
                    </Label>
                    <Input style={{backgroundColor:"#fffde3",fontSize:"13px"}}
                    // bsSize="lg"
                      type="time"
                      name="horaf"
                      value={formValue.horaf}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
               </Row>
            </div>
        </div>
<Button disabled={agregar} size='sm' onClick={eliminarLecc}>Eliminar</Button>
{" "}
<Button disabled={agregar} size='sm' onClick={editLeccion}>Guardar</Button>
{" "}
<a hidden={agregar} href='#' onClick={()=>{agregarLecc()}}>Nueva leccion</a>
<Button hidden={!agregar} size='sm' color='primary' onClick={()=>{guardarLecc()}}>Aceptar</Button>
{alerta &&
<Alert color='warning'>Revisa el horario, ocupado por maestra: {daClase.MAESTRO}</Alert>}
</div>    
          </ModalBody>
         {/* <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
      </ModalFooter>*/}
        </Modal>

       <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => {toggle('1'); }}
                >
                  Lecciones
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { toggle('2'); }}
                >
                  Eventos
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Table>
                <thead>
          <tr>
             
          </tr>
        </thead>
        <tbody>
           {lecciones.map(item=>{
             return <tr >
             
             <Link to='/Modalleccion' >
             <th onClick={()=>setLeccion(item)} scope="row">{moment(item.FECHA).format("DD/MM/YYYY")}</th>
           </Link>
             <td>{item.DIA} {item.HORAI.slice(0,-10)}-{item.HORAF.slice(0,-10)}</td>
             <td>{item.MAESTRO}</td>
           </tr>
           })}
        </tbody>       
                </Table>
              </TabPane>

              <TabPane tabId="2">
              <Table>
                <thead>
                  <tr>

                  </tr>
               </thead>
                 <tbody>
            
                </tbody>       
                </Table>
              </TabPane>
            </TabContent>
    </div>
   
  );
}
export const Modalleccion=()=>{

  const[modal,setModal]=useState(true);
  const{daLeccion}=useContext(InfoContext);
  const toggle=()=>{
    setModal(!modal);
  }
 return(
  <>
  <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
          {moment(daLeccion.FECHA2).format("dddd") }
            {moment(daLeccion.FECHA2).format("DD-MM-YYYY")}
            <br/>
            <i>{moment(daLeccion.FECHA).format("hh:mm")}-</i>
            <i>{moment(daLeccion.FECHA2).format("hh:mm")}</i>
            </ModalHeader>
          <ModalBody>

          <div >
    <h1><span className='text-center'>{daLeccion.NOMBRE}</span></h1>
   
    <div className="card shadow " >
           
            <div className="card-body">
                <h6 className="card-title text-uppercase">
                   Estudiantes
                </h6>
                <p className="card-text">Notas del maestro</p>
                <p className="card-text"> </p>
                <p className="card-text fa fa-usd"> </p>
                <i>: </i>
            </div>
        </div>

</div>    
          </ModalBody>
         {/* <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
      </ModalFooter>*/}
        </Modal>
  </>
 )
}