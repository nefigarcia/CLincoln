import React, {Component, useContext, useEffect, useState} from 'react';
import {DropdownToggle, Form, FormGroup, Label, Input, FormText,Alert, DropdownItem, Dropdown, DropdownMenu, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Table,Card,CardTitle,CardText,ModalHeader, ModalBody,Modal  } from 'reactstrap';
import classnames from 'classnames';
import nousuario from '../Fotos/nousuario.jpg'
import { InfoContext } from '../context';
import { Navigate } from 'react-router-dom';

const Perfestudiante=()=>{
    const {daEstudiante,setEstudiantes,daEscuela,setEstudiante}=useContext(InfoContext)
    const [activeTab,setActivetab]=useState('1');
    const [modal,setModal]=useState(false)
    const [alerta,setAlerta]=useState(false)
    const [formValue,setFormValue]=useState({ID:"",NOMBRE:"",APELLIDOS:"",EMAIL:"",TELEFONO:""})
    const [agregar,setAgregar]=useState(false)
    const [alerMensaje,setAlermensaje]=useState(false)
    const apiUrl=process.env.REACT_APP_API

    const{ID,NOMBRE,APELLIDOS,EMAIL,TELEFONO}=formValue
    useEffect(()=>{console.log("USEEFFECT",daEstudiante)
      setFormValue({ID:daEstudiante.ID,NOMBRE:daEstudiante.NOMBRE,APELLIDOS:daEstudiante.APELLIDOS,EMAIL:daEstudiante.EMAIL,TELEFONO:daEstudiante.TELEFONO})
    },[])

    const toggl=()=>{
      setModal(!modal)
    }
    const ButtonToggle=(tap)=>{
        if(activeTab!==tap){
            setActivetab(tap)
        }
    }
    const handleChange=(event)=>{
      const {name,value}=event.target;
        setFormValue((prevState)=>{
          return{
            ...prevState,
            [name]:value,
          };
        });
    }
   const eliminarLecc=async()=>{
    console.log("eliminID",ID)
     await fetch(apiUrl+`/Eliminarestu/${ID}`,{
      method:'DELETE'
     })
      .catch(err=>console.log("e",err))
       .then((res)=>res.json())
       .then((res)=>{
        console.log("THENELIMI",res)
        if(res.message==='Estudiante eliminado'){
          refreshEstu("delete")
            .then(()=>{
              setAlerta(res.message)
            })
        }
       })
    }
   const guardarLecc=()=>{

   } 
   const editLeccion=async()=>{
    try {
      let da={ID:formValue.ID,NOMBRE:formValue.NOMBRE,APELLIDOS:formValue.APELLIDOS,EMAIL:formValue.EMAIL,TELEFONO:formValue.TELEFONO}
      let res=await fetch(apiUrl+`/Putestu`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(da)
    })
      .then((res)=>res.json())
      .then((res)=>{
        if(res.message==='Exitoso'){
          refreshEstu("edit")
          .then(()=>{
            console.log("finisched refreschEStu")
          })
        }
       
      })
    } catch (error) {
      console.log("er",error)
    }
    

   }
   const refreshEstu=async(e)=>{
    try {
      await fetch(apiUrl+`/Estudiantes`)
        .then(res=>res.json())
        .then((res)=>{
          const refestu=res.filter((i)=>{return i.ID_ESCUELA==daEscuela.ID})
          console.log("REFESTUDIANTES",refestu)
          setEstudiantes(refestu)
          if(e==="edit"){
            const refest=refestu.find(i=>{return i.ID==daEstudiante.ID})
            console.log("REFESTU",refest)
            setModal(false)
            setEstudiante(refest)
          }
          if(e==="delete"){
            setModal(false)
            
          }
          
        })
    } catch (error) {
      
    }
   }
    return(
        <div className='container'>
            <h5>Perfil Estudiante <a href='#' onClick={()=>setModal(true)}>(Editar)</a></h5>
            <hr/>
             {/* <div className='row-fluid profile-summary'>
                <div className='thumbnail-bg' >
                    <img src={nousuario}></img>
                </div>
                <div className='pull-left'>
                    <p>hel</p>
                </div>
    </div> */}
            <Row>
                <Col md={3}>
                <div className='thumbnail-bg' >
                    <img src={nousuario}></img>
                </div>
                </Col>
                <Col md={3}>
                    <div>{daEstudiante.NOMBRE}</div>
                    <p>{daEstudiante.EMAIL}</p>
                    <p>{daEstudiante.TEL}</p>
                </Col>
            </Row>
            <Row>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { ButtonToggle('1'); }}
                >
                  Perfil
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => {ButtonToggle('2'); }}
                >
                  Clases
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Table>
        <tbody className='border'>
            <tr>
                <td>
                   <div ><div>Tel.</div><div>{daEstudiante.TELEFONO}</div></div> 
                </td>
                <td>
                <div ><div>Email</div><div>{daEstudiante.EMAIL}</div></div> 
                </td>
            </tr>
            <tr>
                <td>
                <div ><div>Registro</div><div>{daEstudiante.REGISTRO}</div></div> 
                </td>
                <td>
                <div ><div>Nacimiento</div><div>{daEstudiante.NACIMIENTO}</div></div> 
                </td>
                <td>
                <div ><div>Id Num.</div><div></div></div> 
                </td>
            </tr>
            <tr>
                <td>
                <div ><div>Direccion</div><div>{daEstudiante.DIRECCION}</div></div> 
                </td>
                <td>
                <div ><div>Metodo Pago</div><div></div></div> 
                </td>
            </tr>
            <tr>
                <td>
                <div ><div>Notas Generales</div><div></div></div> 
                </td>
                <td>
                <div ><div>Notas Medicas</div><div></div></div> 
                </td>
            </tr>
              {/*<InfoConsumer>
                    {value=>{
                      console.log("renderingPreRegistros:",value.daEstudiantes)
                        return value.daEstudiantes.map(item=>{
                            return <Registros key={item.ID} item={item}/>;
                            
                        })
                    }}
                </InfoConsumer> */}
                </tbody>       
                </Table>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>En proceso</CardTitle>
                      <CardText>En desarrollo.</CardText>
                      <Button>Proximamente</Button>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
            </Row>

            <Modal style={{fontSize:"13px", maxWidth:"380px"}} toggle={toggl} isOpen={modal} onClosed={()=>{setAlerta(false);}}>
          <ModalHeader toggle={toggl}>
          Editar Estudiante
            <br/>
           
            </ModalHeader>
          <ModalBody>
          <div >
    <h5><span className='text-center'>Informacion</span></h5>
   
    <div className="card shadow " >
           
            <div className="card-body">
                
               <Row md={2}>              
            
                <Col>
                 
                  <FormGroup>
                    <Label for="Nombre">
                      <>Nombre</>
                    </Label>
                    <Input style={{backgroundColor:"#fffde3",fontSize:"13px"}}
                    // bsSize="lg"
                      type="text"
                      name="NOMBRE"
                      value={NOMBRE}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col>
                 
                 <FormGroup>
                   <Label for="Apellidos">
                     <>Apellidos</>
                   </Label>
                   <Input style={{backgroundColor:"#fffde3",fontSize:"13px"}}
                   // bsSize="lg"
                     type="text"
                     name="APELLIDOS"
                     value={APELLIDOS}
                     onChange={handleChange}
                   />
                 </FormGroup>
               </Col>
               </Row>
               <Row md={2}>
                  <Col>
                  <FormGroup>
                    <Label for="Email">
                      <>Email</>
                    </Label>
                    <Input style={{backgroundColor:"#fffde3",fontSize:"13px"}}
                    // bsSize="lg"
                      type="text"
                      name="EMAIL"
                      value={EMAIL}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  </Col>
                  <Col>
                  <FormGroup>
                    <Label for="Tel.">
                      <>Tel.</>
                    </Label>
                    <Input style={{backgroundColor:"#fffde3",fontSize:"13px"}}
                    // bsSize="lg"
                      type="text"
                      name="TELEFONO"
                      value={TELEFONO}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  </Col>
               </Row>
            </div>
        </div>
<Button disabled={agregar} size='sm' onClick={eliminarLecc}>Eliminar</Button>
{" "}
<Button disabled={agregar} size='sm' onClick={()=>editLeccion()}>Guardar</Button>
{" "}
{alerta==="Estudiante eliminado" &&
<Navigate to={'/PreRegistros'}/>  } 
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
        </div>
    );
}
export default Perfestudiante;