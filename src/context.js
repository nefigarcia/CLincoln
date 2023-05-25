import React,{Component, useState,useEffect, useContext,createContext} from 'react';
import {EstDa} from './Gets';
//const InfoContext=React.createContext();

const InfoContext = createContext({
    esta: null,
    setEsta: () => {},
    rol: null,
  });
  export const useAuth=()=>useContext(InfoContext);
export const InfoProvider=props=>{
    var estaMenu='True';
    var rolAdmin='';
const[esta,setEsta]=useState(false);
const[rol,setRol]=useState('');

 const[cuentEmail,setCuentaEmail]=useState('');

    console.log("funcion",rol);
    console.log("cuentUsuContext:",cuentEmail);

    

const cambiarEsta=esta=>{
    estaMenu=esta
    setEsta(esta);
    console.log("menuEsta=",esta);
}
    return(
        <InfoContext.Provider
        value={{
            da:EstDa(),
         cambiarEsta:cambiarEsta,
            estaMenu:estaMenu,
            rol,
            setRol,
            rolAdmin:rol,
            esta,setEsta,
            setCuentaEmail,cuentEmail
        }}
        >
            {props.children}

        </InfoContext.Provider>
    );
}
export const InfoConsumer=InfoContext.Consumer;