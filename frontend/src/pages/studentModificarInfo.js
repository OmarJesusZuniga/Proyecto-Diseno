import './studentModificarInfo.css';
import Navbar from "../components/Navbar";
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';


const StudentModificarInfo = () => {
    const navigate = useNavigate();

    const {state} = useLocation();
    const {usuario} = state || {};

    const [phoneNumber, setcellPhone] = useState(usuario?.phoneNumber || '');
    const [password, setPassword] = useState(usuario?.password || '');
    const [file, setFile] = useState();
    const [image, setImage] = useState(usuario?.image || '');


    const changeCellPhone = (e) => {
        const numericPhoneNumber = Number(e.target.value);
        setcellPhone(numericPhoneNumber);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    const submitModify = async (e) => {
        try {
            const response = await axios.patch('http://localhost:4000/api/students/' + usuario._id, {
                phoneNumber: phoneNumber,
                password: password
            });
    
            if (response && response.data) {
                // Assuming response.data contains the updated student data
                const updatedUsuario = {...usuario, ...response.data};
                toast.success("Estudiante modificado exitosamente!", {
                    className: "toast-message"
                });
                navigate("/homeStudent/", {state: {usuario: updatedUsuario}});
            } else {
                // Handle case where no data is returned but the request was successful
                toast.error("Modificación exitosa, pero sin datos devueltos!", {
                    className: "toast-message"
                });
                navigate("/homeStudent/", {state: {usuario}});
            }
        } catch (error) {
            toast.error("Error al modificar al estudiante!", {
                className: "toast-message"
            });
            console.error(error);
            // Optionally navigate back even on failure, or handle differently
            navigate("/homeStudent/", {state: {usuario}});
        }
    }
    
    
    const volver = () => {
        navigate("/homeStudent/", {state: {usuario}});
    }

    return (       
        <div className="principalStudentModInfo">
            <ToastContainer />
            <form >
                <Navbar id={usuario.firstname} apellido={usuario.firstLastname}/>
                <h2>Información personal</h2>
                <button type="button" onClick={volver}>Volver</button>
                <h4>Escriba el teléfono celular</h4>
                <div className="input-box">
                    <input type="text" onChange={changeCellPhone} placeholder='Teléfono celular' value={phoneNumber} required />
                </div>
                <h4>Escriba su nueva contraseña</h4>
                <div className="input-box">
                    <input type="text" onChange={changePassword} placeholder='Contraseña' value={password} required />
                </div>
                
                <div className="image-container">
                    {file && <img src={file} alt="Profile Preview"/>}
                </div>

                <button type="button" onClick={submitModify}>Guardar Cambios</button>
                

            </form>

        </div>
        
    );
}

export default StudentModificarInfo;