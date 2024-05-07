import React, { useRef, useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../components/agregarActividad.css'
import FileSelector from "../components/fileSelector";
import axios from 'axios';

const EditarEstado = ({ reset, returnPage, estado}) => {
    const [enums, setEnums] = useState({ type: [] })
    const [estadoActividad, setEstadoActividad] = useState('')

    const type = useRef(null);
    const [link, setLink] = useState('');
    const [imageCollection, setImageCollection] = useState([])
    const [actualImage, setActualImage] = useState('')

    const changeLink = (e) => {
        setLink(e.target.value);
    }

    const addImage = () => {
        if (actualImage && !imageCollection.includes(actualImage)) {
            setImageCollection(prevImage => [...prevImage, actualImage._id]);
        } else {
            toast.info("Imagen ya añadida o inválida", {
                className: "toast-message"
            });
        }
    }    

    const removeImage = () => {
        if (actualImage && !imageCollection.includes(actualImage)) {
            setImageCollection(prevImage => prevImage.filter(image => image !== actualImage._id));
        } else {
            toast.info("No se pudo eliminar la imagen", {
                className: "toast-message"
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:4000/api/activityState/getEnums/");
                setEnums({
                    type: response.data.type,
                });

                const response2 = await axios.get('http://localhost:4000/api/activityState/' + estado);
                setEstadoActividad(response2.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const editarEstado = async () => {
        
    }

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

            <h2>Tipo</h2>
            <select ref={type}>
                {enums.type.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            <h2>Recording Link</h2>
            <input value={estadoActividad.link} type="text" className="inputBox" placeholder="Input Link"/>


            </div>

            <div>
                <h2>Coleccion de Imagenes</h2>
                <FileSelector />
                <select>
                    
                </select>
                <button className='btnAgregar2'> Eliminar </button>
                
                <button className='btnAgregar'>Editar Estado</button>
            </div>
            </div>
            
        </div>
    );
}

export default EditarEstado;
