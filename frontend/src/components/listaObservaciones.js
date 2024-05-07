import React, { useEffect, useState } from "react";
import "../components/listaObservaciones.css"
import InfoObservacion from "./infoObservaciones";
import axios from 'axios';

const ListaObservaciones = ({ observationIDList, usuario }) => {
    const [observaciones, setObservaciones] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = observationIDList.map(id =>
                    axios.get(`http://localhost:4000/api/observation/${id}`)
                );
                const responses = await Promise.all(promises);
                const data = responses.map(res => res.data);
                setObservaciones(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [observationIDList]); // Ensure useEffect runs when observationIDList changes

    return ( 
        <div className="listaObservaciones">
            <h2>Observaciones de la actividad</h2>
            {observaciones.length > 0 && observaciones.map((observacion, index) => (
                <InfoObservacion 
                    observacion={observacion} 
                    key={index} 
                    usuario={usuario}
                />
            ))}
        </div>
    );
}

export default ListaObservaciones;
