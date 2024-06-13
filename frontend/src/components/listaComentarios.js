
import React, { useEffect, useState } from "react";
import "./listaComentarios.css";
import InfoComentario from "./infoComentarios";
import ObservationFacade from '../PatronFacade/ObservacionFacade';

const ListaObservaciones = ({ idObservation, usuario, todosFalse, sAgregarComentarios, returnPage }) => {
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
                const data = await ObservationFacade.fetchObservation(idObservation);
                setComentarios(data.comments);
            } catch (error) {
                console.log({ error: error.message });
            }
        };

        fetchData();
    }, [idObservation]);

    return (
        <div className="listaComentarios">
            <h2>Comentarios de la observación</h2>
            <div className="botonesListaComentarios">
                <button onClick={volver}>Volver</button>
                <button onClick={agregarComentario} className="btnAgregarComentario">Agregar comentario</button>
            </div>

            {comentarios.length > 0 && comentarios.map((comentario) => (
                <InfoComentario
                    key={comentario._id}
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
