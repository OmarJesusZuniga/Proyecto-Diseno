
import "../components/infoObservaciones.css";
import moment from 'moment';  
import React, { useEffect, useState } from "react";
import ProfessorFacade from '../PatronFacade/ProfeFacade';

const InfoObservaciones = ({ observacion, todosFalse, observationId, listaComentarios }) => {
    const [professor, setProfessor] = useState([]);

    const verComentarios = () => {
        todosFalse();
        observationId(observacion._id);
        listaComentarios(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const professorData = await ProfessorFacade.fetchProfessor(observacion.professor);
                setProfessor(professorData);
            } catch (error) {
                console.log(error.message);
            }            
        };

        fetchData();
    }, [observacion.professor]);

    const formattedDate = moment(observacion.createdAt).format("MM/DD/YY HH:mm");

    return (
        <div className="cartaObservacion">
            <div className="infoEspecifica">
                <h2>{professor.email}</h2>
                <div>
                    <h3>Observación: </h3>
                    <h5>{observacion.text}</h5>
                </div>

                <div>
                    <h3>Fecha: </h3>
                    <h5>{formattedDate}</h5>
                </div>
                <button onClick={verComentarios} className="btnObservaciones">Comentarios</button>
            </div>
        </div>
    );
}

export default InfoObservaciones;
