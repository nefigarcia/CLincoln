import { useState, useEffect } from "react";


const getEst=()=>fetch("http://localhost:3001/Estudiantes").then(res=>res.json());
//const getEst=()=>fetch("https://shielded-brushlands-89617.herokuapp.com/Estudiantes").then(res=>res.json());

const getCuent=()=>fetch("http://localhost:3001/Cuentas").then(res=>res.json());

const getEscuelas=()=>fetch("http://localhost:3001/Escuelas").then(res=>res.json());

export function EstDa(){
    const [da,setDa]=useState([]);
    useEffect(()=>{
      
            getEst().then(data=>setDa(data));
       
    },[]); return da;
}

export function CuentDa(){
    const [da,setDa]=useState([]);
    useEffect(()=>{
       getCuent().then(data=>setDa(data));
    },[]); return da;
}

export function EscuelasDa(){
    const [da,setDa]=useState([]);
    useEffect(()=>{
        getEscuelas().then(data=>setDa(data))
    },[]); return da;
}