import { useState, useEffect } from "react";

//const fetchUrl="https://shielded-brushlands-89617.herokuapp.com/Estudiantes";
//const fetchUrl="http://localhost:3001/Estudiantes";


const getEst=()=>fetch("http://localhost:3001/Estudiantes").then(res=>res.json());

const getCuen=(EstCuent)=>fetch("http://localhost:3001/Cuentas",EstCuent).then(res=>res.json());


export function EstDa(){
    const [da,setDa]=useState([]);
    useEffect(()=>{
      
            getEst().then(data=>setDa(data));
       
    },[]); return da;
}

export function EstCuent(EstCuent){
    const [da,setDa]=useState([]);
    useEffect(()=>{
      
            getCuen(EstCuent).then(data=>setDa(data));
       
    },[]); return da;
}