import React, { useEffect, useState } from "react";
import "./listaComentarios.css"
import InfoComentario from "./infoComentarios";
import axios from 'axios';

const ListaObservaciones = ({ commentIDList, usuario , todosFalse, sAgregarComentarios }) => {
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = commentIDList.map(id =>
                    axios.get(`http://localhost:4000/api/comment/${id}`)
                );
                const responses = await Promise.all(promises);
                const data = responses.map(res => res.data);
                setComentarios(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [commentIDList]); // Ensure useEffect runs when observationIDList changes

    const agregarComentario = () => {
        todosFalse();
        sAgregarComentarios(true);
    }

    return ( 
        <div className="listaComentarios">

            <h2>Comentarios de la observación</h2>
            <button onClick={agregarComentario} className="btnAgregarComentario">Agregar comentario</button>

            {comentarios.length > 0 && comentarios.map((observacion, index) => (
                <InfoComentario 
                    observacion={observacion} 
                    key={index} 
                    usuario={usuario}
                />
            ))}
        </div>
    );
}

export default ListaObservaciones;
