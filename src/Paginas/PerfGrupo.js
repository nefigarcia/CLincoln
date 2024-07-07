import React, {Component, useContext, useEffect, useState} from 'react';
import {DropdownToggle, Form, FormGroup, Label, Input, FormText,Alert, DropdownItem, Dropdown, DropdownMenu, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Table,Card,CardTitle,CardText,ModalHeader, ModalBody,Modal  } from 'reactstrap';
import classnames from 'classnames';
import nousuario from '../Fotos/nousuario.jpg'
import { InfoContext } from '../context';
import { Link, Navigate } from 'react-router-dom';

const Perfgrupo=()=>{
    const {daEstudiante,setEstudiantes,daEscuela,setEstudiante,daEstudiantes,grupo}=useContext(InfoContext)
    const [activeTab,setActivetab]=useState('1');
    const [modal,setModal]=useState(false)
    const [alerta,setAlerta]=useState(false)
    const [formValue,setFormValue]=useState({ID:"",NOMBRE:"",APELLIDOS:"",EMAIL:"",TELEFONO:""})
    const [agregar,setAgregar]=useState(false)
    const [mensaje,setMensaje]=useState("")
    const apiUrl=process.env.REACT_APP_API

    const{ID,NOMBRE,APELLIDOS,EMAIL,TELEFONO}=formValue
    useEffect(()=>{console.log("USEEFFECT",daEstudiante)
      setFormValue({ID:daEstudiante.ID,NOMBRE:daEstudiante.NOMBRE,APELLIDOS:daEstudiante.APELLIDOS,EMAIL:daEstudiante.EMAIL,TELEFONO:daEstudiante.TELEFONO,ID_GRUPO:daEstudiante.ID_GRUPO})
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
   
   const editLeccion=async(item)=>{
    try {
      let da={ID:item.ID, NOMBRE:item.NOMBRE, APELLIDOS:item.APELLIDOS,TELEFONO:item.TELEFONO,EMAIL:item.EMAIL,ID_GRUPO:grupo.ID}
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
          setMensaje("Estudiante agregado a salon")
          setTimeout(() => {
            setMensaje("");
          }, 3000);
         /* if(e==="edit"){
            const refest=refestu.find(i=>{return i.ID==daEstudiante.ID})
            console.log("REFESTU",refest)
            setModal(false)
            setEstudiante(refest)
          }
          if(e==="delete"){
            setModal(false)
            
          }*/
          
        })
    } catch (error) {
      
    }
   }
   const estNogrupo=daEstudiantes.filter(i=>i.ID_GRUPO!=grupo.ID && i.ID_GRUPO==0)
   const estAgregados=daEstudiantes.filter(i=>i.ID_GRUPO==grupo.ID)
    return(
        <div className='container'>
            <h5> Grupo Configuracion <a href='#' onClick={()=>setModal(true)}>(Editar)</a></h5>
            <hr/>
           
            <Row>    
                <Col md={3}>
                    <div>Grupo <p><i>{grupo.NOMBRE}</i></p></div>     
                </Col>
            </Row>
            <Row>
                <h6>Estudiantes para agregar</h6>
                {estNogrupo.length>0 ?
                    <> 
                            <Table>
                            {estNogrupo.map(i=>{
                                return <tr>
                                    <td>{i.NOMBRE}</td>
                                    <td>{i.APELLIDOS}</td>
                                    <Button onClick={()=>editLeccion(i)} size='sm' color='primary'>+</Button>
                                </tr>
                            } )}           
                            </Table>
                            
                      
                        
                    </>:null
                }
            </Row>
            <Row>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { ButtonToggle('1'); }}
                >
                  Estudiantes
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
               {estAgregados.length>0 ?
                <>
                 <Table striped>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Aapellidos</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estAgregados.map(i=>{
                            return <tr>
                                     <td>{i.NOMBRE}</td>   
                                     <td>{i.APELLIDOS}</td>
                                     <td>{i.EMAIL}</td>
                                   </tr>
                        })}
                    </tbody>
                 </Table>
                </>:null
               }
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
{mensaje==="Estudiante agregado a salon" && 
    <Alert color='success'>{mensaje}</Alert>
}
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
export default Perfgrupo;