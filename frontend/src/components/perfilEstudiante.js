import React, { useEffect, useState } from 'react';
import './perfilEstudiante.css';
import { useNavigate } from 'react-router-dom';

const PerfilEstudiante = ({ usuario }) => {
    const navigate = useNavigate();

    // Initialize state with usuario prop values
    const [userData, setUserData] = useState({
        firstname: '',
        middlename: '',
        firstLastname: '',
        secondLastname: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    // Effect to update state when usuario prop changes
    useEffect(() => {
        if (usuario) {
            setUserData({
                firstname: usuario.firstname || '',
                middlename: usuario.middlename || '',
                firstLastname: usuario.firstLastname || '',
                secondLastname: usuario.secondLastname || '',
                email: usuario.email || '',
                phoneNumber: usuario.phoneNumber || '',
                password: usuario.password || ''
            });
        }
    }, [usuario]); // Dependency array includes usuario to trigger effect when it changes

    const modificarInfo = () => {
        navigate("/studentModInfo/", { state: { usuario } });
    };

    return (
        <div className="principal">
            <h2>Perfil</h2>
            <div className="data-label">
                <h3>Primer nombre </h3>
                <div className="data-box">
                    <h4>{userData.firstname}</h4>
                </div>
            </div>
            <div className="data-label">
                <h3>Segundo nombre </h3>
                <div className="data-box">
                    <h4>{userData.middlename}</h4>
                </div>
            </div>
            <div className="data-label">
                <h3>Primer apellido </h3>
                <div className="data-box">
                    <h4>{userData.firstLastname}</h4>
                </div>
            </div>
            <div className="data-label">
                <h3>Segundo apellido </h3>
                <div className="data-box">
                    <h4>{userData.secondLastname}</h4>
                </div>
            </div>
            <div className="data-label">
                <h3>Correo </h3>
                <div className="data-box">
                    <h4>{userData.email}</h4>
                </div>
            </div>
            <div className="data-label">
                <h3>Número de teléfono</h3>
                <div className="data-box">
                    <h4>{userData.phoneNumber}</h4>
                </div>
            </div>
            <div className="data-label">
                <h3>Contraseña</h3>
                <div className="data-box">
                    <h4>{userData.password}</h4>
                </div>
            </div>
            <button type="button" onClick={modificarInfo}>Modificar información</button>
        </div>
    );
};

export default PerfilEstudiante;
