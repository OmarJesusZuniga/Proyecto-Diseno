import "../components/listaActividades.css";
import InfoActividadProfe from "./infoActividadProfe";
import React, { useState, useEffect } from "react";
import GuideTeamFacade from '../PatronFacade/EquipoGuiaFacade';

const CalendarioEstudiante = ({ grupo, usuario }) => {
    const [actividades, setActividad] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const guideTeamData = await GuideTeamFacade.fetchGuideTeam(grupo);
                const planData = await GuideTeamFacade.fetchPlan(guideTeamData.plan);

                setActividad(planData.activities);
                console.log(grupo);

            } catch (error) {
                console.error('Error fetching data:', error);
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