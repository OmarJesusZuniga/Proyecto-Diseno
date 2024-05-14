import './modificarProfesor.css';
import Navbar from "../components/Navbar";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

const ModificarProfesor = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState();
    
    const {state} = useLocation();
    const {usuario, professor} = state || {};

    const [firstname, setFirstName] = useState(professor?.firstname || '');
    const [middlename, setMiddleName] = useState(professor?.middlename || '');
    const [firstLastname, setFirstLastname] = useState(professor?.firstLastname || '');
    const [secondLastname, setSecondLastname] = useState(professor?.secondLastname || '');
    const [email, setEmail] = useState(professor?.email || '');
    const [officeNumber, setOfficePhone] = useState(professor?.officeNumber || '');
    const [phoneNumber, setcellPhone] = useState(professor?.phoneNumber || '');

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

    function changeOfficePhone(e) {
        const input = e.target.value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
        let formattedInput = '';
        if (input.length <= 4) {
            formattedInput = input;
        } else if (input.length <= 8) {
            formattedInput = `${input.slice(0, 4)}-${input.slice(4)}`;
        } else {
            formattedInput = `${input.slice(0, 4)}-${input.slice(4, 8)} [extensión ${input.slice(8)}]`;
        }
        
        const cleanOfficeNumber = formattedInput.replace(/\D/g, ''); // Remove all non-digit characters
        const numericOfficeNumber = Number(cleanOfficeNumber); // Convert to number

        setOfficePhone(numericOfficeNumber);
    }

    const volver = () =>{
        navigate("/home/", {state: {usuario}});
    }

    const submitModify = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.patch('https://proyecto-diseno-ol06.onrender.com/api/professors/' + professor._id, {
                firstname, 
                middlename, 
                firstLastname,
                secondLastname,
                email,
                officeNumber,
                phoneNumber 
            });

            toast.success("Profesor modificado exitosamente!", {
                className: "toast-message"
            });
        } catch (error) {
            toast.error("Error al modificar el profesor!", {
                className: "toast-message"
            });
            console.error(error);
            return;
        }

        navigate("/home/", {state: {usuario}});
    }

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (       
        <div className="principal">
            <ToastContainer />
            <form >
                <Navbar id={usuario.firstname} apellido={usuario.firstLastname}/>
                <h2>Información profesor</h2>
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
                <h4>Escriba el teléfono oficina</h4>
                <div className="input-box">
                    <input type="text" value={officeNumber} onChange={changeOfficePhone} placeholder='Teléfono oficina' required />
                </div>
                <h4>Añada imagen (opcional)</h4>
                <div className="input-box">
                    <input type="file" onChange={handleChange} />
                </div>
                <div className="image-container">
                    {file && <img src={file} alt="Profile Preview"/>}
                </div>

                <button type="button" onClick={submitModify}>Guardar Cambios</button>

            </form>

        </div>
        
    );
}

export default ModificarProfesor;
