import React,{Component, useContext,useState,forwardRef, useEffect} from 'react'
import styled from 'styled-components'
import { InfoConsumer, InfoContext } from '../context'
import { Button, Col, Row, Label, Progress } from 'reactstrap'
import DatePicker from "react-datepicker";
//import moment, { months } from 'moment';
import { Clases } from './Clases';
import { Progres } from '../components/Progres';
import Moment from 'moment';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import { Link } from 'react-router-dom';




export const InicioEscuela=(props)=>{
    const apiUrl=process.env.REACT_APP_API
    const{daEscuela,daClases,setClases,daCuenta,daGrupos,setLeccion,daClases2,setClases2}=useContext(InfoContext);
    const{leccionesDate,setleccDate,leccionesDate2,setleccDate2}=useContext(InfoContext);
    const [startDate, setStartDate] = useState(new Date());
    const mondays=[];
    const momen = extendMoment(Moment);

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button outline size='sm' className='pull-right' onClick={onClick} ref={ref}> 
    <small className='muted text-muted'>Fecha:</small>
   <span>{value}</span>
   </Button>
     ));

     const arrlec= arrmon();
   function arrmon(){
    const diaclases=leccionesDate.filter(function(item) {
        return (item.FECHA.getDate()===startDate.getDate() && item.FECHA.getMonth()===startDate.getMonth() && item.FECHA.getFullYear()===startDate.getFullYear())
      });
      return diaclases;
   }
   const blink=(hoi,hof)=>{
    const range1=moment(hoi,"HH:mm")
    const range2=moment(hof,"HH:mm")
     const tim=momen(startDate,"HH:mm")
    if(tim.isBetween(range1,range2)){
        console.log("OVERLAPS")
            return true;
        }else if(tim>range2){

          return  false
        }else{
            return false
        }
   }
   const registrar=async()=>{
    try {
        let dat={escuelaId:daEscuela.ID};
        let res=await fetch(apiUrl+`/Clases`,{
    
            method:'POST',
            mode:'cors',
            body:JSON.stringify(dat),
            headers:{'content-type':'application/json'},
        })
        .then(res=>res.json())
        .then(res=>{
            const ar1=structuredClone(res)
            const ar=[]
            var arma=[]
            console.log("ar1",res)

            if(daCuenta.ROLES_ID==2){
             arma= ar1.filter(i=>i.ID_MAESTRO==daCuenta.ID)
             res=arma
            }
            if(daCuenta.ROLES_ID==3){
               var sta= daCuenta.ID_GRUPO
               console.log("STA",sta)
               console.log("STAGRU",daGrupos)
                var gru=daGrupos.find(({ID})=>ID==sta)
                console.log("GRU",gru)

              ar1.map(i=>{
                    if(i.NIVEL!=undefined? i.NIVEL.includes(',') : false){
                        i.NIVEL.split(',').map(n=>{
                            if(gru.NOMBRE===n){
                                ar.push(i)
                            }
                        })
                     }else{                      
                            if(i.NIVEL!=undefined? gru.NOMBRE===i.NIVEL : false){
                              ar.push(i)
                            }
                     }
                })
                res=structuredClone(ar)

            }

            console.log("struc",res)
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
      setleccDate2(mondays);

      console.log("LECCIONESDATE:",leccionesDate)
          setClases(res)  
          setClases2(res)  

          console.log("DACLASES:",daClases)
            } catch (error) {
                console.log("error en:",error)
            }
          
        })
    } catch (error) {
        console.log("er:",error)
    }
   }  
   useEffect(()=>{
    registrar();
   
   },[]);
    return(
    <>  
      <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    /> 
    {leccionesDate.length>0 ?
     <>   
    {arrlec.map((mon,index)=>{  
     return <>
       <Row className="p-2 bg-light border" key={index} md={4}>
        <Col>
        {mon.HORAI!==null?
            <Link to='/Modalleccion'>
                <i onClick={()=>setLeccion(mon)}>
                {blink(mon.HORAI.slice(0,-10),mon.HORAF.slice(0,-10)) ?
                 <span className='blink_me'> 
                 </span>
                    : <span className='blink_mer'> 
                    </span>
                }
                
                {mon.HORAI.slice(0,-10)}-{mon.HORAF.slice(0,-10)}
            </i>
            </Link>
             
             :null
        }
       
        </Col>
        <Col>
        <div> {mon.NOMBRE}{mon.NIVEL}</div>
        </Col>
        <Col>
        <div> {mon.MAESTRO}</div>
        </Col>
        </Row>    
            </>
    })} 
     </>:null
    } 
    <Progres/>
    {mondays.length>0 &&
    console.log("MON",mondays.length)
    }
    
    </>
    );
}