import React, {Component, useContext, useEffect, useState} from 'react';
import { InfoContext } from '../context';
import nousuario from '../Fotos/nousuario.jpg'
import classnames from 'classnames';
import {DropdownToggle, Form, FormGroup, Label, Input, FormText,Alert, DropdownItem, Dropdown, DropdownMenu, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Table,Card,CardTitle,CardText,ModalHeader, ModalBody,Modal  } from 'reactstrap';
import { Navigate } from 'react-router-dom';
const Perfmaestro=()=>{
    const {daMaestro,setMaestros,setMaestro,daEscuela,daCuenta,setCuenta}=useContext(InfoContext)
    const [activeTab,setActivetab]=useState('1');
    const [modal,setModal]=useState(false)
    const [alerta,setAlerta]=useState("")
    const apiUrl=process.env.REACT_APP_API
    const [formValue,setFormValue]=useState({ID:"",NOMBRE:"",APELLIDOS:"",EMAIL:"",TELEFONO:"",DIRECCION:"",NACIMIENTO:""})
    const{ID,NOMBRE,APELLIDOS,EMAIL,TELEFONO,DIRECCION,NACIMIENTO}=formValue

    useEffect(()=>{console.log("USEEFFECTMaestro:",daMaestro)
      if(daMaestro.length==0){
        setFormValue({ID:daCuenta.ID,NOMBRE:daCuenta.NOMBRE,APELLIDOS:daCuenta.APELLIDOS,EMAIL:daCuenta.EMAIL,TELEFONO:daCuenta.TELEFONO})

      }else{
        setFormValue({ID:daMaestro.ID,NOMBRE:daMaestro.NOMBRE,APELLIDOS:daMaestro.APELLIDOS,EMAIL:daMaestro.EMAIL,TELEFONO:daMaestro.TELEFONO})

      }

    },[daMaestro])
    const ButtonToggle=(tap)=>{
        if(activeTab!==tap){
            setActivetab(tap)
        }
    }
    const toggl=()=>{
      setModal(!modal)
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

    const editLeccion=async()=>{
      try {
        let da
        if(daMaestro.length==0){
          if(daCuenta.ROLES_ID==2){
            da={ID:formValue.ID,NOMBRE:formValue.NOMBRE,APELLIDOS:formValue.APELLIDOS,EMAIL:formValue.EMAIL,TELEFONO:formValue.TELEFONO,PERFIL:false}

          }else{
            da={ID:formValue.ID,NOMBRE:formValue.NOMBRE,APELLIDOS:formValue.APELLIDOS,EMAIL:formValue.EMAIL,TELEFONO:formValue.TELEFONO,PERFIL:true}
          }

        }else{
          da={ID:formValue.ID,NOMBRE:formValue.NOMBRE,APELLIDOS:formValue.APELLIDOS,EMAIL:formValue.EMAIL,TELEFONO:formValue.TELEFONO,PERFIL:false}

        }
        let res=await fetch(apiUrl+`/Putmaes`,{
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
          if(res.message==='Cuenta actualizada'){
            setCuenta(res.body[0])
            setModal(false)
          }
         
        })
      } catch (error) {
        console.log("er",error)
      } 
     }

     const eliminarLecc=async()=>{
      console.log("eliminID",ID)
       await fetch(apiUrl+`/Eliminarmaes/${ID}`,{
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

      const refreshEstu=async(e)=>{
        try {
          await fetch(apiUrl+`/Maestros`)
            .then(res=>res.json())
            .then((res)=>{
              const refestu=res.filter((i)=>{return i.ID_ESCUELA==daEscuela.ID})
              console.log("REFESTUDIANTES",refestu)
              setMaestros(refestu)
              if(e==="edit"){
                if(daMaestro.length!=0){
                  const refest=refestu.find(i=>{return i.ID==daMaestro.ID})
                  console.log("REFESTU",refest)
                  setModal(false)
                  setMaestro(refest)
                }else{
                  const refest=refestu.find(i=>{return i.ID==daCuenta.ID})
                  console.log("REFESTU",refest)
                  setModal(false)
                  setCuenta(refest)
                }
                
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
            <h5>{daMaestro.length!=0 || daCuenta.ROLES_ID==2? "Perfil Maestra": "Perfil Admin"} <a href='#' onClick={()=>setModal(true)}>(Editar)</a></h5>
            <hr/>
            <Row>
                <Col md={3}>
                <div className='thumbnail-bg' >
                    <img src={nousuario}></img>
                </div>
                </Col>
                <Col md={3}>{console.log("damaestro",daMaestro)}
                    <div>{NOMBRE}</div>
                    <p>{EMAIL}</p>
                    <p>{TELEFONO}</p>
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
                   <div ><div>Tel.</div><div>{TELEFONO}</div></div> 
                </td>
                <td>
                <div ><div>Email</div><div>{EMAIL}</div></div> 
                </td>
            </tr>
            <tr>
                <td>
                <div ><div>Nacimiento</div><div>{NACIMIENTO}</div></div> 
                </td>
                <td hidden={daMaestro.length==0}>
                <div ><div>Id Num.</div><div></div></div> 
                </td>
            </tr>
            <tr>
                <td>
                <div ><div>Direccion</div><div>{DIRECCION}</div></div> 
                </td>
                <td hidden={daMaestro.length==0}>
                <div ><div>Metodo Pago</div><div></div></div> 
                </td>
            </tr>
            <tr>
                <td hidden={daMaestro.length==0}>
                <div ><div>Notas Generales</div><div></div></div> 
                </td>
                <td hidden={daMaestro.length==0}>
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

            <Modal style={{fontSize:"13px", maxWidth:"380px"}} toggle={toggl} isOpen={modal} >
          <ModalHeader toggle={toggl}>
          Editar Maestro
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
<Button disabled={daCuenta.ROLES_ID==1 ? false:true} size='sm' onClick={eliminarLecc}>Eliminar</Button>
{" "}
<Button  size='sm' onClick={()=>editLeccion()}>Guardar</Button>
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
export default Perfmaestro;