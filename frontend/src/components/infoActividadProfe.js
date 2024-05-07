import "../components/infoActividad.css"
import { useState, useEffect } from "react";

const InfoActividadProfe = ( {actividad, todosFalse, sO , setObservationIDList} ) => {

    const dejarObservaciones = async (e) => {
        setObservationIDList(actividad.observations)
        todosFalse();
        sO(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log(actividad)
        };

        fetchData();
    }, []);

    return(
        <div className="cartaActividad">
            <h2>{actividad.name}</h2>
            <h3>Semana #{actividad.week}</h3>
            
            <div>
                <h4>Tipo: </h4>
                <h5>{actividad.type}</h5>
            </div>

            <div>
                <h4>Fecha/hora:</h4>
                <h5>{actividad.programmedDate} a las {actividad.programmedHour}</h5>
            </div>

            <div className="cartaActividad-Multiple">
                <h4>Responsable(s): </h4>
                {actividad.managers && actividad.managers.map((manager) => (
                    <h5>{manager}</h5>
                ))}
            </div>

            <div>
                <h4>Día de publicacion: </h4>
                <h5>{actividad.publishDate}</h5>
            </div>

            <div className="cartaActividad-Multiple">
                <h4>Días recordatorio: </h4>
                {actividad.reminders && actividad.reminders.map((reminder) => (
                    <h5>{reminder}</h5>
                ))}
            </div>

            <div>
                <h4>Modalidad: </h4>
                <h5>{actividad.modality}</h5>
            </div>

            <div>
                <h4>Enlace: </h4>
                <h5>{actividad.link}</h5>
            </div>

            <div>
                <h4>Afiche: </h4>
                <h5>{actividad.pdf}</h5>
            </div>

            <div>
                <h4>Estado: </h4>
                <h5>{actividad.state}</h5>
            </div>

            <button onClick={dejarObservaciones}> Observaciones </button>

        </div>
        
    );
}
 
export default InfoActividadProfe;