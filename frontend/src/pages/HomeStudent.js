import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import SideBarStudent from "../components/sideBarStudent";
import PerfilEstudiante from "../components/perfilEstudiante";
import CalendarioEstudiante from "../components/calendarioEstudiante";
import BuzonNotificaciones from "../components/buzonNotificaciones";

const HomeStudent = () => {
    const {state} = useLocation();
    const {usuario} = state || {};

    const [bienvenida, setBienvenida] = useState(true);
    //verPerfilEstudiante
    const [perfilEstudiante, setPerfilEstudiante] = useState(false)

    //verCalendario
    const [verCalendario, setVerCalendario] = useState(false)

    //verBuzonNotificaciones
    const [verBuzonNotificaciones, setVerBuzonNotificaciones] = useState(false)

    const todoFalse = () => {
        setPerfilEstudiante(false);
        setVerCalendario(false);
        setVerBuzonNotificaciones(false);
        setBienvenida(false);
    }

    return (
        <div className="home">
            <Navbar  id={usuario.firstname} apellido={usuario.firstLastname}/>
            <div className="horizontal-container">
                <SideBarStudent usuario={usuario} 
                        perfil = {setPerfilEstudiante}
                        todosFalse={todoFalse}
                        calendario = {setVerCalendario}
                        buzon = {setVerBuzonNotificaciones}/>
                <div className="contenedorListas">
                    {bienvenida && <div className="contenido"><h1>Bienvenido, estudiante</h1></div>}
                    {perfilEstudiante && <PerfilEstudiante/>}
                    {verCalendario && <CalendarioEstudiante/>}
                    {verBuzonNotificaciones && <BuzonNotificaciones/>}
                </div>
            </div>

        </div>

    );
}

export default HomeStudent;