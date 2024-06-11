import React, { useEffect, useState } from "react";
import "./listaComentarios.css"
import InfoComentario from "./infoComentarios";
import axios from 'axios';

const ListaObservaciones = ({ idObservation, usuario , todosFalse, sAgregarComentarios , returnPage}) => {
    const [comentarios, setComentarios] = useState([]);

    const agregarComentario = () => {
        todosFalse();
        sAgregarComentarios(true);
    }

    const volver = () => {
        todosFalse(); 
        returnPage(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/observation/" + idObservation );
                setComentarios(response.data.comments);
            } catch (error) {
                console.log({ error: error.message })
            }
        };
    
        fetchData();
    }, []); 
    
    return ( 
        <div className="listaComentarios">
            
            <h2>Comentarios de la observación</h2>
            <div className="botonesListaComentarios">
                <button onClick={volver}>Volver</button>
                <button onClick={agregarComentario} className="btnAgregarComentario">Agregar comentario</button>
            </div>

            {comentarios.length > 0 && comentarios.map((comentario) => (
                <InfoComentario 
                    comentario={comentario} 
                    usuario={usuario}
                    todosFalse={todosFalse}
                    sAgregarComentarios={sAgregarComentarios}
                />
            ))}
        </div>
    );
}

export default ListaObservaciones;
