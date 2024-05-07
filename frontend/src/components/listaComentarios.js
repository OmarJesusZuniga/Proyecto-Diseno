import React, { useEffect, useState } from "react";
import "./listaComentarios.css"
import InfoComentario from "./infoComentarios";
import axios from 'axios';

const ListaObservaciones = ({ commentIDList, usuario , todosFalse, sAgregarComentarios }) => {
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            
            const promises = commentIDList.map(id =>
                axios.get(`http://localhost:4000/api/comment/${id}`)
            ).catch(err => {
                console.error(`Error fetching comment `, err);
                return null; // Return null or some error indication for individual failed requests
            });
            const responses = await Promise.all(promises);
            const data = responses.filter(response => response !== null).map(res => res.data);
            setComentarios(data);
            
        };

        fetchData();
    }, [commentIDList]); // Ensure useEffect runs when observationIDList changes

    return ( 
        <div className="listaComentarios">

            <h2>Comentarios de la observación</h2>
            

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
