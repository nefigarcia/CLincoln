import React,{Component, useState,useEffect} from 'react';
import EstDa from './Gets';
const InfoContext=React.createContext();

export const InfoProvider=props=>{
    var estaMenu='True';
    
const[esta,setEsta]=useState([]);

const cambiarEsta=esta=>{
    setEsta(esta);
}
const cambiarEst=est=>{
    setEsta(est);
    return esta;
}
    return(
        <InfoContext.Provider
        value={{
            da:EstDa("http://localhost:3001/Estudiantes"),//("https://shielded-brushlands-89617.herokuapp.com/Estudiantes")
            cambiarEsta:cambiarEsta,
            estaMenu:estaMenu
        }}
        >
            {props.children}

        </InfoContext.Provider>
    );
}
export const InfoConsumer=InfoContext.Consumer;