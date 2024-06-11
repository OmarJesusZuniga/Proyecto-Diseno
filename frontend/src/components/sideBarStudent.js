import React from 'react';
import '../components/sideBar.css';
import { useEffect } from "react";

const SideBarStudent = ({perfil, todosFalse, calendario, buzon}) => {

    useEffect(() => {
        
    }, []);

    const accederPerfilEstudiante = () => {
        todosFalse();;
        perfil(true);
    }

    const verCalendario = () => {
        todosFalse();
        calendario(true);
    }

    const verBuzon = () => {
        todosFalse();
        buzon(true);
        
    }
    
    return (
        <div className='sidebar'>
            <ul>
                <li>
                    <div className="dropdown">
                        <h2>Menú</h2>
                    </div>
                </li>
                <li>
                    <div className="section">
                        <h2>Perfil estudiante</h2>
                        <button onClick={accederPerfilEstudiante}>Acceder</button>
                    </div>
                </li>
                <li>
                   <div className="section">
                       <h2>Calendario</h2>
                       <button onClick={verCalendario} className="botonAzul">Ver calendario</button>
                   </div>
                </li>
                <li>
                   <div className="section">
                       <h2>Buzón de notificaciones</h2>
                       <button onClick={verBuzon} className="botonAzul">Ver buzón</button>
                   </div>
                </li>
            </ul>
        </div>
    );
}

export default SideBarStudent;
