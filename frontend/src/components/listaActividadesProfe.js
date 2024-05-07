import "../components/listaActividades.css"
import InfoActividadProfe from "./infoActividadProfe";
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";


const ListaActividadesProfe = ({ grupo, usuario, todosFalse, sO, setObservationIDList, agregarActividad, setPlanActual, idActivity, editarActividad, setActividadActual, setEditarEstado, setEstadoAEditar}) => {
    const [actividades, setActividad] = useState([]);
    const [planID, setPlan] = useState('')

    const [updateActivities, setUpdateActivities] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/guideTeam/" + grupo );

                const responsePlan = await axios.get("http://localhost:4000/api/plan/" + response.data.plan );
                setPlanActual(responsePlan.data._id);
                setPlan(responsePlan.data._id)

                setActividad(responsePlan.data.activities)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [updateActivities]);

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
                <button onClick={agregarActividadClick}>Agregar Actividad</button>
            </div>
            {actividades && actividades.map((actividad) => (
                <InfoActividadProfe 
                    actividad={actividad} 
                    todosFalse={todosFalse} 
                    sO = {sO} 
                    setObservationIDList={setObservationIDList}
                    planId={planID}
                    functionUpdateActivities={functionUpdateActivities}
                    setActividadActual={setActividadActual}
                    editarActividad={editarActividad}
                    idActivty={idActivity}
                    setEditarEstado={setEditarEstado}
                    setEstadoAEditar={setEstadoAEditar}
                />
            ))}
        </div>
    );
}
 
export default ListaActividadesProfe;