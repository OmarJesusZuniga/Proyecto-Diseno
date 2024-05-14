import React, { useEffect, useState } from "react";
import "./listaObservaciones.css"
import InfoObservacion from "./infoObservaciones";
import axios from 'axios';

const ListaObservaciones = ({ idActivity, usuario , sAgregarObservacion, todosFalse, observationId, listaComentarios , returnPage}) => {
    const [observaciones, setObservaciones] = useState([]);
    console.log("idActivity")
    console.log(idActivity)
    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const response = await axios.get("http://localhost:4000/api/activity/" + idActivity );
                
                setObservaciones(response.data.observations);

            } catch (error) {
                console.log(error.message)
            }            
        };

        fetchData();
    }, []); 

    const agregarObservacion = () => {
        todosFalse();
        sAgregarObservacion(true);
    }

    const volver = () => {
        todosFalse(); 
        returnPage(true);
    }

    return ( 
        <div className="listaObservaciones">

            <h2>Observaciones de la actividad</h2>
            <div className="botonesListaObservaciones">
                <button onClick={volver}>Volver</button>
                <button onClick={agregarObservacion}>Agregar observación</button>
            </div>

            {observaciones && observaciones.map((observacion) => (
                <InfoObservacion 
                    observacion={observacion} 
                    todosFalse={todosFalse}
                    observationId={observationId}
                    listaComentarios={listaComentarios}
                />
            ))}
        </div>
    );
}

export default ListaObservaciones;
