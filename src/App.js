import React, { useContext }  from 'react';
import './App.css';
import Menu from './Templates/Menu';
import Regestudiante from './Paginas/Regestudiante';
import Inicio from './Paginas/Inicio';
import {Registros} from './Paginas/Registros';
import PreRegistros from './Paginas/PreRegistros';
import {Routes, Route,Router,Switch, Navigate} from 'react-router-dom';
import Login from './Paginas/Login';
import Signup from './Paginas/Signup';
import Activacion from './Paginas/Activacion';
import PreinicioEscuela from './Paginas/PreinicioEscuela';
import RegEscuela from './Paginas/RegEscuela';
import Fotter from './Templates/Fotter';
import { InfoContext, useAuth } from './context';
import RegClase from './Paginas/RegClase';
import RegMaestro from './Paginas/RegMaestro';
import Perfmaestro from './Paginas/PerfMaestro';
import Perfestudiante from './Paginas/PerfEstudiante';
import Ajustes from './components/Ajustes';
import { Clases, Modalleccion, Perfclase } from './Paginas/Clases';
import { Calendario } from './Templates/Calendario';
import {ProtectedRoute} from './components/ProtectedRoute';
import {IniEstudiante} from './components/IniEstudiante';
import Perfgrupo from './Paginas/PerfGrupo';


function App() {
  const{esta}=useContext(InfoContext)
  return (
    <div>
      
      <Menu/>
      <Routes>
       <Route exact path='/' element={<Inicio/>} />
       <Route path='/Regestudiante' element={esta ? <Regestudiante/>: <Navigate to={'/'}/>}/> 
       <Route path='/Registros' element={esta ? <Registros/>: <Navigate to={'/'}/>}/> 
       <Route path='/PreRegistros' element={esta ? <PreRegistros/>: <Navigate to={'/'}/>}/> 
       <Route/>
       <Route path='/Login' element={<Login/>}/>
       <Route path='/Signup' element={<Signup/>}/>
       <Route path='/Activacion' element={<Activacion/>}/>
       <Route path='/Escuela' element={esta ? <PreinicioEscuela/> : <Navigate to={'/'}/>}/>
       <Route path='/Regescuela' element={<RegEscuela/> }/> 
       <Route path='/Regclase' element={esta ?<RegClase/>  : <Navigate to={'/'}/>}/> 
       <Route path='/Regmaestro' element={esta ? <RegMaestro/>: <Navigate to={'/'}/>}/> 
       <Route path='/Perfmaestro' element={esta ? <Perfmaestro/> : <Navigate to={'/'}/>}/> 
       <Route path='/Perfestudiante' element={esta ? <Perfestudiante/>: <Navigate to={'/'}/>}/> 
       <Route path='/Perfgrupo' element={esta ?<Perfgrupo/>: <Navigate to={'/'}/>}/> 
       <Route path='/Ajustes'element={esta ? <Ajustes/>: <Navigate to={'/'}/>}/> 
       <Route path='/Clases' element={esta ? <Clases/>: <Navigate to={'/'}/>}/> 
       <Route path='/Perfclase' element={esta ? <Perfclase/>: <Navigate to={'/'}/>}/> 
       <Route path='/Calendario' element={esta ? <Calendario/>: <Navigate to={'/'}/>}/> 
       <Route path='/Modalleccion' element={esta ? <Modalleccion/>: <Navigate to={'/'}/>}/> 
       <Route path='/IniEstudiante' element={esta ? <IniEstudiante/>: <Navigate to={'/'}/>}/> 
      </Routes>
      <Fotter/>
    </div>
  );
}

export default App;
