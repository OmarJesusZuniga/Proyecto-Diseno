import "../components/listaActividades.css"
import InfoActividadProfe from "./infoActividadProfe";
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";

const ListaActividadesProfe = ({ grupo, usuario, todosFalse, sO, setActividadSeleccionada}) => {

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

    function agregarActividadClick() {
    }    


    return ( 
        <div className="listaActividades">
            <div className="tituloActividades">
                <h2>Actividades del Equipo guía</h2>
                <button onClick={agregarActividadClick}>Agregar Actividad</button>
            </div>
            {actividades && actividades.map((actividad) => (
                <InfoActividadProfe actividad={actividad} todosFalse={todosFalse} sO = {sO} setActividadSeleccionada={setActividadSeleccionada}/>
            ))}
        </div>
    );
}
 
export default ListaActividadesProfe;