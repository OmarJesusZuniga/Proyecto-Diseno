import './modificarEstudiante.css';
import Navbar from "../components/Navbar";
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';


const ModificarEstudiante = () => {
    const navigate = useNavigate();

    const {state} = useLocation();
    const {usuario, estudiante} = state || {};

    const [firstname, setFirstName] = useState(estudiante?.firstname || '');
    const [middlename, setMiddleName] = useState(estudiante?.middlename || '');
    const [firstLastname, setFirstLastname] = useState(estudiante?.firstLastname || '');
    const [secondLastname, setSecondLastname] = useState(estudiante?.secondLastname || '');
    const [email, setEmail] = useState(estudiante?.email || '');
    const [phoneNumber, setcellPhone] = useState(estudiante?.phoneNumber || '');

    const changeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const changeMiddleName = (e) => {
        setMiddleName(e.target.value);
    }

    const changeFirstLastname = (e) => {
        setFirstLastname(e.target.value);
    }

    const changeSecondLastname = (e) => {
        setSecondLastname(e.target.value);
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changeCellPhone = (e) => {
        const numericPhoneNumber = Number(e.target.value);
        setcellPhone(numericPhoneNumber);
    }

    const submitModify = async (e) => {
 
        try {
            const response = await axios.patch('https://proyecto-diseno-ol06.onrender.com/api/students/' + estudiante._id, {
                firstname, 
                middlename, 
                firstLastname,
                secondLastname,
                email,
                phoneNumber 
            });

            toast.success("Estudiante modificado exitosamente!", {
                className: "toast-message"
            });
        } catch (error) {
            toast.error("Error al modificar al estudiante!", {
                className: "toast-message"
            });
            console.error(error);
            return;
        }

        navigate("/homeProfe/", {state: {usuario}});
    }
    
    const volver = () =>{
        navigate("/homeProfe/", {state: {usuario}});
    }

    return (       
        <div className="principal">
            <ToastContainer />
            <form >
                <Navbar id={usuario.firstname} apellido={usuario.firstLastname}/>
                <h2>Información estudiante</h2>
                <button type="button" onClick={volver}>Volver</button>
                <h4>Escriba el primer nombre</h4>
                <div className="input-box">
                    <input type="text" onChange={changeFirstName} placeholder='Nombre' value={firstname} required />
                </div>
                <h4>Escriba el segundo nombre </h4>
                <div className="input-box">
                    <input type="text" onChange={changeMiddleName} placeholder='Segundo Nombre' value={middlename} />
                </div>
                <h4>Escriba el apellido</h4>
                <div className="input-box">
                    <input type="text" onChange={changeFirstLastname} placeholder='Primer Apellido' value={firstLastname} required />
                </div>
                <h4>Escriba el segundo apellido</h4>
                <div className="input-box">
                    <input type="text" onChange={changeSecondLastname} placeholder='Segundo Apellido' value={secondLastname} required />
                </div>
                <h4>Escriba el correo</h4>
                <div className="input-box">
                    <input type="text" onChange={changeEmail} placeholder='Correo' value={email} required />
                </div>
                <h4>Escriba el teléfono celular</h4>
                <div className="input-box">
                    <input type="text" onChange={changeCellPhone} placeholder='Teléfono celular' value={phoneNumber} required />
                </div>
                <button type="button" onClick={submitModify}>Guardar Cambios</button>
                

            </form>

        </div>
        
    );
}

export default ModificarEstudiante;