import "../components/infoActividad.css"
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const InfoActividadProfe = ( {actividad, todosFalse, sO, editarActividad, planId, setObservationIDList, idActivity, functionUpdateActivities, setActividadActual} ) => {

    const [managers, setManagers] = useState([]);
    const [state, setState] = useState('');

    const [programmedDate, setProgrammedDate] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [reminders, setReminders] = useState([]);

    const dejarObservaciones = async (e) => {
        observationIDList(actividad.observations)
        idActivity(actividad._id)
        todosFalse();
        sO(true);
    }

    const editarActividadFunction = async (e) => {
        todosFalse();
        editarActividad(true);
        setActividadActual(actividad);
    }

    const eliminarActividadFunction = async (e) => {
        
        try {
            const response = await axios.post("http://localhost:4000/api/plan/removeActivity", {
                id: planId, 
                activityId: actividad._id
            });

            const response2 = await axios.delete("http://localhost:4000/api/activity/" + actividad._id );

        } catch (error) {
            toast.error("Error removiendo actividad!");
            return;
        }

        functionUpdateActivities();
        toast.success("Actividad removida correctamente!");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/activity/" + actividad._id );

                setManagers(response.data.managers)
                setState(response.data.state)
                // Programmed date
                const date0 = new Date(actividad.programmedDate);
                const legibleDate0 = date0.toLocaleDateString("es-ES", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                setProgrammedDate(legibleDate0)
                // Publication Date
                const date = new Date(actividad.publishDate);
                const legibleDate = date.toLocaleDateString("es-ES", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                setPublicationDate(legibleDate)
                // Reminders
                const legibleDates = response.data.reminders.map(dateString => {
                    const date = new Date(dateString);
                    return date.toLocaleDateString("es-ES", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                });
                setReminders(legibleDates)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return(
        <div className="cartaActividad">
            <h2>{actividad.name}</h2>
            <h3>Semana #{actividad.week}</h3>
            
            <div>
                <h4>Tipo: </h4>
                <h5>{actividad.type}</h5>
            </div>

            <div>
                <h4>Fecha/hora:</h4>
                <h5>{programmedDate} a las {actividad.programmedHour}</h5>
            </div>

            <div className="cartaActividad-Multiple">
                <h4>Responsable(s): </h4>
                {managers && managers.map((manager) => (
                    <h5>{manager.firstname} {manager.code}</h5>
                ))}
            </div>

            <div>
                <h4>Día de publicacion: </h4>
                <h5>{publicationDate}</h5>
            </div>

            <div className="cartaActividad-Multiple">
                <h4>Días recordatorio: </h4>
                {reminders && reminders.map((reminder) => (
                    <h5>{reminder}</h5>
                ))}
            </div>

            <div>
                <h4>Modalidad: </h4>
                <h5>{actividad.modality}</h5>
            </div>

            {actividad.link && 
            
            <div>
                <h4>Enlace: </h4>
                <h5>{actividad.link}</h5>
            </div>
            }
            
            {actividad.pdf && 
            <div>
                <h4>Afiche: </h4>
                <h5>{actividad.pdf}</h5>
            </div>
            }

            <div>
                <h4>Estado: </h4>
                <h5>{state.type}</h5>
            </div>

            <button onClick={dejarObservaciones}> Observaciones </button>
            <button onClick={editarActividadFunction}> Editar </button>
            <button onClick={eliminarActividadFunction}> Eliminar </button>

        </div>
        
    );
}
 
export default InfoActividadProfe;