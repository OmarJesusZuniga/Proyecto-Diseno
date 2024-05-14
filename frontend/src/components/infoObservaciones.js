import "../components/infoObservaciones.css";
import moment from 'moment';  
import React, { useEffect, useState } from "react";
import axios from 'axios';

const InfoObservaciones = ({ observacion, todosFalse, observationId, listaComentarios }) => {
    const verComentarios = () => {
        console.log("observacion._id")
        console.log(observacion._id)
        todosFalse();
        
        observationId(observacion._id);
        listaComentarios(true);
    }

    const [professor, setProfessor] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const professorId = observacion.professor;
                const response = await axios.get("https://proyecto-diseno-ol06.onrender.com/api/professors/" + professorId );
                
                setProfessor(response.data);

            } catch (error) {
                console.log(error.message)
            }            
        };

        fetchData();
    }, []); 

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
