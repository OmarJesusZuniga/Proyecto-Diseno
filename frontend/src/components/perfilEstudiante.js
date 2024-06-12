import './perfilEstudiante.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PerfilEstudiante = ({ usuario }) => {
    const navigate = useNavigate();

    const {
        firstname = '',
        middlename = '',
        firstLastname = '',
        secondLastname = '',
        email = '',
        phoneNumber = '',
        password = ''
    } = usuario || {}; // Fallback to an empty object if usuario is not provided

    const modificarInfo = () =>{
        navigate("/studentModInfo/", {state: {usuario}});
    }

    return (
        <div className="principal">
            <h2>Perfil</h2>
            <div className="data-label">
                <h3>Primer nombre </h3>
                <div className="data-box">
                    <h4>{firstname}</h4>
                </div>
                
            </div>
            <div className="data-label">
                <h3>Segundo nombre</h3>
                <div className="data-box">
                    <h4>{middlename}</h4>
                </div>
            </div>
            <div className="data-label">
                <h3>Primer apellido</h3>
                <div className="data-box">
                    <h4>{firstLastname}</h4>
                </div>
            </div>
            <div className="data-label">
                <h3>Segundo apellido</h3>
                <div className="data-box">
                    <h4>{secondLastname}</h4>
                </div>
            </div>
            <div className="data-label">
                <h3>Correo</h3>
                <div className="data-box">
                    <h4>{email}</h4>
                </div>
            </div>
            <div className="data-label">
                <h3>Número de teléfono</h3>
                <div className="data-box">
                    <h4>{phoneNumber}</h4>
                </div>
            </div>
            <div className="data-label">
                <h3>Contraseña</h3>
                <div className="data-box">
                    <h4>{password}</h4>
                </div>
            </div>
            <button type="button" onClick={modificarInfo}>Modificar información</button>
        </div>
    );
}

export default PerfilEstudiante;
