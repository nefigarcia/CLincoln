import React,{Component} from "react";

import Rectangle_3 from '../Fotos/Rectangle_3.jpg';
import Rectangle_4 from '../Fotos/Rectangle_4.jpg';
import Rectangle_5 from '../Fotos/Rectangle_5.png';
import Hero from "../components/Hero";
import Step from "../components/Step";
import BottomLead from "../components/BottomLead";

import { InfoConsumer } from "../context";

 function Inicio(){
    const data = {
        hero:{
          appType: 'Sistema Administrativo Escolar',
          tagLine: 'Por qué no registrar tu escuela?',
          description: 'Disfruta de todas las herramientas de Rosystems',
          mainActionText: 'Contacto',
          extraActionText: 'Cotizacion',
        },
        step1: {
          title: 'Crea una cuenta',
          heading: 'Crea/login(ingresa) a alguna cuenta existente',
          description: 'Una cuenta es creada con email y contraseña',
          img: Rectangle_3,
          alternate: false,
        },
        step2: {
          title: 'Explora las herramientas',
          heading: 'Facilidad para administrar tu escuela',
          description: 'Crea registros de maestros, materias, estudiantes, pagos y más',
          img: Rectangle_4,
          alternate: true,
        },
        step3: {
          title: 'Todo en uno',
          heading: "Guarda tus registros en una cuenta administrativa",
          description: "Puedes compartir roles y hacer logout a salvo",
          img: Rectangle_5,
          alternate: false,
        },
        bottomLead: {
          actionText: 'No se requiere instalar nada',
          description: 'Disponible todo el tiempo',
          mainActionText: 'Contacto',
          extraActionText: 'Soporte',
        },
      }
      return (
        // __________________________TODO: ____________________
        // Add Montserrat font to everything (body)
        
        <div className="box-border">
          <div className="flex flex-col">
            <Hero 
              appType={data.hero.appType}
              tagLine={data.hero.tagLine}
              description={data.hero.description}
              mainActionText={data.hero.mainActionText}
              extraActionText={data.hero.extraActionText}
            />
            
            <div id="divider" className="rounded-full ring-2 ring-gray-200 lg:w-1/2 lg:mx-auto "></div>
            
            <div id="faq" className="pt-20 mb-20 text-3xl font-semibold text-center text-blue-800 lg:font-bold">Cómo éste sistema trabaja </div>
            
            <Step
              title={data.step1.title}
              heading={data.step1.heading}
              description={data.step1.description}
              img={data.step1.img}
              alternate={data.step1.alternate}
              />
              <Step
              title={data.step2.title}
              heading={data.step2.heading}
              description={data.step2.description}
              img={data.step2.img}
              alternate={data.step2.alternate}
              />
              <Step
              title={data.step3.title}
              heading={data.step3.heading}
              description={data.step3.description}
              img={data.step3.img}
              alternate={data.step3.alternate}
              />
              
              <BottomLead 
                actionText={data.bottomLead.actionText}
                description={data.bottomLead.description}
                mainActionText={data.bottomLead.mainActionText}
                extraActionText={data.bottomLead.extraActionText}
              />
          </div>
        </div>
      );
 }
 export default Inicio;