import React  from 'react';

import './App.css';
import Menu from './Templates/Menu';
import Regestudiante from './Paginas/Regestudiante';
import Inicio from './Paginas/Inicio';
import {Registros} from './Paginas/Registros';
import PreRegistros from './Paginas/PreRegistros';
import {Routes, Route} from 'react-router-dom';
import Login from './Paginas/Login';
import Signup from './Paginas/Signup';
import Activacion from './Paginas/Activacion';
import PreinicioEscuela from './Paginas/PreinicioEscuela';
import RegEscuela from './Paginas/RegEscuela';
import Fotter from './Templates/Fotter';
import { useAuth } from './context';
import RegClase from './Paginas/RegClase';
import RegMaestro from './Paginas/RegMaestro';
import Perfmaestro from './Paginas/PerfMaestro';
import Perfestudiante from './Paginas/PerfEstudiante';
import Ajustes from './components/Ajustes';
import { Clases, Modalleccion, Perfclase } from './Paginas/Clases';
import { Calendario } from './Templates/Calendario';


function App() {
  //const { auth } = useAuth();
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
       <Route path='/Regescuela' element={<RegEscuela/>}/>
       <Route path='/Regclase' element={<RegClase/>}/>
       <Route path='/Regmaestro' element={<RegMaestro/>}/>
       <Route path='/Perfmaestro' element={<Perfmaestro/>}/>
       <Route path='/Perfestudiante' element={<Perfestudiante/>}/>
       <Route path='/Ajustes'element={<Ajustes/>}/>
       <Route path='/Clases' element={<Clases/>}/>
       <Route path='/Perfclase' element={<Perfclase/>}/>
       <Route path='/Calendario' element={<Calendario/>}/>
       <Route path='/Modalleccion' element={<Modalleccion/>}/>

      </Routes>
      <Fotter/>
    </div>
  );
}

export default App;
