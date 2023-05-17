import React  from 'react';

import './App.css';
import Menu from './Templates/Menu';
import Regestudiante from './Paginas/Regestudiante';
import Inicio from './Paginas/Inicio';
import Registros from './Paginas/Registros';
import PreRegistros from './Paginas/PreRegistros';
import {Routes, Route} from 'react-router-dom';
import PreLogin from './Paginas/PreLogin';
import Signup from './Paginas/Signup';
import Activacion from './Paginas/Activacion';


function App() {
  return (
    <div>
      <Menu/>
      <Routes>
       <Route exact path='/' element={<Inicio/>} />
       <Route path='/Regestudiante' element={<Regestudiante/>}/>
       <Route path='/Registros' element={<Registros/>}/>
       <Route path='/PreRegistros' element={<PreRegistros/>}/>
       <Route path='/PreLogin' element={<PreLogin/>}/>
       <Route path='/Signup' element={<Signup/>}/>
       <Route path='/Activacion' element={<Activacion/>}/>
      </Routes>
    </div>
  );
}

export default App;
