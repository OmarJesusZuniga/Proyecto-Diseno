import './agregarObservacion.css';
import React from 'react';
import { useLocation } from "react-router-dom";

const AgregarObservacion = () => {
    const {state} = useLocation();
    const {usuario, observation} = state || {};

    const submitModify = async (e) => {
        
    }
    return (       
        <div className="principal">
            <div className="contenedorListas">
                <h2>Observación</h2>

                <h4>Escriba su observación</h4>
                    <div className="input-box">
                        <input type="text" value={"observation.text"} required />
                    </div>

                <button onClick={submitModify}>Guardar observación</button>
            </div>

        </div>
        
    );
}

export default AgregarObservacion;