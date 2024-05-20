import React from 'react';
import '../components/sideBar.css';
import axios from 'axios';
import { useState, useEffect } from "react";

const SideBarProfe = ({sA, sE, sP, id, todosFalse, grupo, equipos, cambios, setIdEquipoSeleccionado, idEquipoSeleccionado,
                        limpiarPantalla, cambiosDeEquipo, setCambios, sES, sEquipos, sC
}) => {
    //const [equipos, setEquipo] = useState([]);

    useEffect(() => {

        if (idEquipoSeleccionado === null){
            
        } else {
            const getTeam = async () => {
                limpiarPantalla();
                sC(true);
                axios.get('https://proyecto-diseno-ol06.onrender.com/api/guideTeam/'+idEquipoSeleccionado)
                    .then(response => {
                        sES(response.data);
                        setIdEquipoSeleccionado(response.data._id);
                        sC(false);
                        setCambios('');
                        dejarProfes()
                    })
                    .catch(err => {
                        console.error('Error fetching data:', err);
                    });
            }
            getTeam();
        }
        
    }, [cambiosDeEquipo])


    useEffect(() => {
        const fetchTeams = async () => {
            axios.post('https://proyecto-diseno-ol06.onrender.com/api/guideTeam/profe/get', {id: id})
                .then(response => {
                    sEquipos(response.data);
                    sES(response.data[0]);
                    setIdEquipoSeleccionado(response.data[0]._id);
                    sC(false);
                    dejarProfes();
                    
                    
                    
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                });
        };
    
        fetchTeams();
        
    }, []);

    const changeEquipo = (event) => {
        limpiarPantalla()
        setIdEquipoSeleccionado(event.target.value);
        setCambios('cambio');
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
                                20{equipo.generation}
                            </option>
                        ))}
                        </select>
                    </div>
                </li>
                <li>
                    <div className="section">
                        <h2>Información Equipo Guía</h2>
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
