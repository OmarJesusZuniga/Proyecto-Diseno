
import "../components/infoActividad.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ActivityFacade from '../PatronFacade/ActividadFacade';

const InfoActividadProfe = ({ actividad, isAdmin, todosFalse, sO, editarActividad, planId, idActivity, functionUpdateActivities, setActividadActual, setEditarEstado, setEstadoAEditar, adminAsis }) => {
    const [managers, setManagers] = useState([]);
    const [state, setState] = useState('');
    const [path, setPath] = useState('');

    const [programmedDate, setProgrammedDate] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [reminders, setReminders] = useState([]);

    const [viewImages, setViewImages] = useState([]);

    const dejarObservaciones = async () => {
        idActivity(actividad._id);
        todosFalse();
        sO(true);
    };

    const editarEstadoActividad = async () => {
        todosFalse();
        setEditarEstado(true);
        setEstadoAEditar(actividad.state);
    };

    const editarActividadFunction = async () => {
        todosFalse();
        editarActividad(true);
        setActividadActual(actividad);
    };

    const eliminarActividadFunction = async () => {
        try {
            await ActivityFacade.removeActivityFromPlan(planId, actividad._id);
            await ActivityFacade.deleteActivity(actividad._id);
        } catch (error) {
            toast.error("Error removiendo actividad!");
            return;
        }

        functionUpdateActivities();
        toast.success("Actividad removida correctamente!");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activity = await ActivityFacade.fetchActivity(actividad._id);

                setManagers(activity.managers);
                setState(activity.state);

                // Programmed date
                const date0 = new Date(actividad.programmedDate);
                const legibleDate0 = date0.toLocaleDateString("es-ES", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                setProgrammedDate(legibleDate0);

                // Publication Date
                const date = new Date(actividad.publishDate);
                const legibleDate = date.toLocaleDateString("es-ES", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                setPublicationDate(legibleDate);

                // Reminders
                const legibleDates = activity.reminders.map(dateString => {
                    const date = new Date(dateString);
                    return date.toLocaleDateString("es-ES", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                });
                setReminders(legibleDates);

                const imagePath = await ActivityFacade.fetchImagePath();
                setPath(imagePath.path);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [actividad]);

    const addViewImages = (img) => {
        setViewImages(prevImage => [...prevImage, img]);
    };

    const resetViewImages = () => {
        setViewImages([]);
    };

    const viewImagesFunction = async () => {
        resetViewImages();
        const promises = state.imageCollection.map(img => {
            return ActivityFacade.fetchImage(img)
                .then(response => response)
                .catch(error => console.error('Error fetching image:', img, error));
        });

        try {
            const images = await Promise.all(promises);
            images.forEach(image => {
                if (image) {
                    addViewImages(path + image.img);
                }
            });

        } catch (error) {
            console.error('Error handling images:', error);
        }
    };

    return (
        <div className="cartaActividad">
            <ToastContainer />
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
                    <h5 key={manager._id}>{manager.firstname} {manager.code}</h5>
                ))}
            </div>

            <div>
                <h4>Día de publicacion: </h4>
                <h5>{publicationDate}</h5>
            </div>

            <div className="cartaActividad-Multiple">
                <h4>Días recordatorio: </h4>
                {reminders && reminders.map((reminder, index) => (
                    <h5 key={index}>{reminder}</h5>
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
                    <h5>
                        <a href={path + actividad.pdf} target="_blank" rel="noopener noreferrer">View PDF</a>
                    </h5>
                </div>
            }

            <div className="cartaActividad-Multiple">
                <h4>Estado: </h4>
                <h5>{state.type}</h5>
                {state.recordingLink && (
                    <>
                        <h4>Link de Grabacion: </h4>
                        <h5>{state.recordingLink}</h5>
                    </>
                )}
                {state.cancelationReason && (
                    <>
                        <h4>Justificación de Cancelacion: </h4>
                        <h5>{state.cancelationReason}</h5>
                    </>
                )}
                <div className="previewImagenes">
                    {viewImages.map(img => (
                        <img src={img} alt="Estado" key={img} className="img-estado" />
                    ))}
                </div>
                {(viewImages.length === 0) && <button onClick={viewImagesFunction}>Ver Imagenes</button>}
                {(viewImages.length !== 0) && <button onClick={resetViewImages}>Minimizar Imagenes</button>}
            </div>

            {!adminAsis && <button onClick={dejarObservaciones}>Observaciones</button>}
            {isAdmin && <button onClick={editarEstadoActividad}>Modificar Estado</button>}
            {isAdmin && <button onClick={editarActividadFunction}>Editar</button>}
            {isAdmin && <button onClick={eliminarActividadFunction}>Eliminar</button>}
        </div>
    );
}

export default InfoActividadProfe;
