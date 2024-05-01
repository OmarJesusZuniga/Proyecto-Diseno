import './modificarProfesor.css';
import Navbar from "../components/Navbar";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const ModificarProfesor = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [officePhone, setOfficePhone] = useState('');
    const {state} = useLocation();
    const {usuario, professor} = state || {};


    const volver = () =>{
        navigate("/home/", {state: {usuario}});
    }


    const submitModify = async (e) => {
        navigate("/home/", {state: {usuario}});
    }

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    
    function handleOfficePhoneChange(e) {
        const input = e.target.value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
        let formattedInput = '';
        if (input.length <= 4) {
            formattedInput = input;
        } else if (input.length <= 8) {
            formattedInput = `${input.slice(0, 4)}-${input.slice(4)}`;
        } else {
            formattedInput = `${input.slice(0, 4)}-${input.slice(4, 8)} [extensión ${input.slice(8)}]`;
        }
        setOfficePhone(formattedInput);
    }

    return (       
        <div className="principal">
            <form >
                <Navbar id={usuario.firstname} apellido={usuario.firstLastname}/>
                <h2>Información profesor</h2>
                <h4>Escriba el nombre</h4>
                <div className="input-box">
                    <input type="text" placeholder='Nombre' value={professor.firstname} required />
                </div>
                <h4>Escriba el segundo nombre </h4>
                <div className="input-box">
                    <input type="text" placeholder='Segundo Nombre' value={professor.middlename} required />
                </div>
                <h4>Escriba el apellido</h4>
                <div className="input-box">
                    <input type="text" placeholder='Primer Apellido' value={professor.firstLastname} required />
                </div>
                <h4>Escriba el segundo apellido</h4>
                <div className="input-box">
                    <input type="text" placeholder='Segundo Apellido' value={professor.secondLastname} required />
                </div>
                <h4>Escriba el correo</h4>
                <div className="input-box">
                    <input type="text" placeholder='Correo' value={professor.email} required />
                </div>
                <h4>Escriba el teléfono celular</h4>
                <div className="input-box">
                    <input type="text" placeholder='Teléfono celular' value={professor.phoneNumber} required />
                </div>
                <h4>Escriba el teléfono oficina</h4>
                <div className="input-box">
                    <input type="text" value={professor.officeNumber} onChange={handleOfficePhoneChange} placeholder='Teléfono oficina' required />
                </div>
                <h4>Añada imagen (opcional)</h4>
                <div className="input-box">
                    <input type="file" onChange={handleChange} />
                </div>
                <div className="image-container">
                    {file && <img src={file} />}
                </div>

                <button onClick={volver}>Volver</button>
                <button onClick={submitModify}>Guardar Cambios</button>

            </form>

        </div>
        
    );
}

export default ModificarProfesor;