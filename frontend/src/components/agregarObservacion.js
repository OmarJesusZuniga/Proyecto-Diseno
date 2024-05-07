import './agregarObservacion.css';
import React, { useState } from 'react';
import axios from 'axios';

const AgregarObservacion = ({ usuario, todosFalse, returnPage, idActivity}) => {
    const [observacion, setObservacion] = useState("");

    
    const guardarObservacion = async (e) => {
        e.preventDefault(); 
        console.log(observacion); 

        try {
            const id = idActivity[0]
            const response = await axios.post("http://localhost:4000/api/observation/", { text: observacion, professor: usuario, idActivity: id });
            console.log(response)

        } catch (error) {
            console.error('Error fetching data:', error);
        }

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