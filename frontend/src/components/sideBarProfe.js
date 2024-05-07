import React from 'react';
import '../components/sideBar.css';
import axios from 'axios';
import { useState, useEffect } from "react";

const SideBarProfe = ({sA, sE, sP, id, todosFalse, grupo}) => {
    const [equipos, setEquipo] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.post('http://localhost:4000/api/guideTeam/', { id: id });
                setEquipo(response.data)

                grupo(response.data[0]._id)
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const changeEquipo = (event) => {
        const selectedValue = event.target.value;
        grupo(selectedValue)
    };

    const dejarProfes = () => {
        todosFalse();;
        sP(true);
    }

    const dejarEstudiantes = () => {
        todosFalse();
        sE(true);
    }

    const dejarActividades = () => {
        todosFalse();
        sA(true);
        
    }

    return (
        <div className='sidebar'>
            <ul>
                <li>
                    <div className="dropdown">
                        <h2>Equipo Guía</h2>
                        <select onChange={changeEquipo}>
                        {equipos.map((equipo) => (
                            <option key={equipo._id} value={equipo._id}>
                                Generation {equipo.generation}
                            </option>
                        ))}
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
