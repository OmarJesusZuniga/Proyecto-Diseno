import React, { useEffect, useState } from "react";
import "./listaComentarios.css"
import InfoComentario from "./infoComentarios";
import axios from 'axios';

const ListaObservaciones = ({ idObservation, usuario , todosFalse, sAgregarComentarios }) => {
    const [comentarios, setComentarios] = useState([]);

    const agregarComentario = () => {
        todosFalse();
        sAgregarComentarios(true);
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
            <button onClick={agregarComentario} className="btnCommentarios">Agregar comentario</button>

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
