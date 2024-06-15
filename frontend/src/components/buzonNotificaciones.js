import React, { useEffect, useState } from "react";
import "../components/buzonNotificaciones.css"
import InfoNotificaciones from "./infoNotificaciones";
import axios from 'axios';

const BuzonNotificaciones = ({ idStudent }) => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [filter, setFilter] = useState("todas");

    const volver = async() => {
        const response = await axios.post("http://localhost:4000/api/students/notification/");
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        
    };

    const filteredNotifications = notificaciones.filter(notificacion => {
        if (filter === "todas") return true;
        if (filter === "leidas") 
            return notificacion.students.some(student => student.studentId === idStudent && student.state === 1);
        if (filter === "no leidas") 
            return notificacion.students.some(student => student.studentId === idStudent && student.state === 0);
        return true;
    });

    const [fetch, setFetch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/students/mail/" + idStudent );

                const sortedNotifications = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                setNotificaciones(sortedNotifications);

                console.log(sortedNotifications);

                setFetch('');

            } catch (error) {
                console.log(error.message)
            }            
        };

        fetchData();
    }, [fetch]); 

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
                    idStudent={idStudent}
                    setFetch={setFetch}
                />
            )) : <h2>No hay notificaciones que coincidan con el filtro.</h2>}

            
        </div>
    );
}

export default BuzonNotificaciones;