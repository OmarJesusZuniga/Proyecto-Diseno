// EditarEstado.js
import React, { useRef, useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../components/agregarActividad.css';
import FileSelector from "../components/fileSelector";
import ActivityStateFacade from '../PatronFacade/EstadoActividadFacade';

const EditarEstado = ({ reset, returnPage, estado }) => {
    const [enums, setEnums] = useState({ type: [] });
    const [estadoActividad, setEstadoActividad] = useState('');
    const [path, setPath] = useState('');
    const [previewURL, setPreviewUrl] = useState('');
    const [tipoDeEstado, setTipoDeEstado] = useState('');
    const [isCancel, setIsCancel] = useState(false);

    const type = useRef(null);
    const [link, setLink] = useState('');
    const [reason, setReason] = useState('');
    const [imageCollection, setImageCollection] = useState([]);
    const [imageToAdd, setImageToAdd] = useState('');
    const [actualImage, setActualImage] = useState('');
    const actualImageDelete = useRef(null);

    const isFirstRender = useRef(true); // Ignorar para imagen

    const changeLink = (e) => {
        setLink(e.target.value);
    }

    const changeReason = (e) => {
        setReason(e.target.value);
    }

    const addImage = () => {
        if (imageToAdd.img === undefined) {
            return;
        }
        if (imageToAdd && !imageCollection.includes(imageToAdd)) {
            setImageCollection(prevImage => [...prevImage, imageToAdd]);

            if (imageCollection.length === 0) {
                setPreviewUrl(path + imageToAdd.img);
            }
        } else {
            toast.info("Imagen ya añadida o inválida", {
                className: "toast-message"
            });
        }
    }

    const removeImage = () => {
        if (actualImageDelete.current.value && !imageCollection.includes(actualImageDelete.current.value)) {
            if (imageCollection.length === 1) {
                setPreviewUrl('');
            }

            setImageCollection(prevImage => prevImage.filter(image => image._id !== actualImageDelete.current.value));
        } else {
            toast.info("No se pudo eliminar la imagen", {
                className: "toast-message"
            });
        }
    };

    const changePreviewImage = () => {
        if (!actualImageDelete.current.value) {
            return;
        }
        const newImage = imageCollection.find(img => img._id === actualImageDelete.current.value);
        setPreviewUrl(path + newImage.img);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const enums = await ActivityStateFacade.fetchEnums();
                setEnums(enums);

                const activityState = await ActivityStateFacade.fetchActivityState(estado);
                setEstadoActividad(activityState);
                setLink(activityState.recordingLink);
                setImageCollection(activityState.imageCollection);
                type.current.value = activityState.type;
                setTipoDeEstado(activityState.type);

                const imagePath = await ActivityStateFacade.fetchImagePath();
                setPath(imagePath.path);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [estado]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            setImageToAdd(actualImage);
            addImage();
        }
    }, [actualImage]);

    const editarEstado = async () => {
        try {
            const activityStateData = {
                type: type.current.value,
                imageCollection: imageCollection.map(img => img._id),
                recordingLink: link,
                cancelationReason: reason
            };

            await ActivityStateFacade.updateActivityState(estado, activityStateData);

        } catch (error) {
            toast.error("Error al modificar el estado de la actividad!", {
                className: "toast-message"
            });
            return;
        }

        toast.success("Estado de la actividad modificado correctamente!", {
            className: "toast-message"
        });
    }

    const volver = () => {
        reset();
        returnPage(true);
    }

    useEffect(() => {
        setIsCancel(tipoDeEstado === 'Cancelada');
    }, [tipoDeEstado]);

    return (
        <div>
            <ToastContainer />

            <div className="btnVolverContainer">
                <button onClick={volver} className='btnVolver'>Volver</button>
            </div>

            <div className='agregarEstudiante'>
                <div>
                    <h2>Tipo</h2>
                    <select ref={type} onChange={(e) => setTipoDeEstado(e.target.value)}>
                        {enums.type.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>

                    <h2>Link de Grabacion</h2>
                    <input value={link} onChange={changeLink} type="text" className="inputBox" placeholder="Input Link" />

                    {isCancel && (
                        <>
                            <h2>Justificación de Cancelacion</h2>
                            <input onChange={changeReason} type="text" className="inputBox" placeholder="Cancellation Reason" />
                        </>
                    )}

                    <br />
                    <button onClick={editarEstado} className='btnAgregar'>Editar Estado</button>
                </div>

                <div className="coleccionDeImagenes">
                    <h2>Coleccion de Imagenes</h2>
                    <FileSelector fileIncluded={setActualImage} />
                    <select ref={actualImageDelete} className="fileViewer" onChange={changePreviewImage}>
                        {imageCollection.map(img => (
                            <option key={img._id} value={img._id}>{img.img}</option>
                        ))}
                    </select>
                    <button onClick={removeImage} className='btnAgregar2'> Eliminar </button>
                    {previewURL ? <img src={previewURL} alt="Preview" /> : <p>Loading image...</p>}
                    <br />
                </div>
            </div>
        </div>
    );
}

export default EditarEstado;
