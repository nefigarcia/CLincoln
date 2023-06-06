import { useState, useEffect } from "react";


const getEst=()=>fetch("http://localhost:3001/Estudiantes").then(res=>res.json());
//const getEst=()=>fetch("https://shielded-brushlands-89617.herokuapp.com/Estudiantes").then(res=>res.json());



export function EstDa(){
    const [da,setDa]=useState([]);
    useEffect(()=>{
      
            getEst().then(data=>setDa(data));
       
    },[]); return da;
}
