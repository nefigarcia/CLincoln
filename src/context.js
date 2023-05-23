import React,{Component, useState,useEffect, useContext,createContext} from 'react';
import EstDa from './Gets';
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

    console.log("funcion",rol);
  


const cambiarEsta=esta=>{
    estaMenu=esta
    setEsta(esta);
    console.log("menuEsta=",esta);
}
    return(
        <InfoContext.Provider
        value={{
           // da:EstDa("http://localhost:3001/Estudiantes"),//("https://shielded-brushlands-89617.herokuapp.com/Estudiantes")
            da:EstDa("https://shielded-brushlands-89617.herokuapp.com/Estudiantes"),
            cambiarEsta:cambiarEsta,
            estaMenu:estaMenu,
            rol,
            setRol,
            rolAdmin:rol,
            esta,setEsta
        }}
        >
            {props.children}

        </InfoContext.Provider>
    );
}
export const InfoConsumer=InfoContext.Consumer;