import './agregarObservacion.css';
import React, { useState } from 'react';
import axios from 'axios';

const AgregarObservacion = ({ usuario }) => {
    const [observacion, setObservacion] = useState("");

    
    const submitModify = async (e) => {
        e.preventDefault(); 
        console.log(observacion); 
        
        try {

            const response = await axios.post("http://localhost:4000/api/observation/", { text: observacion, user: usuario });
            console.log(response)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleInputChange = (e) => {
        setObservacion(e.target.value);
    };

    return (       
        <div className="principal">
            <div className="contenedorListas">
                <h2>Agregar Observación</h2>

                <h4>Escriba su observación</h4>
                    <div className="input-box">
                        <input type="text" onChange={handleInputChange} value={"observacion.text"} required />
                    </div>

                <button onClick={submitModify}>Guardar observación</button>
            </div>

        </div>
        
    );
}

export default AgregarObservacion;