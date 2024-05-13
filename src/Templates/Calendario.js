import React, { useContext,useCallback } from "react";
import { Calendar, dateFnsLocalizer,Views,momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { InfoContext } from "../context";
import moment from "moment";

const localizer = momentLocalizer(moment);
const allViews=Object.keys(Views).map((k) => Views[k]);

export const Calendario=()=>{
    const{leccionesDate}=useContext(InfoContext);
    const handleSelectEvent = useCallback(
        (event) => window.alert(" Inicio "+event.start+" Finaliza "+event.end),
        []
      )
    const re=leccionesDate.map(item=>{
        return {start:item.FECHA,end:item.FECHA2, title:item.NOMBRE.slice(0,4)+" "+item.NIVEL}
    })  
    return(
        <div className="App">{console.log("lecc",leccionesDate)}
        <Calendar
          localizer={localizer}
          events={re}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          views={allViews}
          showMultiDayTimes
          popup={true}
          onSelectEvent={handleSelectEvent}
  
        />
      </div>
    );
}