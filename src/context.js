import React,{Component, useState,useEffect, useContext,createContext} from 'react';
import {EstDa,CuentDa, EscuelasDa} from './Gets';
//const InfoContext=React.createContext();

export const InfoContext = createContext();
export const InfoProvider=props=>{
    var emailCuentav;
    var estaMenu='True';
    var dataCuentas=CuentDa();
    var dataEscuelas=EscuelasDa();
    var dataEscuela=[];
    var dataCuenta=[];
const [ban,setBan]=useState(0);
const[esta,setEsta]=useState(false);
const[rol,setRol]=useState('');
const[cuentEmail,setCuentaEmail]=useState('');
const[daCuenta,setCuenta]=useState([]);
const[daEscuela,setEscuela]=useState([]);
const[emailCuenta,setEmailCuenta]=useState('');//email del usuario
const[loading,setLoading]=useState(true);
const[daCuentas,setCuentas]=useState([]);
const[daEstudiantes,setEstudiantes]=useState([]);
const[dataChange,setDatachange]=useState(false);




    console.log("renderingContext:");


const getDataCuenta=datEmCuent=>{
    console.log("datfromlog",datEmCuent);
    if(datEmCuent!==null){
       getDataEscuela();
    }else{
        console.log("aftergetDataCeunta",emailCuenta)
        console.log("aftedataCuentas",dataCuentas)

        dataCuenta=dataCuentas.find(({EMAIL})=>EMAIL===emailCuenta);
        console.log("cuenta1",dataCuenta);

        setCuenta(dataCuenta);
        getDataEscuela();
    }
   
}    
const getDataEscuela=()=>{
    console.log("dataEscuelas",dataEscuelas)

    dataEscuela=dataEscuelas.find(({ID})=>ID===daCuenta.ESCUELA_ID);
    console.log("daEscuelaLogin2",dataEscuela);

    setEscuela(dataEscuela);
    setLoading(false);

    return daEscuela;
}
const setEmaCuenta=ema=>{
    setEmailCuenta(ema);
}

const cambiarEsta=esta=>{
    estaMenu=esta
    setEsta(esta);
    console.log("menuEsta=",esta);
}
    return(
        <InfoContext.Provider
        value={{
            da:EstDa(),
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
            getDataEscuela,
            daEscuela,
            daCuenta,setCuenta,
            loading,setLoading,
            daCuentas,setCuentas,
            daEstudiantes,setEstudiantes,
            dataChange,setDatachange
        }}
        >
            {props.children}

        </InfoContext.Provider>
    );
}
export const InfoConsumer=InfoContext.Consumer;