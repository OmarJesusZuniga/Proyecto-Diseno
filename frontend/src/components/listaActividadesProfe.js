import "../components/listaActividades.css"
import InfoActividadProfe from "./infoActividadProfe";
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";

const ListaActividadesProfe = ({ grupo }) => {

    const [plan, setPlan] = useState([]);
    const [actividades, setActividad] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                console.log(grupo )

                const response = await axios.get("http://localhost:4000/api/guideTeam/" + grupo );
                console.log(response.data)

                const responsePlan = await axios.get("http://localhost:4000/api/plan/" + response.data.plan );
                console.log(responsePlan.data)


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return ( 
        <div className="listaActividades">


            <h2>Actividades del Equipo guía</h2>
            {actividades && actividades.map((actividad) => (
                <InfoActividadProfe actividad={actividad}/>
            ))}
        </div>
    );
}
 
export default ListaActividadesProfe;