import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBarStudent from "../components/sideBarStudent";
import PerfilEstudiante from "../components/perfilEstudiante";
import CalendarioEstudiante from "../components/calendarioEstudiante";
import BuzonNotificaciones from "../components/buzonNotificaciones";

const HomeStudent = () => {
    const { state } = useLocation();
    const { usuario } = state || {};

    const [bienvenida, setBienvenida] = useState(true);
    const [perfilEstudiante, setPerfilEstudiante] = useState(false);
    const [verCalendario, setVerCalendario] = useState(false);
    const [verBuzonNotificaciones, setVerBuzonNotificaciones] = useState(false);
    const [equipo, setEquipo] = useState(null);

    useEffect(() => {
        const fetchGuideTeam = async () => {
            if (usuario && usuario._id) {
                try {
                    console.log(usuario._id)
                    const response = await axios.post('http://localhost:4000/api/guideTeam/student/get', { id: usuario._id });
                    console.log(response.data)
                    setEquipo(response.data);
                } catch (error) {
                    console.error('Failed to fetch guide teams:', error);
                }
            }
        };

        fetchGuideTeam();
    }, [usuario]);

    const todoFalse = () => {
        setPerfilEstudiante(false);
        setVerCalendario(false);
        setVerBuzonNotificaciones(false);
        setBienvenida(false);
    }

    return (
        <div className="home">
            <Navbar id={usuario.firstname} apellido={usuario.firstLastname}/>
            <div className="horizontal-container">
                <SideBarStudent usuario={usuario}
                                perfil={setPerfilEstudiante}
                                todosFalse={todoFalse}
                                calendario={setVerCalendario}
                                buzon={setVerBuzonNotificaciones}/>
                <div className="contenedorListas">
                    {bienvenida && <div className="contenido"><h1>Bienvenido, estudiante</h1></div>}
                    {perfilEstudiante && <PerfilEstudiante usuario={usuario}/>}
                    {verCalendario && <CalendarioEstudiante grupo={equipo} usuario={usuario}/>}
                    {verBuzonNotificaciones && <BuzonNotificaciones idStudent={usuario._id}/>}
                </div>
            </div>
        </div>
    );
}

export default HomeStudent;
