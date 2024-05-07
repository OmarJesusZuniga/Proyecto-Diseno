import "../components/listaActividades.css"
import InfoActividadProfe from "./infoActividadProfe";
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";


const ListaActividadesProfe = ({ grupo, usuario, todosFalse, sO, setObservationIDList, agregarActividad, setPlanActual}) => {

    const [plan, setPlan] = useState([]);
    const [actividades, setActividad] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {

                console.log(grupo )

                const response = await axios.get("http://localhost:4000/api/guideTeam/" + grupo );
                console.log(response.data)

                const responsePlan = await axios.get("http://localhost:4000/api/plan/" + response.data.plan );
                setPlanActual(responsePlan.data._id);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
                <InfoActividadProfe actividad={actividad} todosFalse={todosFalse} sO = {sO} setObservationIDList={setObservationIDList}/>
            ))}
        </div>
    );
}
 
export default ListaActividadesProfe;