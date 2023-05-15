import React,{Component, useState,useEffect} from 'react';
import EstDa from './Gets';
const InfoContext=React.createContext();

export const InfoProvider=props=>{
    

    return(
        <InfoContext.Provider
        value={{
            da:EstDa("https://shielded-brushlands-89617.herokuapp.com/Estudiantes")//("https://shielded-brushlands-89617.herokuapp.com/Estudiantes")
        }}
        >
            {props.children}

        </InfoContext.Provider>
    );
}
export const InfoConsumer=InfoContext.Consumer;