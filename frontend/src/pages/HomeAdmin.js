import { useEffect, useState } from "react";
import './HomeAdmin.css';
import Navbar from "../components/Navbar";

const HomeAdmin = () => {
    return (       

        <div className="container">
            <Navbar/>
            <div className="dropdown">
                <select>
                    <option value="team1">Equipo guía primer ingreso</option>
                </select>
            </div>
            <div className="section">
                <h2>Profesores guía</h2>
                <button>Ver todos los profesores</button>
                <button>Ver lista</button>
            </div>
            <div className="section">
                <h2>Estudiantes</h2>
                <button>Ver lista</button>
            </div>
            <div className="section">
                <h2>Actividades</h2>
                <button>Ver siguiente actividad</button>
            </div>
        </div>
        
    );
}

export default HomeAdmin;