import { useState, useEffect } from "react";

//const fetchUrl="https://shielded-brushlands-89617.herokuapp.com/Estudiantes";
const fetchUrl="http://localhost:3001/Estudiantes";
//"https:shielded-brushlands-89617.herokuapp.com/Estudiantes";//"http://localhost:3001/Estudiantes";
const getEst=()=>fetch(fetchUrl).then(res=>res.json());


export default function EstDa(url){
    const [da,setDa]=useState([]);
    useEffect(()=>{
      
            getEst().then(data=>setDa(data));
       
    },[]); return da;
}