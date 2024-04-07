import { useState, useEffect } from "react";

const apiUrl=process.env.REACT_APP_API;

//const getEst=(id)=>fetch("http://localhost:3001/Estudiantes").then(res=>res.json());
const getEst=()=>fetch(apiUrl+`/Estudiantes`).then(res=>res.json());

//const getCuent=()=>fetch("http://localhost:3001/Cuentas").then(res=>res.json());
const getCuent=()=>fetch(apiUrl+`/Cuentas`).then(res=>res.json());


//const getEscuelas=()=>fetch("http://localhost:3001/Escuelas").then(res=>res.json());
const getEscuelas=()=>fetch(apiUrl+`/Escuelas`).then(res=>res.json());

//const getMaestros=()=>fetch("http://localhost:3001/Maestros").then(res=>res.json());
const getMaestros=()=>fetch(apiUrl+`/Maestros`).then(res=>res.json());

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
export function MaestrosDa(){
    const [da,setDa]=useState([]);
    useEffect(()=>{
        getMaestros().then(data=>setDa(data))
    },[]); return da;
}