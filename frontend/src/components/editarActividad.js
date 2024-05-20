import React, { useRef, useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../components/agregarActividad.css'
import FileSelector from "../components/fileSelector";
import axios from 'axios';

const EditarActividad = ({ reset, returnPage, actividad}) => {
    const [enums, setEnums] = useState({ type: [], modality: [] });
    const [profesores, setProfesores] = useState([]);
    const selectedManagerAgregar = useRef(null);
    const selectedManagerEliminar = useRef(null);
    const selectedReminderAgregar = useRef(null);
    const selectedReminderEliminar = useRef(null);
    const [error, setError] = useState(null);
    
    const [week, setWeek] = useState(null);
    const [name, setName] = useState(null);
    const type = useRef(null);
    const [programmedDate, setProgrammedDate] = useState(null);
    const [programmedHour, setProgrammedHour] = useState(null);
    const [managers, setManagers] = useState([]);
    const [publishDate, setPublishDate] = useState(null);
    const [reminders, setReminders] = useState([]);
    const modality = useRef(null);
    const [link, setLink] = useState('');
    const [pdf, setPdf] = useState({img: ''});

    const changeWeek = (e) => {
        setWeek(e.target.value);
    }

    const changeName = (e) => {
        setName(e.target.value);
    }
    
    const changeProgrammedDate = (e) => {
        setProgrammedDate(e.target.value);
    }
    
    const changeProgrammedHour = (e) => {
        setProgrammedHour(e.target.value);
    }

    function findProfessorById(id) {
        const professor = profesores.find(prof => prof._id === id);
        if (!professor) {
            console.log('Error: No matching professor found!');
            return null;  
        }
        return professor;
    }

    const addManager = () => {
        const prof = findProfessorById(selectedManagerAgregar.current.value);

        if (prof && !managers.includes(prof)) {
            setManagers(prevManagers => [...prevManagers, prof]);
        } else {
            toast.info("Manager ya añadido o inválido", {
                className: "toast-message"
            });
        }
    }    

    const removeManager = () => {
        const prof = findProfessorById(selectedManagerEliminar.current.value);

        if (prof && managers.includes(prof)) {
            setManagers(prevManagers => prevManagers.filter(manager => manager._id !== selectedManagerEliminar.current.value));
        } else {
            toast.info("No se pudo eliminar el manager", {
                className: "toast-message"
            });
        }
    };

    const changePublishDate = (e) => {
        setPublishDate(e.target.value);
    }

    const addReminder = () => {
        if (selectedReminderAgregar.current.value && !reminders.includes(selectedReminderAgregar.current.value)) {
            setReminders(prevReminders => [...prevReminders, selectedReminderAgregar.current.value]);
        } else {
            toast.info("Recordatorio ya añadido o inválido", {
                className: "toast-message"
            });
        }
    }

    const removeReminder = () => {
        if (reminders.includes(selectedReminderEliminar.current.value)) {
            setReminders(prevReminders => prevReminders.filter(reminder => reminder !== selectedReminderEliminar.current.value));
        } else {
            toast.info("No se pudo eliminar el recordatorio", {
                className: "toast-message"
            });
        }
    };
    
    const changeLink = (e) => {
        setLink(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("https://proyecto-diseno-ol06.onrender.com/api/activity/enums/");
                setEnums({
                    type: response.data.type,
                    modality: response.data.modality
                });

                const responseProfessors = await axios.get("https://proyecto-diseno-ol06.onrender.com/api/professors/");
                setProfesores(responseProfessors.data)

                const filteredPeople = responseProfessors.data.filter(person => actividad.managers.includes(person._id));

                setManagers(filteredPeople);
                
                setReminders(changeDateFormatMultiple(actividad.reminders));

                setWeek(actividad.week)
                setName(actividad.name) 
                // type 
                setProgrammedDate(changeDateFormat(actividad.programmedDate))
                setProgrammedHour(actividad.programmedHour)
                setPublishDate(changeDateFormat(actividad.publishDate))
                // modality
                setLink(actividad.link)
                // setPdf()

                type.current.value = actividad.type
                modality.current.value = actividad.modality

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const agregarActividad = async () => {
        if (publishDate > programmedDate) {
            toast.warning("La fecha de publicación no puede estar después de la programada!", {
                className: "toast-message"
            });
            return;
        }

        if (modality.current.value === enums.modality[1] && !link) {
            toast.warning("Si la modalidad es remota, se requiere el link!", {
                className: "toast-message"
            });
            return;
        }

        try {
            const response = await axios.patch('https://proyecto-diseno-ol06.onrender.com/api/activity/' + actividad._id, {
                week, 
                name, 
                type: type.current.value, 
                programmedDate, 
                programmedHour, 
                managers: managers.map(manager => manager._id), 
                publishDate, 
                reminders, 
                modality: modality.current.value, 
                link,
                pdf : pdf.img
            });

        } catch (error) {
            toast.error("Error al modificar la actividad!", {
                className: "toast-message"
            });
            console.error(error);
            return;
        }

        toast.success("Actividad modificada correctamente!", {
            className: "toast-message"
        });
    }

    const changeDateFormat = (date) => {
        const dateObj = new Date(date);
        const formattedDate = dateObj.toISOString().split('T')[0]; // Converts to 'YYYY-MM-DD'
        return formattedDate;
    };      

    const changeDateFormatMultiple = (dates) => {
        return dates.map(date => {
            const dateObj = new Date(date);
            return dateObj.toISOString().split('T')[0]; // Converts to 'YYYY-MM-DD'
        });
    };
    
    const volver = () => {
        reset(); 
        returnPage(true);
    }
    
    return (
        <div >
            <ToastContainer />

            <div className="btnVolverContainer"> 
                <button onClick={volver} className='btnVolver'>Volver</button>
            </div>

            <div className='agregarEstudiante'>
            <div>
            <h2>Week</h2>
            <input value={week} onChange={changeWeek} type="number" className="inputBox" placeholder="Input Week"/>

            <h2>Nombre</h2>
            <input value={name} onChange={changeName} type="text" className="inputBox" placeholder="Input Name"/>

            <h2>Type</h2>
            <select ref={type}>
                {enums.type.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            <h2>Programmed Date</h2>
            <input value={programmedDate} onChange={changeProgrammedDate} type="date" className="inputBox" placeholder="Select Date"/>

            <h2>Programmed Hour</h2>
            <input value={programmedHour} onChange={changeProgrammedHour} type="time" className="inputBox" placeholder="Select Hour"/>
            
            <h2>Publish Date</h2>
            <input value={publishDate} onChange={changePublishDate} type="date" className="inputBox" placeholder="Select Publish Date"/>

            <h2>Modality</h2>
            <select ref={modality}>
                {enums.modality.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            <h2>Link</h2>
            <input value={link} onChange={changeLink} type="url" className="inputBox" placeholder="Input URL"/>

            <h2>PDF</h2>
            <FileSelector fileIncluded={setPdf}/>
            </div>

            <div>
                <h2>Managers</h2>
                <select ref={selectedManagerAgregar}>
                    {profesores.map(option => (
                        <option key={option._id} value={option._id}>{option.firstname} {option.code}</option>
                    ))}
                </select>
                <button onClick={addManager} className='btnAgregar2'>Agregar</button>

                <h2>Managers Seleccionados</h2>
                <select ref={selectedManagerEliminar}>
                    {managers.map(option => (
                        <option key={option._id + "0"} value={option._id}>{option.firstname} {option.code}</option>
                    ))}
                </select>
                <button onClick={removeManager} className='btnAgregar2'>Eliminar</button>
                
                <h2>Reminders</h2>
                <input ref={selectedReminderAgregar} type="date" className="inputBox" placeholder="Select Date"/>
                <button onClick={addReminder} className='btnAgregar2'>Agregar</button>

                <h2>Reminders Seleccionados</h2>
                <select ref={selectedReminderEliminar}>
                    {reminders.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <button onClick={removeReminder} className='btnAgregar2'>Eliminar</button>

                <button onClick={agregarActividad} className='btnAgregar'>Editar Actividad</button>
            </div>
            </div>
            
        </div>
    );
}

export default EditarActividad;
