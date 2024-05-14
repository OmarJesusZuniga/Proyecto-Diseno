import './agregarComentario.css';
import React, { useState } from 'react';
import axios from 'axios';

const AgregarComentario = ({ usuario, idObservation, todosFalse, returnPage }) => {
    const [comentario, setComentario] = useState("");

    
    const submitModify = async (e) => {
        
        e.preventDefault(); 
        console.log(comentario); 

        try {
            console.log("idObservation")
            console.log(idObservation)
            const response = await axios.post("http://localhost:4000/api/comment/", { text: comentario, professor: usuario, idObservation: idObservation });
            console.log(response)

        } catch (error) {
            console.log("Error agregarComentario")
            console.error('Error fetching data:', error);
        }
        volver()
       
    }

    const volver = () => {
        todosFalse(); 
        returnPage(true);
    }

    const handleInputChange = (e) => {
        setComentario(e.target.value);
    };

    return (       
        <div className="agregarComentario">
        
            <h2>Agregar Comentario</h2>
            <button onClick={volver} className='botonVolverComentario'>Volver</button>

            <h4>Escriba su comentario</h4>
                
            <textarea className="textBoxComentario" onChange={handleInputChange} placeholder={"comentario"} required />
                

            <button onClick={submitModify} className='botonGuardarComentario'>Guardar comentario</button>


        </div>
        
    );
}

export default AgregarComentario;