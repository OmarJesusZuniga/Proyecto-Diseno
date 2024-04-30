import React from 'react';
import '../components/sideBar.css';


const SideBarProfe = ({sA, sE, sB, sP}) => {

    const dejarProfes = () => {
        sB(false);
        sA(false);
        sE(false);
        sP(true);
    }

    const dejarEstudiantes = () => {
        sB(false);
        sA(false);
        sP(false);
        sE(true);
    }

    const dejarActividades = () => {
        sB(false);
        sP(false);
        sE(false);
        sA(true);
    }



    return (
        <div className='sidebar'>
            <ul>
                <li>
                    <div className="dropdown">
                        <h2>Equipo Guía</h2>
                        <select>
                            <option  value="team1">Equipo guía primer ingreso</option>
                        </select>
                    </div>
                </li>
                <li>
                    <div className="section">
                        <h2>Profesores de equipo guía</h2>
                        <button onClick={dejarProfes}>Ver lista</button>
                    </div>
                </li>
                <li>
                   <div className="section">
                       <h2>Estudiantes</h2>
                       <button onClick={dejarEstudiantes} className="botonAzul">Ver lista</button>
                   </div>
                </li>
                <li>
                   <div className="section">
                       <h2>Actividades</h2>
                       <button onClick={dejarActividades} className="botonAzul">Ver actividades</button>
                   </div>
                </li>
            </ul>
        </div>
    );
}

export default SideBarProfe;
