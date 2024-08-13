import { useState, useEffect } from "react";

const apiUrl=process.env.REACT_APP_API;

const getEst=()=>fetch(apiUrl+`/Estudiantes`).then(res=>res.json());

const getCuent=()=>fetch(apiUrl+`/Cuentas`).then(res=>res.json());

const getEscuelas=()=>fetch(apiUrl+`/Escuelas`).then(res=>res.json());

const getMaestros=()=>fetch(apiUrl+`/Maestros`).then(res=>res.json());

const getGrupos=()=>fetch(apiUrl+`/Grupos`).then(res=>res.json());

const getExamenes=()=>fetch(apiUrl+'/Examenes').then(res=>res.json());

const getExamrealizados=()=>fetch(apiUrl+'/Examrealizados').then(res=>res.json());

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
export function GruposDa(ID_ESCUELA){

    const [da,setDa]=useState([])
    useEffect(()=>{
        getGrupos(ID_ESCUELA).then(data=>setDa(data))
    },[]); return da;
}
export function ExamenesDa(){
    const [da,setDa]=useState([])
    useEffect(()=>{
        getExamenes().then(data=>setDa(data))
    },[]); return da
}
export function ExamrealizadosDa(){
    const[da,setDa]=useState([])
    useEffect(()=>{
        getExamrealizados().then(data=>setDa(data))
    },[]); return da
}