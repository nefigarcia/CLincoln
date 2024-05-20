import React, {Component, useContext, useEffect, useState} from 'react';
import {FormGroup,Form, Label, Input,  TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table,Modal, ModalHeader, ModalBody, Alert,ModalFooter } from 'reactstrap';
import classnames from 'classnames';
import { InfoContext } from '../context';
import { Link, Navigate } from "react-router-dom";
import moment from 'moment';
import { async } from 'q';
import Moment from 'moment'
import { extendMoment } from 'moment-range';

export const Clases=(props)=>{
  const apiUrl=process.env.REACT_APP_API;
    const[activeTab,setActiveTab]=useState('1');
    const{daClases,leccionesDate}=useContext(InfoContext);
    const[modgen,setModgen]=useState(false)
    const[formValue,setFormValue]=useState({id:"",dia:"",horai:"",horaf:"",horai2:"",horaf2:"",tiempoleccion:0,maestro:"",idclase:"",nivel:""})
    const[formFields1,setFormFields1]=useState({idclase:0,lecciones:0,nivel:"",nombre:"",maestro:"",niveles:[{ lecciones:0,nivel:""}]})
    const[alerta,setAlerta]=useState(false)
    const[mensaje,setMensaje]=useState("")
    const{id,dia,horai,horaf,horai2,horaf2,maestro,idclase,nivel,tiempoleccion}=formValue
    const momen = extendMoment(Moment);

    useEffect(()=>{
      addLecc()
    },[])

    const addLecc=()=>{
      var arr=[]
      for(let daClases1 of daClases){
        var object={idclase:daClases1.ID_CLASE,lecciones:0,nivel:"",nombre:daClases1.NOMBRE,maestro:daClases1.MAESTRO,niveles:[{ lecciones:0,nivel:""}]}
        arr.push(object)
      }
      setFormFields1(arr)
     
    }
   const addNivel=(i)=>{
    console.log("nivel111",formFields1)
      let object={
        lecciones:0,nivel:""
      };
      var arr2= formFields1[i].niveles
      arr2.push(object)
      setFormFields1(formFields1.map((item,ii)=>
        ii===i ? {...item, niveles:arr2} : item
      ))
    }

    const removeFields = (i,index) => {
      console.log("INDEXeliminar",index)
      var data = formFields1[index].niveles;
      data.splice(i, 1)
      setFormFields1(formFields1.map((item,ii)=>
        ii===index ? {...item, niveles:data}: item
      ))
    }

    const togglgencal=()=>{setModgen(!modgen);}
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
    const verificarCal=()=>{
      console.log("daclases",daClases)
      console.log("leccionesClases",leccionesDate)
      var lecciones=[]
      formFields1.map((f,i)=>{
        f.niveles.map((fo,ii)=>{
          lecciones.push({idclase:f.idclase,lecciones:fo.lecciones,nivel:fo.nivel,nombre:f.nombre,maestro:f.maestro,dia:"",hoi:"",hof:""})
        })
      })
      //asignarLecc.map(i=>asignarLecc(lecciones,i)) 
      var lec=[1,2,3,4,5]
      console.log("LECCC",lecciones)

      asignarLecc(lecciones,lecciones.length) 
       
    }
    const asignarLecc=(lecciones,tar)=>{
      const temp=[]
      const res=[...lecciones]
      let banlecc=0
      var horares1=[momen(horai,'HH:mm'),momen(horaf,'HH:mm')]
      var rangeres=momen.range(horares1);

      var horaesc1=[momen(horai2,'HH:mm'),momen(horaf2,'HH:mm')]
      var rangeesc=momen.range(horaesc1)
      const dias=["Lunes","Martes","Miercoles","Jueves","Viernes"]

      var horaf2s=horaf2.slice(0,-3)
      var horai2s=horai2.slice(0,-3)
      var horais=Number(horai2s.slice(1))

      const buscar=(inx,tar)=>{
        console.log("INDEX:",inx)
        
        if(inx===dias.length){        
          console.log("block:",banlecc)
          return
        }
        if(banlecc===lecciones.length){return}
        var ran1=Math.floor(Math.random() * (horaf2s - horai2s +1))+ (horai2s.includes("0")?horais:Number(horai2s))
        var ho1=moment(ran1,"HH:mm").format("HH:mm")
        var ho2=moment(ho1,"HH:mm").add(tiempoleccion,'minutes').format("HH:mm")

        var ho=[momen(ho1,"HH:mm"),momen(ho2,"HH:mm")]
        var horange=momen.range(ho)
          if(horange.overlaps(rangeres)){
             ran1=Math.floor(Math.random() * (horaf2s - horai2s +1))+ (horai2s.includes("0")?horais:Number(horai2s))
              ho1=moment(ran1,"HH:mm").format("HH:mm")
              ho2=moment(ho1,"HH:mm").add(tiempoleccion,'minutes').format("HH:mm") 
          }

        res[banlecc].hoi=ho1
        res[banlecc].hof=ho2
       res[banlecc].dia=dias[inx] 
       banlecc=banlecc+1
       buscar(inx+1,tar);
       buscar(0,tar)
      }

      buscar(0,tar)
      console.log("ALGORITH:",res)
      return res;
    };
   /* const asignarLecc=(lec,tar)=>{
      const temp=[]
      const res=[]
        //console.log("LECCC",lecciones)
      const buscar=(inx,tar)=>{
        if(tar===0){
          return res.push(temp.slice())
        }
        if(tar<0){
          return
        }
        if(inx===lec.length){
          return
        }
        temp.push(lec[inx]);
        buscar(inx,tar- lec[inx]);
        temp.pop();
        buscar(inx+1,tar);
      }
      buscar(0,tar)
     // console.log("ALGORITH:",res)
      return res;
    };*/
    

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
    
    const handleChange=(event)=>{console.log("FORMVALUE:",formValue)
      const{name,value}=event.target
      setFormValue((prevState)=>{
        return{
          ...prevState,
          [name]:value
        }
      })
    }

    const handleFormChange1=(event,index,i)=>{
      let data=[...formFields1]
      data[index]["niveles"][i][event.target.name]=event.target.value
      setFormFields1(data)
    }
    const handleSubmit=(e)=>{
      
      e.preventDefault(); console.log("HANDLEEEE")
      let ni=false
      formFields1.map((f,i)=>{console.log("NIVVVVV",f.niveles)
        f.niveles.map(ii=>{if(ii.nivel==""){setMensaje("Llenar el campo Nivel ingresando un numero x o si hay multiplbes es necesario poner una coma, 1,3,2");
         
        ni=true; return}})
      })
      if(ni){return}
      verificarCal()
    }
    return(
        <div className='container'>
            <h5>Clases</h5> 
            <Button onClick={togglgencal} color='primary'>Generar Calendario con IA</Button>
            <hr/>
           
            <Modal isOpen={modgen} toggle={togglgencal} >
        <ModalHeader toggle={togglgencal}>Generar Calendario usando IA</ModalHeader>
        <ModalBody>
        <Form onSubmit={handleSubmit}>
        <Row md={2}><h4>Receso</h4>{console.log("hoi",horaf)}
                <Col>
                     <FormGroup>
                        <Label for="Nombre">
                          <>Inicio</>
                        </Label>
                        <Input style={{backgroundColor:"#fffde3",fontSize:"13px"}}
                        // bsSize="lg"
                          type="time"
                          name="horai"
                          value={horai}
                          onChange={handleChange}
                        />
                   </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="Nombre">
                      <>Final</>
                    </Label>
                    <Input style={{backgroundColor:"#fffde3",fontSize:"13px"}}
                    // bsSize="lg"
                      type="time"
                      name="horaf"
                      value={horaf}
                      onChange={handleChange}
                    />
                  </FormGroup>                 
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="Nombre">
                      <>Leccion minutos </>
                    </Label>
                    <Input style={{backgroundColor:"#fffde3",fontSize:"13px"}}
                    // bsSize="lg"
                      type="select"
                      name="tiempoleccion"
                      value={tiempoleccion}
                      onChange={handleChange}
                      > 
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                        <option>35</option>
                        <option>40</option>
                        <option>45</option>
                        <option>50</option>
                        <option>55</option>
                        <option>60</option>
                      </Input>
                   
                  </FormGroup>                 
                </Col>
                </Row>   
                {horaf!=="" ? 
                    <Row  md={2}><h4>Horario escuela</h4>
                    <Col>
                         <FormGroup>
                            <Label for="Nombre">
                              <>Hora inicio</>
                            </Label>
                            <Input style={{backgroundColor:"#fffde3",fontSize:"13px"}}
                            // bsSize="lg"
                              type="time"
                              name="horai2"
                              value={horai2}
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
                          name="horaf2"
                          value={horaf2}
                          onChange={handleChange}
                        />
                      </FormGroup>
                     
                    </Col>
                    </Row> :
                    null      
                   
                }
                {horaf2!=="" ?
                  <> {console.log("???",formFields1)}
                     {formFields1.map((form,index)=>{
                      return <> <Label>{form.nombre}</Label>

                         { form.niveles.map((f,i)=>
                           {
                            return ( 
                              <Row md={2} key={i}>
                              {console.log("????nom",form)}
                                <Col>
                                  
                                  <FormGroup>
                                    <Label for="Nombre">
                                      #Lecciones
                                      <span className='required' style={{color:"red"}}>*</span>
                                    </Label>
                                    <Input  style={{backgroundColor:"#fffde3"}}
                                      id={i}
                                      name='lecciones'
                                      type="select"
                                      value={f.lecciones}
                                      onChange={event=>handleFormChange1(event,index,i)}
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                      <option>6</option>
                                    </Input>
                                  </FormGroup>
                                </Col>
                                <Col>
                                <FormGroup>
                                    <Label for="Nombre">
                                      Niveles
                                      <span className='required' style={{color:"red"}}>*</span>
                                    </Label>
                                    <Input  style={{backgroundColor:"#fffde3"}}
                                      id={i}
                                      name='nivel'
                                      type="text"
                                      value={f.nivel}
                                      onChange={event=>handleFormChange1(event,index,i)}
                                    >
                                    </Input>  
                                  </FormGroup>  
                                </Col>
                                <a className='label d-flex justify-content-start' style={{color:"red"}} onClick={()=>removeFields(i,index)} >X</a>

                            </Row>
                            
                            )
                            }
                          )}
                       <a className='label d-flex justify-content-start' onClick={()=>addNivel(index)} >+ Agregar Nivel</a>

                         </>
                     
                    })}
                   </>
                  : null
                }
                 {horaf2!==""  ?
          <>
             <ModalFooter>
             {!mensaje=="" &&
        <Alert color='warning'>{mensaje}</Alert>
       }
          <Button color="primary" >
            Aceptar
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
          </> :null
        }  
              </Form>
        </ModalBody>
       
       
      </Modal>
      
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
            <th>Dias</th>
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
          <td onClick={()=>setIdclase(props.item.ID_CLASE)}>{props.item.NOMBRE.slice(0,3)} {props.item.NIVEL}</td>
          </Link>
          <td>{props.item.MAESTRO}</td>
          <td>{props.item.FECHAI}</td>
          <td>{props.item.FECHAF}</td>{console.log("propsunic",props.item.DIAS)}
          {props.item.DIAS[0]!==null ?
             <td>{props.item.DIAS.map(ite=>{
              return <i>{ite.slice(0,2)}</i>
            })}</td>
            :null
          }
         
        </tr>
              );
}

export const Perfclase=(props)=>{
  const apiUrl=process.env.REACT_APP_API;
  const [nextpagina,setNextpagina]=useState(false)
  const[agregar,setAgregar]=useState(false)
  const[editmodal,setEditmodal]=useState(false);
  const[alerta,setAlerta]=useState(false)
  const[modal,setModal]=useState(false);
  const[formValue,setFormValue]=useState({id:"",dia:"",horai:"",horaf:"",maestro:"",idclase:"",nivel:""})
  const[activeTab,setActiveTab]=useState('1');
  const{daEscuela,daClase,daClases,setClases, leccionesDate,setleccDate,daLeccion,setLeccion}=useContext(InfoContext);
  const[alerMensaje,setAlermensaje]=useState("")

  const mondays=[]
  const momen = extendMoment(Moment);

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
    setFormValue({id:lecc.ID,dia:lecc.DIA,horai:lecc.HORAI.slice(0,-10),horaf:lecc.HORAF.slice(0,-10),maestro:lecc.MAESTRO,nivel:lecc.NIVEL})
  }

  const refreshlecciones=async()=>{
  try {//console.log("inife:",new Date(f.replace(/-/g, '\/')))
      let dat={escuelaId:daEscuela.ID};
      //let res=await fetch("http://localhost:3001/Clases",{
      let res=await fetch(apiUrl+`/Clases`,{
  
          method:'POST',
          mode:'cors',
          body:JSON.stringify(dat),
          headers:{'content-type':'application/json'},
      })
      .then(res=>res.json())
      .then(res=>{
           try {
            res.forEach(function(item){
              var fi=new Date(item.FECHAI.replace(/-/g, '\/'));
              var ff=new Date(item.FECHAF.replace(/-/g, '\/'));
              while(fi<=ff){
                  if(item.DIA===null){
                      mondays.push({ID_CLASE:item.ID_CLASE, NOMBRE:item.NOMBRE,NIVEL:item.NIVEL,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate()),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate()),MAESTRO:item.MAESTRO,HORAI:null,HORAF:null,FECHAI:item.FECHAI,FECHAF:item.FECHAF,DIAS:[],DIA:null})

                      break;
                  }
                  if(item.DIA==="Lunes"){
                      if(fi.getDay()===1){
                          mondays.push({ID_CLASE:item.ID_CLASE, NOMBRE:item.NOMBRE,NIVEL:item.NIVEL,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAI.slice(0,-13),item.HORAI.substring(3,5)),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAF.slice(0,-13),item.HORAF.substring(3,5)),MAESTRO:item.MAESTRO,HORAI:item.HORAI,HORAF:item.HORAF,FECHAI:item.FECHAI,FECHAF:item.FECHAF,DIAS:[],DIA:"L"})
                      }   
                  } 
                  if(item.DIA==="Martes"){
                      if(fi.getDay()===2){
                          mondays.push({ID_CLASE:item.ID_CLASE, NOMBRE:item.NOMBRE,NIVEL:item.NIVEL,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAI.slice(0,-13),item.HORAI.substring(3,5)),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAF.slice(0,-13),item.HORAF.substring(3,5)),MAESTRO:item.MAESTRO,HORAI:item.HORAI,HORAF:item.HORAF,FECHAI:item.FECHAI,FECHAF:item.FECHAF,DIAS:[],DIA:"Ma"})
                      }   
                  }  
                  if(item.DIA==="Miercoles"){
                      if(fi.getDay()===3){
                          mondays.push({ID_CLASE:item.ID_CLASE, NOMBRE:item.NOMBRE,NIVEL:item.NIVEL,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAI.slice(0,-13),item.HORAI.substring(3,5)),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAF.slice(0,-13),item.HORAF.substring(3,5)),MAESTRO:item.MAESTRO,HORAI:item.HORAI,HORAF:item.HORAF,FECHAI:item.FECHAI,FECHAF:item.FECHAF,DIAS:[],DIA:"Mi"})
                      }   
                  }      
                  if(item.DIA==="Jueves"){
                      if(fi.getDay()===4){
                          mondays.push({ID_CLASE:item.ID_CLASE, NOMBRE:item.NOMBRE,NIVEL:item.NIVEL,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAI.slice(0,-13),item.HORAI.substring(3,5)),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAF.slice(0,-13),item.HORAF.substring(3,5)),MAESTRO:item.MAESTRO,HORAI:item.HORAI,HORAF:item.HORAF,FECHAI:item.FECHAI,FECHAF:item.FECHAF,DIAS:[],DIA:"J"})
                      }   
                  } 
                  if(item.DIA==="Viernes"){
                      if(fi.getDay()===5){
                          mondays.push({ID_CLASE:item.ID_CLASE, NOMBRE:item.NOMBRE,NIVEL:item.NIVEL,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAI.slice(0,-13),item.HORAI.substring(3,5)),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAF.slice(0,-13),item.HORAF.substring(3,5)),MAESTRO:item.MAESTRO,HORAI:item.HORAI,HORAF:item.HORAF,FECHAI:item.FECHAI,FECHAF:item.FECHAF,DIAS:[],DIA:"V"})
                      }   
                  } 
                  if(item.DIA==="Sabado"){
                      if(fi.getDay()===6){
                          mondays.push({ID_CLASE:item.ID_CLASE, NOMBRE:item.NOMBRE,NIVEL:item.NIVEL,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAI.slice(0,-13),item.HORAI.substring(3,5)),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAF.slice(0,-13),item.HORAF.substring(3,5)),MAESTRO:item.MAESTRO,HORAI:item.HORAI,HORAF:item.HORAF,FECHAI:item.FECHAI,FECHAF:item.FECHAF,DIAS:[],DIA:"S"})
                      }   
                  } 
                fi.setDate(fi.getDate()+1);
              }
              
          });
          setleccDate(mondays);

           } catch (error) {
            
           }
        

        setClases(res);
        
        alert("Operacion exitosa")
        console.log("reslecc",res[0].ID)
       /* if(res[0].ID===null){
          setNextpagina(true)
        }*/
   } )
  }catch(error){
    console.log(error)
  }}



  const eliminarLecc=async()=>{
   //await fetch(`http://localhost:3001/Eliminarleccion/${formValue.id}`,{
   await fetch(apiUrl+`/Eliminarleccion/${formValue.id}`,{
   
      method:'DELETE'
    })
    .catch(err=>console.error(err))
    .then(()=>{
      refreshlecciones()
      setEditmodal(false)
      setModal(false)
      console.log("exitoso")
    })
  }
  const editLeccion=()=>{
    const a=[];
    let ban=false
        let banniv=false
        var grup=" "
    daClases.forEach(function(el){
      
        if(el.DIA===formValue.dia  ){
          var ho1=[momen(el.HORAI.slice(0,-10),'HH:mm'),momen(el.HORAF.slice(0,-10),'HH:mm')]
          var ho2=[momen(formValue.horai,'HH:mm'),momen(formValue.horaf,'HH:mm')]

          var range1=momen.range(ho1)
          var range2=momen.range(ho2)

          if(el.NIVEL.includes(",")){
            el.NIVEL.split(",").map(ni=>{
              if(formValue.nivel.includes(ni))
              grup=ni
              banniv=true
              
            })
          }else{
            if(formValue.nivel.includes(el.NIVEL)){
              grup=formValue.nivel
              banniv=true
              
            }
            
          }
        

          if(range1.overlaps(range2)){
                if(el.MAESTRO===formValue.maestro){
                  ban=true
                  setAlermensaje(", "+el.MAESTRO+" tiene clase en la misma hora dia: "+el.DIA)
                  setAlerta(true)
                  return
                }
                if(banniv){
                  setAlermensaje(",grupo "+grup+" ocupado con Maestro(a):"+" "+el.MAESTRO+", dia: "+formValue.dia)
                  ban=true
                  setAlerta(true)
                  return
                }
               
            
          }
        }
     
    })
    if(ban){
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
    setFormValue({id:"",horai:"",horaf:"",dia:"Lunes",nivel:"",maestro:daClase.MAESTRO,idclase:daClase.ID_CLASE});
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
      //let res=await fetch("http://localhost:3001/Agregarleccion",{
      let res=await fetch(apiUrl+`/Agregarleccion`,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(da),
        headers:{'content-type':'application/json'},
      })
      .then(res=>{
        if(res.ok){
          refreshlecciones()
            .then(()=>{
              setModal(false)
            })
         
        }
      })
    } catch (error) {
      
    }
  }
  const updateLeccion=async()=>{
    let da={id:formValue.id,dia:formValue.dia,nivel:formValue.nivel,horai:formValue.horai,horaf:formValue.horaf}
    console.log("DA",da)
    try {
      //let res=await fetch("http://localhost:3001/Updateleccion",{
      let res=await fetch(apiUrl+`/Updateleccion`,{

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
         <div>{console.log("lecc",lecciones)}{console.log("leccClase",leccClase)}
          {lecciones.length>0 ?
          <>
             <i>{leccClase.map(item=>{return <>{item.DIA} {item.HORAI!==null?   item.HORAI.slice(0,-10):''}-{item.HORAF!==null? item.HORAF.slice(0,-10):''} </> })}</i>
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
             <th>Nivel</th>
           </tr>
         </thead>
         <tbody>
           {leccClase.map(item=>{
             return <tr>
              
               <td style={{color:'#1274de'}} onClick={()=>{setModal(true);leccionId(item.ID)}}>{item.FECHAI}/{item.FECHAF}</td>
               <td>{item.DIA}</td>
               <td>{item.HORAI.slice(0,-10)}-{item.HORAF.slice(0,-10)}</td>
               <td>{item.MAESTRO}</td>
               <td>{item.NIVEL}</td>
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
                
               <Row md={2}>
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
                      <>Nivel</>
                    </Label>
                    <Input style={{backgroundColor:"#fffde3",fontSize:"13px"}}
                    // bsSize="lg"
                      type="text"
                      name="nivel"
                      value={formValue.nivel}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>  
                </Row>   
                <Row md={2}>
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
<Alert color='warning'>Revisa el horario,  {alerMensaje}</Alert>}
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
            {nextpagina &&
            <Navigate to={"/Escuela"}/>}
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
  <>{console.log("DALECCION:",daLeccion)}
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