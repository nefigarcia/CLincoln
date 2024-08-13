import React,{Component, useState,useEffect, useContext,createContext} from 'react';
import {EstDa,CuentDa, EscuelasDa, MaestrosDa, GruposDa, ExamenesDa, ExamrealizadosDa} from './Gets';
//const InfoContext=React.createContext();

export const InfoContext = createContext();
export const InfoProvider=props=>{
    var estaMenu='True';
    var dataEscuelas=EscuelasDa();
    var dataEscuela=[];
    var daEstudiantess=EstDa();
    var daMaestross=MaestrosDa();
    var daGruposs=GruposDa();
    var dataGrupos=[]
    var daExameness=ExamenesDa();
    var daExamrealizadoss=ExamrealizadosDa();
const[esta,setEsta]=useState(false);
const[rol,setRol]=useState('');
const[cuentEmail,setCuentaEmail]=useState('');
const[daCuenta,setCuenta]=useState([]);
const[daEscuela,setEscuela]=useState([]);
const[daEscuelas,setEscuelas]=useState([]);
const[emailCuenta,setEmailCuenta]=useState('xxxx');//email del usuario
const[loading,setLoading]=useState(true);
const[daCuentas,setCuentas]=useState([]);
const[daEstudiantes,setEstudiantes]=useState();
const[dataChange,setDatachange]=useState(false);
const[daEstudiante,setEstudiante]=useState([]);
const[daMaestros,setMaestros]=useState();
const[daMaestro,setMaestro]=useState([]);
const[daClases,setClases]=useState([]);
const[daClases2,setClases2]=useState([]);
const[daClase,setClase]=useState([]);
const[leccionesDate,setleccDate]=useState([]);
const[leccionesDate2,setleccDate2]=useState([]);
const[daLeccion,setLeccion]=useState('');
const[progresoTool,setProgresotool]=useState(false);
const[tipoTool,setTipo]=useState('');
const[progresoTipo,setProgresoTipo]=useState(false)
const[loadinglogo,setLoadinglogo]=useState(false);
const[statusmock,setStatusmock]=useState("");
const[mondays,setMondays]=useState([])
const[arrres,setArrres]=useState([])
const[daGrupos,setGrupos]=useState([])
const[grupo,setGrupo]=useState([])
const[daExamenes,setExamenes]=useState([])
const[daExamrealizados,setExamrealizados]=useState([])

console.log("roollllll",rol)
console.log("daCuenta",daCuenta)
console.log("daExameness",daExameness)


useEffect(()=>{
    setExamenes(daExameness);
    setExamrealizados(daExamrealizadoss)
    if(rol===3){
        getDataCuenta(null)
    }
},[daCuenta])
const getDataCuenta=datEmCuent=>{

    if(rol==3 || rol==2){
    dataGrupos= daGruposs.filter(i=>i.ID_ESCUELA===daCuenta.ID_ESCUELA)        
       setGrupos(dataGrupos)
        console.log("datagruposcontext",dataGrupos)
    }
    if(datEmCuent!==null){
       getDataEscuela();
    }else{
      
        const estudiantesIdescuela=daEstudiantess.filter(function(item){
            return item.ID_ESCUELA==daEscuela.ID;
         });
         const maestrosIdescuela=daMaestross.filter(function(item){
             return item.ID_ESCUELA==daEscuela.ID;
         })     
         setEstudiantes(estudiantesIdescuela);
    setMaestros(maestrosIdescuela);
    
    }
   
}    
const getDataEscuela=()=>{
    
    dataEscuela=dataEscuelas.find(({ID})=>ID===daCuenta.ID_ESCUELA);
    console.log("DESCUELA",dataEscuela)
    const estudiantesIdescuela=daEstudiantess.filter(function(item){
       return item.ID_ESCUELA==dataEscuela.ID;
    });
    const maestrosIdescuela=daMaestross.filter(function(item){
        return item.ID_ESCUELA==dataEscuela.ID;
    })
    dataGrupos= daGruposs.filter(i=>i.ID_ESCUELA===daCuenta.ID_ESCUELA)
    console.log("daGrupos",dataGrupos)
    setGrupos(dataGrupos)
    setEstudiantes(estudiantesIdescuela);
    setMaestros(maestrosIdescuela);
    setEscuela(dataEscuela);
    setLoading(false);

    return daEscuela;
}
const setIdEstudiante=id=>{ 
setEstudiante(daEstudiantes.find(item=>item.ID===id))
}

const setIdMaestro=id=>{
setMaestro(daMaestros.find(item=>item.ID===id))
}
const setIdGrupo=id=>{
    console.log("ID",id)
    console.log("GRUPOS",daGrupos)
    setGrupo(daGrupos.find(item=>item.ID===id))
}

const setEmaCuenta=ema=>{
    setEmailCuenta(ema);
}
const cambCuentas=cuent=>{
    console.log("cuencontx:",cuent)
    setCuentas(cuent)
}
const cambiarEsta=esta=>{
    estaMenu=esta
    setEsta(esta);
}

    return(
        <InfoContext.Provider
        value={{
            //da:EstDa(),
            daCuen:CuentDa(),
            cambiarEsta:cambiarEsta,
            estaMenu:estaMenu,
            rol,
            setRol,
            rolAdmin:rol,
            esta,setEsta,
            setCuentaEmail,cuentEmail,
            getDataCuenta,
            setEmaCuenta,
            cambCuentas,
            getDataEscuela,
            setIdEstudiante,
            setIdMaestro,
            setIdGrupo,
            daMaestross,
            daEscuela,setEscuela,
            daCuenta,setCuenta,
            loading,setLoading,
            daCuentas,setCuentas,
            daEstudiantes,setEstudiantes,
            dataChange,setDatachange,
            daEscuelas,setEscuelas,
            daEstudiante,setEstudiante,
            daMaestros,setMaestros,
            daMaestro,setMaestro,
            daClases,setClases,
            daClases2,setClases2,
            daClase,setClase,
            leccionesDate,setleccDate,
            leccionesDate2,setleccDate2,
            daLeccion,setLeccion,
           progresoTool,setProgresotool,
           progresoTipo,setProgresoTipo,
           tipoTool,setTipo,
           loadinglogo,setLoadinglogo,
           emailCuenta,
           statusmock,setStatusmock,
           mondays,setMondays,
           arrres,setArrres,
           daGrupos,setGrupos,
           grupo,setGrupo,
           daExameness,
           daExamenes,setExamenes,
           daExamrealizados,setExamrealizados
        }}
        >
            {props.children}

        </InfoContext.Provider>
    );
}
export const InfoConsumer=InfoContext.Consumer;