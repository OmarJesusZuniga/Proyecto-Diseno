import React, { useEffect, useState } from "react";
import "../components/buzonNotificaciones.css"
import InfoNotificaciones from "./infoNotificaciones";
import axios from 'axios';

const BuzonNotificaciones = ({ idStudent, todosFalse, returnPage }) => {
    const [notificaciones, setNotificaciones] = useState([]);

    const volver = () => {
        todosFalse(); 
        returnPage(true);
    }

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

            {notificaciones.length > 0 && notificaciones.map((notificacion) => (
                <InfoNotificaciones 
                    notificacion={notificacion} 
                />
            ))}

            <div className="botonesListaComentarios">
                <button onClick={volver}>Volver</button>
            </div>
        </div>
    );
}

export default BuzonNotificaciones;