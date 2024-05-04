import React, { useEffect, useState } from "react";
import "../components/listaObservaciones.css"
import InfoObservacion from "./infoObservaciones";
import axios from 'axios';

const ListaObservaciones = () => {
    const [observaciones, setObservaciones] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/observation/');
                setObservaciones(response.data);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    
    return ( 
        <div className="listaObservaciones">
            <h2>Observaciones de la actividad</h2>
            {observaciones && observaciones.map((observacion, index) => (
                
                professor.campus.includes(campus) && (
                    <InfoObservacion equipo={equipo} key={index} professor={professor} usuario={usuario}/>
                )
            ))}
        </div>
    );
}
 
export default ListaObservaciones;