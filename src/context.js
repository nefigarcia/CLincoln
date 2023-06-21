import React,{Component, useState,useEffect, useContext,createContext} from 'react';
import {EstDa,CuentDa, EscuelasDa} from './Gets';
//const InfoContext=React.createContext();

export const InfoContext = createContext();
export const InfoProvider=props=>{
    var estaMenu='True';
    var dataEscuelas=EscuelasDa();
    var dataEscuela=[];
    var dataCuenta=[];
    var daEstudiantess=EstDa();
const[esta,setEsta]=useState(false);
const[rol,setRol]=useState('');
const[cuentEmail,setCuentaEmail]=useState('');
const[daCuenta,setCuenta]=useState([]);
const[daEscuela,setEscuela]=useState([]);
const[daEscuelas,setEscuelas]=useState([]);
const[emailCuenta,setEmailCuenta]=useState('');//email del usuario
const[loading,setLoading]=useState(true);
const[daCuentas,setCuentas]=useState([]);
const[daEstudiantes,setEstudiantes]=useState(daEstudiantess);
const[dataChange,setDatachange]=useState(false);

    console.log("renderingContext:",daCuentas);
    console.log("renderingContextEmail:",emailCuenta);


const getDataCuenta=datEmCuent=>{
    setEstudiantes(daEstudiantess)
    console.log("datfromlog",datEmCuent);
    console.log("datCuentasfromlog",daCuentas);

    if(datEmCuent!==null){
       getDataEscuela();
    }else{
        console.log("aftergetDataCeunta",emailCuenta)

        dataCuenta=daCuentas.find(({EMAIL})=>EMAIL===emailCuenta);

        setCuenta(dataCuenta);

        dataEscuela=dataEscuelas.find(({ID})=>ID===daCuenta.ESCUELA_ID);
        setEscuela(dataEscuela);

        setLoading(true);
        console.log("cuenta1",dataCuenta);

        //getDataEscuela();
    }
   
}    
const getDataEscuela=()=>{
    console.log("emailUseContextREges",emailCuenta)
    dataEscuela=dataEscuelas.find(({ID})=>ID===daCuenta.ESCUELA_ID);
        console.log("daEscuelaLogin2",dataEscuela);

    console.log("daEscuelaLogin2",dataEscuela);
    console.log("daEStudian",daEstudiantes);

    setEscuela(dataEscuela);
    setLoading(false);

    return daEscuela;
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
            daEscuela,
            daCuenta,setCuenta,
            loading,setLoading,
            daCuentas,setCuentas,
            daEstudiantes,setEstudiantes,
            dataChange,setDatachange,
            daEscuelas,setEscuelas
        }}
        >
            {props.children}

        </InfoContext.Provider>
    );
}
export const InfoConsumer=InfoContext.Consumer;