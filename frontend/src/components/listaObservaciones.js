import React, { useEffect, useState } from "react";
import "../components/listaObservaciones.css"
import InfoObservacion from "./infoObservaciones";
import axios from 'axios';

const ListaObservaciones = ({ idActivity, usuario , sAgregarObservacion, todosFalse, commentIDList }) => {
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

    return ( 
        <div className="listaObservaciones">

            <h2>Observaciones de la actividad</h2>
            <button onClick={agregarObservacion} className="btnAgregarObservacion">Agregar observación</button>

            {observaciones.length > 0 && observaciones.map((observacion) => (
                <InfoObservacion 
                    observacion={observacion} 
                    usuario={usuario}
                    todosFalse={todosFalse}
                    commentIDList={commentIDList}
                />
            ))}
        </div>
    );
}

export default ListaObservaciones;
