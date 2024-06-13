import React, { useEffect, useState } from "react";
import "../components/buzonNotificaciones.css"
import InfoNotificaciones from "./infoNotificaciones";
import axios from 'axios';

const BuzonNotificaciones = ({ idStudent, todosFalse, returnPage }) => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [filter, setFilter] = useState("todas");

    const volver = () => {
        todosFalse(); 
        returnPage(true);
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredNotifications = notificaciones.filter(notificacion => {
        if (filter === "todas") return true;
        if (filter === "leidas") return notificacion.state === 1;
        if (filter === "no leidas") return notificacion.state === 0;
        return true;
    });

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const response = await axios.get("http://localhost:4000/api/students/mail/" + idStudent );
                
                const sortedNotifications = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                setNotificaciones(sortedNotifications);

                console.log(sortedNotifications);

            } catch (error) {
                console.log(error.message)
            }            
        };

        fetchData();
    }, []); 

    return ( 
        <div className="listaNotificaciones">
            
            <h2>Buzón de notificaciones</h2>

            <select value={filter} onChange={handleFilterChange} className="filter">
                <option value="todas">Todas</option>
                <option value="leidas">Leídas</option>
                <option value="no leidas">No leídas</option>
            </select>

            {filteredNotifications.length > 0 ? filteredNotifications.map((notificacion) => (
                <InfoNotificaciones 
                    key={notificacion.id}
                    notificacion={notificacion} 
                />
            )) : <h2>No hay notificaciones que coincidan con el filtro.</h2>}

            <div className="botonesListaComentarios">
                <button onClick={volver}>Volver</button>
            </div>
        </div>
    );
}

export default BuzonNotificaciones;