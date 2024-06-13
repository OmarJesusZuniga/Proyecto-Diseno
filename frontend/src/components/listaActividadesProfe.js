// ListaActividadesProfe.js
import "../components/listaActividades.css";
import InfoActividadProfe from "./infoActividadProfe";
import React, { useState, useEffect } from "react";
import GuideTeamFacade from '../PatronFacade/EquipoGuiaFacade';

const ListaActividadesProfe = ({ grupo, usuario, todosFalse, sO, agregarActividad, setPlanActual, idActivity, editarActividad, setActividadActual, setEditarEstado, setEstadoAEditar, adminAsis }) => {
    const [actividades, setActividad] = useState([]);
    const [planID, setPlan] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [updateActivities, setUpdateActivities] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const guideTeamData = await GuideTeamFacade.fetchGuideTeam(grupo);
                const planData = await GuideTeamFacade.fetchPlan(guideTeamData.plan);

                setPlanActual(planData._id);
                setPlan(planData._id);
                setActividad(planData.activities);
                setIsAdmin(planData.professor === usuario._id);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [updateActivities, grupo, setPlanActual, usuario._id]);

    function functionUpdateActivities() {
        setUpdateActivities(prev => !prev);
    }

    function agregarActividadClick() {
        todosFalse();
        agregarActividad(true);
    }

    return (
        <div className="listaActividades">
            <div className="tituloActividades">
                <h2>Actividades del Equipo guía</h2>
                {isAdmin && <button onClick={agregarActividadClick}>Agregar Actividad</button>}
            </div>
            {actividades && actividades.map((actividad) => (
                <InfoActividadProfe
                    key={actividad._id}
                    actividad={actividad}
                    todosFalse={todosFalse}
                    sO={sO}
                    planId={planID}
                    functionUpdateActivities={functionUpdateActivities}
                    setActividadActual={setActividadActual}
                    editarActividad={editarActividad}
                    idActivity={idActivity}
                    setEditarEstado={setEditarEstado}
                    setEstadoAEditar={setEstadoAEditar}
                    isAdmin={isAdmin}
                    adminAsis={adminAsis}
                />
            ))}
        </div>
    );
}

export default ListaActividadesProfe;
