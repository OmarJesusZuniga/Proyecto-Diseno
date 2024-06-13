
import './agregarObservacion.css';
import React, { useState } from 'react';
import ObservationFacade from '../PatronFacade/ObservacionFacade';

const AgregarObservacion = ({ usuario, todosFalse, returnPage, idActivity }) => {
    const [observacion, setObservacion] = useState("");

    const guardarObservacion = async (e) => {
        e.preventDefault();
        console.log(observacion);

        try {
            console.log("idActivity");
            console.log(idActivity);
            const observationData = { text: observacion, professor: usuario, idActivity: idActivity };
            const response = await ObservationFacade.addObservation(observationData);
            console.log(response);
        } catch (error) {
            console.log("Error agregarObservacion");
            console.error('Error fetching data:', error);
        }
        volver();
    }

    const handleInputChange = (e) => {
        setObservacion(e.target.value);
    };

    const volver = () => {
        todosFalse();
        returnPage(true);
    }

    return (
        <div className="agregarObservacion">
            <div className="btnVolverContainer">
                <button onClick={volver} className='btnVolver'>Volver</button>
            </div>

            <h2>Agregar Observación</h2>

            <h4>Escriba su observación</h4>
            <textarea className="inputBoxObservacion" onChange={handleInputChange} placeholder={"Observacion"} required />

            <button onClick={guardarObservacion} className='botonGuardarObservacion'>Guardar observación</button>
        </div>
    );
}

export default AgregarObservacion;
