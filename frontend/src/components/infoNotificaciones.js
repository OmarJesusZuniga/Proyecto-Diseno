import './infoNotificaciones.css'
import moment from 'moment'; 
import axios from 'axios'; 
import React, { useEffect, useState } from "react";

const InfoNotificaciones = ({notificacion, idStudent, setFetch}) => {
    const initialIsRead = notificacion.students.some(student => 
        student.studentId === idStudent && student.state === 1
    );

    useEffect(() => {
        senderName();
    }, []);

    const senderName = async() => {
        try {
            const response = await axios.get("http://localhost:4000/api/professors/" + notificacion.sender);
            const professor = response.data;
            setSender(professor.firstname + ' ' + professor.firstLastname);
        } catch (error) {
            console.error('Error fetching sender name:', error);
        }
    }
    
    const [isRead, setIsRead] = useState(initialIsRead); 
    const [sender, setSender] = useState('');
    const formattedDate = moment(notificacion.date).format("MM/DD/YY HH:mm");
    const programDate = moment(notificacion.programmedDate).format("MM/DD/YY HH:mm");

    const handleNotificationState = async(event) => {
        try {
            // Using Axios to make a PATCH request
            const response = await axios.patch("http://localhost:4000/api/students/notification/", {
                notificationId: notificacion._id,  
                studentId: idStudent  
            });
            setIsRead(!isRead);

            setFetch('cambio');

            // Log or handle the response as needed
            console.log('Update successful:', response.data);
        } catch (error) {
            // Error handling in case the request fails
            console.error('Failed to update notification:', error);
            if (error.response) {
                // Server responded with a status code outside the 2xx range
                console.error('Error status:', error.response.status);
                console.error('Error data:', error.response.data);
            }
        }
    };

    const handleDelete = async(event) => {
        try {
            // Using Axios to make a PATCH request
            const response = await axios.patch("http://localhost:4000/api/students/notification/delete", {
                notificationId: notificacion._id,  
                studentId: idStudent  
            });

            setFetch('cambio');
    
            // Log or handle the response as needed
            console.log('Update successful:', response.data);
        } catch (error) {
            // Error handling in case the request fails
            console.error('Failed to update notification:', error);
            if (error.response) {
                // Server responded with a status code outside the 2xx range
                console.error('Error status:', error.response.status);
                console.error('Error data:', error.response.data);
            }
        }
    };

    return (
        <div className="cartaComentario">
            <div className="infoEspecifica">
                <h2>Enviado por: {sender} </h2>
                <div>
                    <h3>Texto: </h3>
                    <h5>{notificacion.text}</h5>
                </div>
                <div>
                    <h3>Programada para: </h3>
                    <h5>{programDate}</h5>
                </div>
                <div>
                    <h3>Enviado el día: </h3>
                    <h5>{formattedDate}</h5>
                </div>
                
                <div className="checkbox">
                    <h3>{isRead ? 'Desmarcar como leído: ' : 'Marcar como leído: '}</h3>
                    <input className="box" type="checkbox" onChange={handleNotificationState} />
                </div>

                <div className="botonesListaComentarios">
                    <button onClick={handleDelete}>Borrar</button>
                </div>
            </div>     
        </div>
    );
}

export default InfoNotificaciones;