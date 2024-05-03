import './agregarObservacion.css';
import Navbar from "../components/Navbar";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const AgregarObservacion = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {usuario, observation} = state || {};


    const volver = () =>{
        navigate("/homeProfe", {state: {usuario}});
    }


    const submitModify = async (e) => {
        navigate("/homeProfe", {state: {usuario}});
    }
    return (       
        <div className="principal">
            <form >
                <Navbar id={usuario.firstname} apellido={usuario.firstLastname}/>
                <h2>Observación</h2>

                <h4>Escriba su observación</h4>
                <div className="input-box">
                    <input type="text" value={observation.text} required />
                </div>

                <button onClick={volver}>Volver</button>
                <button onClick={submitModify}>Guardar observación</button>

            </form>

        </div>
        
    );
}

export default AgregarObservacion;