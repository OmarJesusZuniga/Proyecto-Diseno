import './agregarObservacion.css';
import React, { useState } from 'react';
import axios from 'axios';

const AgregarComentario = ({ usuario }) => {
    const [comentario, setComentario] = useState("");

    
    const submitModify = async (e) => {
        e.preventDefault(); 
        console.log(observacion); 

        try {

            const response = await axios.post("http://localhost:4000/api/observation/", { text: comentario, user: usuario });
            console.log(response)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleInputChange = (e) => {
        setComentario(e.target.value);
    };

    return (       
        <div className="agregarComentario">
        
            <h2>Agregar Comentario</h2>

            <h4>Escriba su comentario</h4>
                <div className="inputBox">
                    <input type="text" onChange={handleInputChange} value={"comentario.text"} required />
                </div>

            <button onClick={submitModify} className='botonGuardarComentario'>Guardar observación</button>


        </div>
        
    );
}

export default AgregarComentario;