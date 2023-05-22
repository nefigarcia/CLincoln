import React  from 'react';

import './App.css';
import Menu from './Templates/Menu';
import Regestudiante from './Paginas/Regestudiante';
import Inicio from './Paginas/Inicio';
import Registros from './Paginas/Registros';
import PreRegistros from './Paginas/PreRegistros';
import {Routes, Route} from 'react-router-dom';
import Login from './Paginas/Login';
import Signup from './Paginas/Signup';
import Activacion from './Paginas/Activacion';
import PreinicioEscuela from './Paginas/PreinicioEscuela';


function App() {
  return (
    <div>
      <Menu/>
      <Routes>
       <Route exact path='/' element={<Inicio/>} />
       <Route path='/Regestudiante' element={<Regestudiante/>}/>
       <Route path='/Registros' element={<Registros/>}/>
       <Route path='/PreRegistros' element={<PreRegistros/>}/>
       <Route/>
       <Route path='/Login' element={<Login/>}/>
       <Route path='/Signup' element={<Signup/>}/>
       <Route path='/Activacion' element={<Activacion/>}/>
       <Route path='/Escuela' element={<PreinicioEscuela/>}/>

      </Routes>
    </div>
  );
}

export default App;
