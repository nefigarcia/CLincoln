import React,{Component, useState,useEffect, useContext,createContext} from 'react';
import {EstDa,CuentDa, EscuelasDa, MaestrosDa} from './Gets';
//const InfoContext=React.createContext();

export const InfoContext = createContext();
export const InfoProvider=props=>{
    var estaMenu='True';
    var dataEscuelas=EscuelasDa();
    var dataEscuela=[];
    var dataCuenta=[];
    var daEstudiantess=EstDa();
    var daMaestross=MaestrosDa();
const[esta,setEsta]=useState(false);
const[rol,setRol]=useState('');
const[cuentEmail,setCuentaEmail]=useState('');
const[daCuenta,setCuenta]=useState([]);
const[daEscuela,setEscuela]=useState([]);
const[daEscuelas,setEscuelas]=useState([]);
const[emailCuenta,setEmailCuenta]=useState('');//email del usuario
const[loading,setLoading]=useState(true);
const[daCuentas,setCuentas]=useState([]);
const[daEstudiantes,setEstudiantes]=useState();
const[dataChange,setDatachange]=useState(false);
const[daEstudiante,setEstudiante]=useState([]);
const[daMaestros,setMaestros]=useState();
const[daMaestro,setMaestro]=useState([]);
const[daClases,setClases]=useState([]);
const[daClase,setClase]=useState([]);
const[leccionesDate,setleccDate]=useState([]);
const[daClasesdias,setClasesdias]=useState([]);
const[daLeccion,setLeccion]=useState('');



const getDataCuenta=datEmCuent=>{
    //setEstudiantes(daEstudiantess)
   // setMaestros(daMaestross)
    if(datEmCuent!==null){
       getDataEscuela();
    }else{
        dataCuenta=daCuentas.find(({EMAIL})=>EMAIL===emailCuenta);

        setCuenta(dataCuenta);
        console.log("daCuenta",daCuenta)
        dataEscuela=daEscuelas.find(({ID})=>ID===daCuenta.ESCUELA_ID);
        setEscuela(dataEscuela);
        console.log("daEScuela",dataEscuela)
        setEsta(true)
        setLoading(false);
        console.log("cuenta1",dataCuenta);
    }
   
}    
const getDataEscuela=()=>{
    
    dataEscuela=dataEscuelas.find(({ID})=>ID===daCuenta.ESCUELA_ID);
    const estudiantesIdescuela=daEstudiantess.filter(function(item){
       return item.ID_ESCUELA==dataEscuela.ID;
    });
    const maestrosIdescuela=daMaestross.filter(function(item){
        return item.ID_ESCUELA==dataEscuela.ID;
    })
    console.log("DAESC:",estudiantesIdescuela);
    setEstudiantes(estudiantesIdescuela);
    setMaestros(maestrosIdescuela);
    setEscuela(dataEscuela);
    setLoading(false);

    return daEscuela;
}

const setIdEstudiante=id=>{ 
    console.log("es",daEstudiante)
setEstudiante(daEstudiantes.find(item=>item.ID===id))
}

const setIdMaestro=id=>{
setMaestro(daMaestros.find(item=>item.ID===id))
console.log("ma",daMaestro)

}

const setEmaCuenta=ema=>{
    setEmailCuenta(ema);
}
const cambCuentas=cuent=>{
    console.log(cuent)
    setCuentas(cuent)
}
const cambiarEsta=esta=>{
    estaMenu=esta
    setEsta(esta);
    console.log("menuEsta=",esta);
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
            daMaestross,
            daEscuela,
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
            daClase,setClase,
            leccionesDate,setleccDate,
            daLeccion,setLeccion
           
        }}
        >
            {props.children}

        </InfoContext.Provider>
    );
}
export const InfoConsumer=InfoContext.Consumer;