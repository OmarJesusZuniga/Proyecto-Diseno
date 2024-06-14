import React, { useEffect, useState, useCallback } from 'react';
import '../components/sideBar.css';
import SideBarProfeFacade from '../PatronFacade/SideBarProfeFacade';

const SideBarProfe = ({ sA, sE, sP, id, todosFalse, equipos, cambiosDeEquipo, setIdEquipoSeleccionado, idEquipoSeleccionado, limpiarPantalla, setCambios, sES, sEquipos, sC }) => {

    // Refactored function to fetch team
    const fetchTeam = useCallback(async (teamId) => {
        limpiarPantalla();
        sC(true);
        try {
            const guideTeam = await SideBarProfeFacade.fetchGuideTeam(teamId);
            sES(guideTeam);
            setIdEquipoSeleccionado(guideTeam._id);
            sC(false);
            setCambios('');
            dejarProfes();
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }, [limpiarPantalla, sC, sES, setIdEquipoSeleccionado, setCambios]);

    // Effect to fetch the selected team
    useEffect(() => {
        if (idEquipoSeleccionado !== null) {
            fetchTeam(idEquipoSeleccionado);
        }
    }, [idEquipoSeleccionado]);

    // Effect to fetch teams for the professor
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const professorTeams = await SideBarProfeFacade.fetchProfessorTeams(id);
                sEquipos(professorTeams);
                if (professorTeams.length > 0) {
                    sES(professorTeams[0]);
                    setIdEquipoSeleccionado(professorTeams[0]._id);
                }
                sC(false);
                dejarProfes();
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchTeams();
    }, [id, sC, sES, sEquipos, setIdEquipoSeleccionado]);

    const changeEquipo = (event) => {
        limpiarPantalla();
        setIdEquipoSeleccionado(event.target.value);
        setCambios('cambio');
    };

    const dejarProfes = () => {
        todosFalse();
        sP(true);
    };

    const dejarEstudiantes = () => {
        todosFalse();
        sE(true);
    };

    const dejarActividades = () => {
        todosFalse();
        sA(true);
    };

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
