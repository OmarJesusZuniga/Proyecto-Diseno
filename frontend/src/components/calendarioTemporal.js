import "../components/listaActividades.css";
import InfoActividadProfe from "./infoActividadProfe";
import React, { useState, useEffect } from "react";
import GuideTeamFacade from '../PatronFacade/EquipoGuiaFacade';

const CalendarioEstudiante = ({ grupo, usuario }) => {
    const [actividades, setActividad] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (grupo) {
                try {
                    const planData = await GuideTeamFacade.fetchPlan(grupo[0].plan);
                    setActividad(planData.activities);
                } catch (error) {
                    console.error('Error fetching plan data:', error);
                }
            } else {
                console.log("Plan ID is missing or undefined!");
            }
        };
    
        fetchData();
    }, [grupo, usuario._id]);


    return (
        <div className="listaActividades">
            <div className="tituloActividades">
                <h2>Actividades del Equipo guía</h2>
            </div>
            {actividades && actividades.map((actividad) => (
                <InfoActividadProfe actividad={actividad}/>
            ))}
        </div>
    );
}

export default CalendarioEstudiante;