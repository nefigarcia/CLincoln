import React, {Component, useContext, useEffect, useState} from 'react';
import {FormGroup,Form, Label, Input,  TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table,Modal, ModalHeader, ModalBody, Alert,ModalFooter } from 'reactstrap';
import classnames from 'classnames';
import { InfoContext } from '../context';
import { Link, Navigate,useNavigate } from "react-router-dom";
import moment from 'moment';
import { async } from 'q';
import Moment from 'moment'
import { extendMoment } from 'moment-range';
import { InicioEscuela } from './InicioEscuela';

export const Clases=(props)=>{
  const apiUrl=process.env.REACT_APP_API;
    const[activeTab,setActiveTab]=useState('1');
    const{setClases,daClases,leccionesDate,setleccDate,statusmock,setStatusmock,arrres,setArrres,daCuenta,setClases2,leccionesDate2,daClases2}=useContext(InfoContext);
    const[modgen,setModgen]=useState(false)
    const[formValue,setFormValue]=useState({id:"",dia:"",horai:"10:30",horaf:"11:00",horai2:"",horaf2:"",tiempoleccion:0,maestro:"",idclase:"",nivel:""})
    const[formFields1,setFormFields1]=useState({idclase:0,lecciones:"1",nivel:"",nombre:"",maestro:"",niveles:[{ lecciones:"",nivel:""}]})
    const[formRecesos,setFormRecesos]=useState([{horai:"10:30",horaf:"11:00"}])
    const[alerta,setAlerta]=useState(false)
    const[mensaje,setMensaje]=useState("")
    const{id,dia,horai,horaf,horai2,horaf2,tiempoleccion}=formValue
    const momen = extendMoment(Moment);
    const[btnhide,setBtnhide]=useState(false)
    const mondays=[]
    const mockdaClases=[]
    const [arrDiasNotNull,setArrDiasNotNull]=useState([])

    useEffect(()=>{
      addLecc()
    },[])

    const addLecc=()=>{
      var arr=[]
      for(let daClases1 of daClasesunic){
        var object={idclase:daClases1.ID_CLASE,lecciones:"1",nivel:"",nombre:daClases1.NOMBRE,maestro:daClases1.MAESTRO,niveles:[{ lecciones:"1",nivel:""}],fechai:daClases1.FECHAI,fechaf:daClases1.FECHAF}
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
    const daNivelesunic=leccionesDate.filter((value,index,self)=>
      index===self.findIndex((t)=>( 
        t.ID_CLASE===value.ID_CLASE && t.NIVEL===value.NIVEL
       ))
    )
    const preGenerarlecc=()=>{
      var ban=0
      daNivelesunic.map(i=>{
        console.log("DIAS",i.DIAS)
        if(i.DIAS[0]!=null){
          ban=ban+(i.DIAS.length)
        }
       
      })
      if(ban>0){
        console.log("BAN",ban)
        setStatusmock("Tienes lecciones guardadas, dos opciones para poder continuar, 1. borrar las lecciones en boton BORRAR, 2. Generar lecciones incluyendo las detectadas, boton CONTINUAR")
      }else{
        setStatusmock("")
        togglgencal()
      }
      
    }
    
    const incluirLeccgenerar=()=>{
      var arrDiasNotnull=[]
      const diasNotnull=daClases.filter(i=> i.DIA!=null)
        console.log("DIASNOTNULL",diasNotnull)

      diasNotnull.map(i=>{
        arrDiasNotnull.push({idclase:i.ID_CLASE,lecciones:"0",nivel:i.NIVEL,nombre:i.NOMBRE,maestro:i.MAESTRO,dia:i.DIA,hoi:i.HORAI.slice(0,-10),hof:i.HORAF.slice(0,-10),fechai:i.FECHAI,fechaf:i.FECHAF})
      })  
      setArrDiasNotNull(arrDiasNotnull)
      setStatusmock("")
      togglgencal()
    }
    const cancelarLecc=()=>{
      setClases(daClases2)
      setleccDate(leccionesDate)
      setStatusmock("")
    }
    const guardarMocklecc=async()=>{
      let da={da:arrres}
      try {
       let res=await fetch(apiUrl+`/Addmocklecc`,{
          method:'POST',
          mode:'cors',
          body:JSON.stringify(da),
          headers:{'content-type':'application/json'},
        })
        .then(res=>{
          if(res.ok){
            setMensaje("")
            setStatusmock("")
            alert("Lecciones guardadas en la base de datos")          }
        })
      } catch (error) {
        console.log("er",error)

      }
    }
    const borrarLeccgenerar=async()=>{
      console.log("BORRAR")
      const da={da:daNivelesunic}
        try {
          await fetch(apiUrl+`/Deletelecc`,{
            method:'DELETE',
            body:JSON.stringify(da),
            headers:{'content-type':'application/json'}
          })
            .then(res=>{
              if(res.ok){
                setStatusmock("")
                togglgencal()

              var leccBorradas= daNivelesunic.filter((v,i,s)=>
                  i===s.findIndex((t)=>(
                    t.ID_CLASE===v.ID_CLASE
                  ))
                )
                leccBorradas.map((i)=>{i.NIVEL=""; i.DIAS=[]})
                setleccDate(leccBorradas)
              }
            })
        } catch (error) {
          
        }
    }
    const generarLecc=()=>{
      arrres.forEach(function(item){
        var fi=new Date(item.fechai.replace(/-/g, '\/'));
        var ff=new Date(item.fechaf.replace(/-/g, '\/'));
        while(fi<=ff){
            if(item.dia===null){
                mondays.push({ID_CLASE:item.idclase, NOMBRE:item.nombre,NIVEL:item.nivel,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate()),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate()),MAESTRO:item.maestro,HORAI:null,HORAF:null,FECHAI:item.fechai,FECHAF:item.fechaf,DIAS:[],DIA:null})

                break;
            }
            if(item.dia==="Lunes"){
                if(fi.getDay()===1){
                    mondays.push({ID_CLASE:item.idclase, NOMBRE:item.nombre,NIVEL:item.nivel,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.hoi.slice(0,-3),item.hoi.substring(3,5)),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.hof.slice(0,-3),item.hof.substring(3,5)),MAESTRO:item.maestro,HORAI:item.hoi,HORAF:item.hof,FECHAI:item.fechai,FECHAF:item.fechaf,DIAS:[],DIA:"L",DI:item.dia})
                }   
            } 
            if(item.dia==="Martes"){
                if(fi.getDay()===2){
                    mondays.push({ID_CLASE:item.idclase, NOMBRE:item.nombre,NIVEL:item.nivel,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.hoi.slice(0,-3),item.hoi.substring(3,5)),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.hof.slice(0,-3),item.hof.substring(3,5)),MAESTRO:item.maestro,HORAI:item.hoi,HORAF:item.hof,FECHAI:item.fechai,FECHAF:item.fechaf,DIAS:[],DIA:"Ma",DI:item.dia})
                }   
            }  
            if(item.dia==="Miercoles"){
                if(fi.getDay()===3){
                    mondays.push({ID_CLASE:item.idclase, NOMBRE:item.nombre,NIVEL:item.nivel,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.hoi.slice(0,-3),item.hoi.substring(3,5)),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.hof.slice(0,-3),item.hof.substring(3,5)),MAESTRO:item.maestro,HORAI:item.hoi,HORAF:item.hof,FECHAI:item.fechai,FECHAF:item.fechaf,DIAS:[],DIA:"Mi",DI:item.dia})
                }   
            }      
            if(item.dia==="Jueves"){
                if(fi.getDay()===4){
                    mondays.push({ID_CLASE:item.idclase, NOMBRE:item.nombre,NIVEL:item.nivel,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.hoi.slice(0,-3),item.hoi.substring(3,5)),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.hof.slice(0,-3),item.hof.substring(3,5)),MAESTRO:item.maestro,HORAI:item.hoi,HORAF:item.hof,FECHAI:item.fechai,FECHAF:item.fechaf,DIAS:[],DIA:"J",DI:item.dia})
                }   
            } 
            if(item.dia==="Viernes"){
                if(fi.getDay()===5){
                    mondays.push({ID_CLASE:item.idclase, NOMBRE:item.nombre,NIVEL:item.nivel,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.hoi.slice(0,-3),item.hoi.substring(3,5)),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.hof.slice(0,-3),item.hof.substring(3,5)),MAESTRO:item.maestro,HORAI:item.hoi,HORAF:item.hof,FECHAI:item.fechai,FECHAF:item.fechaf,DIAS:[],DIA:"V",DI:item.dia})
                }   
            } 
            if(item.dia==="Sabado"){
                if(fi.getDay()===6){
                    mondays.push({ID_CLASE:item.idclase, NOMBRE:item.nombre,NIVEL:item.nivel,FECHA:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAI.slice(0,-3),item.HORAI.substring(3,5)),FECHA2:new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),item.HORAF.slice(0,-3),item.HORAF.substring(3,5)),MAESTRO:item.maestro,HORAI:item.hoi,HORAF:item.hof,FECHAI:item.fechai,FECHAF:item.fechaf,DIAS:[],DIA:"S",DI:item.dia})
                }   
            } 
          fi.setDate(fi.getDate()+1);
        }
        mockdaClases.push({DIA:item.dia,FECHAF:item.fechaf,FECHAI:item.fechai,HORAF:item.hof+":00.000000",HORAI:item.hoi+":00.000000",ID:"",ID_CLASE:item.idclase,MAESTRO:item.maestro,NIVEL:item.nivel,NOMBRE:item.nombre})
    });
      setBtnhide(false)
      setMensaje("")
      togglgencal()
      setStatusmock("Estas usando data momentanea, revisa el calendario generado y si te gusta, da click en Guardar")
      setleccDate(mondays)
      setClases(mockdaClases)
      console.log("LECCGENERADAS",leccionesDate)

    }
    const verificarCal=()=>{
      console.log("daclases",daClases)
      console.log("leccionesClases",leccionesDate)
      var lecciones=[]
      formFields1.map((f,i)=>{
        f.niveles.map((fo,ii)=>{
          lecciones.push({idclase:f.idclase,lecciones:fo.lecciones,nivel:fo.nivel,nombre:f.nombre,maestro:f.maestro,dia:"",hoi:"",hof:"",fechai:f.fechai,fechaf:f.fechaf})
        })
      })
      console.log("LECCC",lecciones)

     asignarLecc(lecciones,lecciones.length)   
    }
    const asignarLecc=(lecciones,tar)=>{
      const res=[...lecciones]
      let banlecc=0
      var horares1//=[momen(horai,'HH:mm'),momen(horaf,'HH:mm')]
      var rangeres//=momen.range(horares1);
      var horares2
      var rangeres2
      var recediff//=moment.duration(moment(horaf,"HH:mm").diff( moment(horai,"HH:mm")))
      var recemin//=parseInt(recediff.asMinutes())%60
      var recediff2
      var recemin2
      const dias=["Lunes","Martes","Miercoles","Jueves","Viernes"]
      var horaf2s=horaf2
      var horai2s=horai2
      var diacount=0
      if(formRecesos.length<2){
        horares1=[momen(formRecesos[0].horai,'HH:mm'),momen(formRecesos[0].horaf,'HH:mm')]
        rangeres=momen.range(horares1);
         recediff=moment.duration(moment(formRecesos[0].horaf,"HH:mm").diff( moment(formRecesos[0].horai,"HH:mm")))
         recemin=parseInt(recediff.asMinutes())%60
      }else{
        horares1=[momen(formRecesos[0].horai,'HH:mm'),momen(formRecesos[0].horaf,'HH:mm')]
        rangeres=momen.range(horares1);
        horares2=[momen(formRecesos[1].horai,'HH:mm'),momen(formRecesos[1].horaf,'HH:mm')]
        rangeres2=momen.range(horares2);
        recediff=moment.duration(moment(formRecesos[0].horaf,"HH:mm").diff( moment(formRecesos[0].horai,"HH:mm")))
        recemin=parseInt(recediff.asMinutes())%60
        recediff2=moment.duration(moment(formRecesos[1].horaf,"HH:mm").diff( moment(formRecesos[1].horai,"HH:mm")))
        recemin2=parseInt(recediff2.asMinutes())%60
      }
      if(arrDiasNotNull[0]!=null){
        arrDiasNotNull.map(i=>{
          res.push(i)
        })
      }
      const buscar=(inx,tar)=>{
        console.log("INDEX:",inx)
        var leccunic=false
        if(horai2s===horaf2s){horai2s=horai2; return}
        if(inx===dias.length){        
          console.log("block:",banlecc)
          return
        }
        if(banlecc===lecciones.length){return}
        console.log("LECCIONES",lecciones)
        //var ran1=Math.floor(Math.random() * (horaf2s - horai2s +1))+ (horai2s.includes("0")?horais:Number(horai2s))
        var ho1=moment(horai2s,"HH:mm").format("HH:mm")
        var ho2=moment(ho1,"HH:mm").add(tiempoleccion,'minutes').format("HH:mm")
        horai2s=ho2

        var ho=[momen(ho1,"HH:mm"),momen(ho2,"HH:mm")]
        var horange=momen.range(ho)
          if(horange.overlaps(rangeres)){
             ho1=moment(ho1,"HH:mm").add(recemin,'minutes').format("HH:mm")
             ho2=moment(ho1,"HH:mm").add(tiempoleccion,'minutes').format("HH:mm")
            horai2s=ho2
            }
          if(rangeres2!==undefined){
            if(horange.overlaps(rangeres2)){
              ho1=moment(ho1,"HH:mm").add(recemin2,'minutes').format("HH:mm")
              ho2=moment(ho1,"HH:mm").add(tiempoleccion,'minutes').format("HH:mm")
             horai2s=ho2
            }
          }
          if(res[banlecc.lecciones]!=0){
            res[banlecc].hoi=ho1
            res[banlecc].hof=ho2
            res[banlecc].dia=dias[inx] 
            leccunic=true
          }

          if(lecciones[banlecc].lecciones>1 || leccunic){
              var ban=1; var band=diacount; var cicl=false; var ho11=ho1; var ho22=ho2; var banwhile=1;
              var checkniv=false; var check=false
              if(lecciones[banlecc].nivel.includes(",")){
                checkniv=true
              }
              if(band>4){band=diacount-1}
              if(leccunic){ban=0;}

              while(ban<lecciones[banlecc].lecciones){
                var h1=[momen(ho1,"HH:mm"),momen(ho2,"HH:mm")]
                var arr=structuredClone(lecciones[banlecc]);

                if(band>4){band=0}
                arr.hoi=ho1; arr.hof=ho2; arr.dia=dias[band]
                var horange1=momen.range(h1)

                if(horange1.overlaps(rangeres)){
                  ho1=moment(ho1,"HH:mm").add(recemin,'minutes').format("HH:mm");
                  ho2=moment(ho1,"HH:mm").add(tiempoleccion,'minutes').format("HH:mm");
                  h1=[momen(ho1,"HH:mm"),momen(ho2,"HH:mm")]
                  horange1=momen.range(h1)
                }
                if(rangeres2!==undefined){
                  if(horange1.overlaps(rangeres2)){
                    ho1=moment(ho1,"HH:mm").add(recemin2,'minutes').format("HH:mm");
                    ho2=moment(ho1,"HH:mm").add(tiempoleccion,'minutes').format("HH:mm");
                    h1=[momen(ho1,"HH:mm"),momen(ho2,"HH:mm")]
                    horange1=momen.range(h1)
                  }
                }
               console.log("WHILE")
                 for(var i=0;i<res.length;i++){ 
                  if(checkniv){
                    lecciones[banlecc].nivel.split(",").map(ni=>{
                      if(res[i].nivel.includes(ni)){check=true}
                    })
                  }else{
                    if(res[i].nivel.includes(lecciones[banlecc].nivel)){
                      check=true
                    }
                  }
                  if(arr.dia===res[i].dia ){
                    console.log("IF")
                    if(banlecc==i && leccunic){continue}
                    var h2=[momen(res[i].hoi,"HH:mm"),momen(res[i].hof,"HH:mm")]
                    var h2range=momen.range(h2)
                    if((horange1.overlaps(h2range) && res[i].maestro===arr.maestro) || (horange1.overlaps(h2range) && check )){
                        console.log("Repite",i)
                        console.log("res",res[i])
                        band=band+1
                        ho1=ho2
                        ho2=moment(ho1,"HH:mm").add(tiempoleccion,'minutes').format("HH:mm")
                        h1=[momen(ho1,"HH:mm"),momen(ho2,"HH:mm")]
                        horange1=momen.range(h1)
                        if(horange1.overlaps(rangeres)){
                          ho1=moment(ho1,"HH:mm").add(recemin,'minutes').format("HH:mm");
                          ho2=moment(ho1,"HH:mm").add(tiempoleccion,'minutes').format("HH:mm");
                          h1=[momen(ho1,"HH:mm"),momen(ho2,"HH:mm")]
                          horange1=momen.range(h1)
                        }
                        if(rangeres2!=undefined){
                          if(horange1.overlaps(rangeres2)){
                            ho1=moment(ho1,"HH:mm").add(recemin2,'minutes').format("HH:mm");
                            ho2=moment(ho1,"HH:mm").add(tiempoleccion,'minutes').format("HH:mm");
                            h1=[momen(ho1,"HH:mm"),momen(ho2,"HH:mm")]
                            horange1=momen.range(h1)
                          }
                        }
                       
                        if(ho1>horaf2){
                          ho1=horai2
                          ho2=moment(ho1,"HH:mm").add(tiempoleccion,'minutes').format("HH:mm")
                        }
                        console.log("arr",arr)
                        cicl=true
                        banwhile=banwhile+1
                        if(band>4){band=0}
                        if(banwhile>70){console.log("NO GUARDADA",lecciones[banlecc]); cicl=false}
                        check=false
                        break;
                    }
                    cicl=false
                    check=false
                  }
                  cicl=false
                  check=false
                }
                 if(cicl)continue
                 if(!leccunic){
                  res.push(arr)
                  band=band+1
                  ban=ban+1
                  console.log("BAN",ban)
                 }else{
                  res[banlecc].hoi=arr.hoi
                  res[banlecc].hof=arr.hof
                  res[banlecc].dia=arr.dia 
                  band=band+1
                  ban=ban+1
                  leccunic=false
                 }
              }
            }  
        
       //banrep=res[banlecc].lecciones

       banlecc=banlecc+1
       diacount=diacount+1
      console.log("RESFINAL",res)
       buscar(inx,tar);
       buscar(inx+1,tar);
       buscar(0,tar)
      }

      buscar(0,tar)
      console.log("ALGORITH:",res)
      setMensaje("Click OK para vevisualizar las lecciones generadas");
      setBtnhide(true)
      setArrres(structuredClone(res))
      return res;
    };
  
    function clasesDias(){
      console.log("daNivelesunic",daNivelesunic)
      console.log("daClases",daClases)
      daNivelesunic.map(item=>{
        return item.DIAS=[];
      })
      daClases.forEach(function(element){
        daNivelesunic.forEach(function(ele){
        if(ele.ID_CLASE==element.ID_CLASE && ele.NIVEL==element.NIVEL){
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
    const handleResChange=(event,index)=>{
      let data=[...formRecesos]
      data[index][event.target.name]=event.target.value;
      setFormRecesos(data)
    }
    const addReceso=()=>{
      let object={
        horai:"",
        horaf:""
      }
      setFormRecesos([...formRecesos,object])
    }
    const removeReceso=(index)=>{
      let data=[...formRecesos]
      data.splice(index,1)
      setFormRecesos(data)
    }
    const handleSubmit=(e)=>{
      
      e.preventDefault(); 
      let ni=false
      formFields1.map((f,i)=>{
        f.niveles.map(ii=>{if(ii.nivel==""){setMensaje("Llenar el campo Nivel ingresando un numero x o si hay multiplbes es necesario poner una coma, 1,3,2");
         
    ni=true; return}})
      })
      if(ni){return}
      verificarCal()
    }
    return(
        <div className='container'>
            <h5>Clases</h5> 
            <Button size='sm' hidden={daCuenta.ROLES_ID!=1} onClick={preGenerarlecc} color='primary'>Generar Calendario con IA</Button>
            {statusmock==="Estas usando data momentanea, revisa el calendario generado y si te gusta, da click en Guardar" ?
             <>
              <Button size='sm' color='success' onClick={()=>guardarMocklecc()}>Guardar</Button>
              <Button size='sm' color='warning' onClick={()=>cancelarLecc()}>Cancelar</Button>
              <Alert color='warning'>{statusmock}</Alert>
  
             </>:null
             

            }
           
            {statusmock==="Tienes lecciones guardadas, dos opciones para poder continuar, 1. borrar las lecciones en boton BORRAR, 2. Generar lecciones incluyendo las detectadas, boton CONTINUAR" ?
              <>
                <Alert color='warning'>{statusmock}</Alert>
                <Button onClick={borrarLeccgenerar} color='danger'>BORRAR</Button>
                <Button onClick={incluirLeccgenerar} color='success'>CONTINUAR</Button>
              </>:null
            }
            <hr/>
           
            <Modal isOpen={modgen} toggle={togglgencal} >
        <ModalHeader toggle={togglgencal}>Generar Calendario usando IA</ModalHeader>
        <ModalBody>
        <Form onSubmit={handleSubmit}>
        <h4>Recesos</h4>
         {formRecesos.map((form,index)=>{
          return (
            <Row md={2} key={index}>
                <Col>
                     <FormGroup>
                        <Label for="Nombre">
                          <>Inicio</>
                        </Label>
                        <Input style={{backgroundColor:"#fffde3",fontSize:"13px"}}
                        // bsSize="lg"
                          type="time"
                          name="horai"
                          value={form.horai}
                          onChange={event=>handleResChange(event,index)}
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
                      value={form.horaf}
                      onChange={event=>handleResChange(event,index)}
                    />
                  </FormGroup>                 
                </Col>
                <Col sm={2}>
                  <a className='label d-flex justify-content-start' style={{color:"red"}} onClick={()=>removeReceso(index)} >X</a>
                  </Col>
                </Row> 
          )
         }
        ) } 
         <a className='label d-flex justify-content-start' onClick={()=>addReceso()} >+ Agregar receso</a>

                <hr/>
                <Row >
                <Col >
                  <FormGroup>
                    <Label for="Nombre">
                      <>Leccion minutos </>
                    </Label>
                    <Input className='div-center' style={{width:"100px", backgroundColor:"#fffde3",fontSize:"13px",marginLeft:"auto",marginRight:"auto"}}
                    // bsSize="sm"
                    // size={3}
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
                  </Row>  <hr/>
                {horaf!=="" ? 
                    <>
                    <h4>Horario escuela</h4>
                    <Row  md={2}>
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
                    
                    </Row> 
                    <hr/>
                    </>
                     :
                    null      
                   
                }
                {horaf2!=="" ?
                  <>
                     {formFields1.map((form,index)=>{
                      return <> <Label>{form.nombre}</Label>

                         { form.niveles.map((f,i)=>
                           {
                            return ( 
                              <Row md={2} key={i}>                   
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
                                <Col >
                                <a className='label d-flex justify-content-start' style={{color:"red"}} onClick={()=>removeFields(i,index)} >X</a>
                                </Col>
                            </Row>
                            
                            )
                            }
                          )}
                       <a className='label d-flex justify-content-start' onClick={()=>addNivel(index)} >+ Agregar Nivel</a>
                          <hr/>
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
        
        <Button hidden={!btnhide} onClick={()=>generarLecc()} color='success'>OK</Button>
          <Button hidden={btnhide} color="primary" >
            Aceptar
          </Button>             
         {' '}
          <Button color="secondary" onClick={()=>{setBtnhide(false);setMensaje("")}}>
            Cancel
          </Button>
        </ModalFooter>
          </> :null
        }  
              </Form>
        </ModalBody>
       
       
      </Modal>
      
            <Nav tabs>{console.log("daClases",daClases)}
              <NavItem>{console.log("leccUnicas",daNivelesunic)}
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
            {daNivelesunic.map(item=>{
                return <Clasess key={item.ID} item={item} clasesunic={daNivelesunic}/>
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
  const{setClase}=useContext(InfoContext);
  
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
          <td>{props.item.FECHAF}</td>
          {props.item.DIAS[0]!==null ?
             <td> 

               {props.item.DIAS.map(ite=>{
              return <i>{ite.slice(0,2)}</i>
            })}
            </td>
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
  const[modal2,setModal2]=useState(false);

  const[formValue,setFormValue]=useState({id:"",dia:"",horai:"",horaf:"",maestro:"",idclase:"",nivel:""})
  const[formValue2,setFormValue2]=useState({fecha:"",fecha2:""})
  const[activeTab,setActiveTab]=useState('1');
  const{daEscuela,daClase,daClases,setClases, leccionesDate,setleccDate,setLeccion,daCuenta}=useContext(InfoContext);
  const[alerMensaje,setAlermensaje]=useState("")

  const mondays=[]
  const momen = extendMoment(Moment);
  const {fecha,fecha2}=formValue2

  const toggl=()=>{
    setModal(!modal)
  }
  const toggl2=()=>{
    setModal2(!modal2)
  }
  const togglelecc=()=>{
    setEditmodal(!editmodal)
  }
  const lecciones=leccionesDate.filter(function(item){
  return  item.ID_CLASE==daClase.ID_CLASE && item.DIA!=null && item.NIVEL==daClase.NIVEL
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
      let res=await fetch(apiUrl+`/Clases`,{
  
          method:'POST',
          mode:'cors',
          body:JSON.stringify(dat),
          headers:{'content-type':'application/json'},
      })
      .then(res=>res.json())
      .then(res=>{console.log("REFRESH",res)
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
        console.log("bug1",mondays.length)
        console.log('bug2',leccionesDate)   
        console.log("bug3",lecciones.length)
        
        alert("Operacion exitosa")
        console.log("reslecc",res.length)
       /* if(res[0].ID===null){
          setNextpagina(true)
        }*/
   } )
  }catch(error){
    console.log(error)
  }}



  const eliminarLecc=async()=>{
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
    if(daClase.NIVEL==undefined){
      daClase.NIVEL=formValue.nivel
    }
    let da={formFields:formValue}
    try {
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
    let da={id:formValue.id,dia:formValue.dia,nivel:formValue.nivel,horai:formValue.horai,horaf:formValue.horaf,fecha:fecha,fecha2:fecha2,idclase:daClase.ID_CLASE}
    
    try {
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
        if(res.message=="Clase actualizada"){
          refreshlecciones();
          setModal2(false)
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
const handleChange2 = (event) => {
  const { name, value } = event.target;
  setFormValue2((prevState) => {
    return {
      ...prevState,
      [name]: value,
    };
  });
};   
  return(
    <div className='container' style={{fontSize:'13px'}}>
       <h5>Clase</h5>
       <hr/>
       <Row md={2}>
        <Col>
         <h6>{daClase.NOMBRE} <a href='#' hidden={daCuenta.ROLES_ID!=1} onClick={()=>{setModal2(true);setFormValue2({fecha:daClase.FECHAI,fecha2:daClase.FECHAF})}}>Editar Clase</a></h6>
         <div>
          {lecciones.length>0 ?
          <>
             <i>{leccClase.map(item=>{return <>{item.DIA} {item.HORAI!==null?   item.HORAI.slice(0,-10):''}-{item.HORAF!==null? item.HORAF.slice(0,-10):''} </> })}</i>
          </>
          :null
          }{console.log('LECCIONESlength',lecciones.length)}
          {lecciones.length>0  ?
            <a href='#' hidden={daCuenta.ROLES_ID!=1} onClick={()=>togglelecc()} >(Editar Leccion)</a>
            :   <a href='#' hidden={daCuenta.ROLES_ID!=1} onClick={()=>{agregarLecc();setModal(true)}} >+Agregar leccion</a>

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
          
          <Modal style={{fontSize:"13px", maxWidth:"380px"}} isOpen={modal2} toggle={toggl2} onClosed={()=>{setAlerta(false);setAgregar(false)}}>
          <ModalHeader toggle={toggl2}>
          Editar Clase {daClase.NOMBRE}
            <br/>
           
            </ModalHeader>
          <ModalBody>
          <div >
    <h5><span className='text-center'>Datos</span></h5>
   
    <div className="card shadow " >
           
            <div className="card-body">
                
            <Row md={2}>
              <Col >      
              <FormGroup>
              <Label>Fecha inicio
              <span className='required' style={{color:"red"}}>*</span>
              </Label>
              <Input style={{backgroundColor:"#fffde3"}}
                //bsSize="lg"
                type="date"
                name="fecha"
                value={fecha}
                onChange={handleChange2}
        />
                </FormGroup>
            
                
              </Col>
              <Col >
              
              <FormGroup>
              <Label>Fecha termino
              <span className='required' style={{color:"red"}}>*</span>
              </Label>
              <Input style={{backgroundColor:"#fffde3"}}
              // bsSize="lg"
                type="date"
                name="fecha2"
                value={fecha2}
                onChange={handleChange2}
              />
                </FormGroup>

              </Col>
            </Row> 
           
            </div>
        </div>
<Button disabled={true} size='sm' onClick={eliminarLecc}>Eliminar</Button>
{" "}
<Button disabled={agregar} size='sm' onClick={updateLeccion}>Guardar</Button>
{" "}
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

            <Modal style={{fontSize:"13px", maxWidth:"380px"}} isOpen={modal} toggle={toggl} onClosed={()=>{setAlerta(false);setAgregar(false);setFormValue({horai:"",horaf:""})}}>
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
  const navigate=useNavigate()
  const toggle=()=>{
    setModal(!modal);
  }
 return(
  <>{console.log("DALECCION:",daLeccion)}
  <Modal isOpen={modal} toggle={toggle} onClosed={()=>{navigate(-1)}}>
          <ModalHeader toggle={toggle}>
          {moment(daLeccion.FECHA2).format("dddd") }
            {moment(daLeccion.FECHA2).format("DD-MM-YYYY")}
            <br/>
            <i>{moment(daLeccion.FECHA).format("hh:mm")}-</i>
            <i>{moment(daLeccion.FECHA2).format("hh:mm")}</i>
            </ModalHeader>
          <ModalBody>

          <div >
    <h1><span className='text-center'>{daLeccion.NOMBRE} {daLeccion.NIVEL}</span></h1>
   
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