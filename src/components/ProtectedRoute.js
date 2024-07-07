import { Route, Navigate } from "react-router-dom";
import React,{useContext} from 'react'
import { InfoContext } from "../context";

export const ProtectedRoute = (Component) => {
  const{daCuenta,esta}=useContext(InfoContext)
  console.log("DACU",esta)
    return esta ? <Component/> : <Navigate to={"/Login"}/>
}
  
