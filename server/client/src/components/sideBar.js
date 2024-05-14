import React, { useEffect, useState } from 'react';
import './sideBar.css'; // You can define your sidebar styles in this file
import axios from 'axios';

const Sidebar = ({s1, s2, s3, s4,  sE, sES, id, equipos, sC, setIdEquipoSeleccionado, idEquipoSeleccionado, limpiarPantalla,
    cambiosDeEquipo, setCambios, sAP, usuario
}) => {

    useEffect(() => {

        if (idEquipoSeleccionado === null){
            
        } else {
            const getTeam = async () => {
                limpiarPantalla();
                sC(true);
                axios.post('http://localhost:4000/api/guideTeam/assistant/get', {id: id})
                .then(response => {
                    sE(response.data);
                })
                axios.get('http://localhost:4000/api/guideTeam/'+idEquipoSeleccionado)
                    .then(response => {
                        sES(response.data);
                        setIdEquipoSeleccionado(response.data._id);
                        sC(false);
                        setCambios('');
                        dejarPrimera();
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
            axios.post('http://localhost:4000/api/guideTeam/assistant/get', {id: id})
                .then(response => {
                    sE(response.data);
                    sES(response.data[0]);
                    setIdEquipoSeleccionado(response.data[0]._id);
                    sC(false);
                    dejarPrimera();
                    
                    
                    
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                });
        };
    
        fetchTeams();
        
    }, []);

    const changeEquipo = (e) => {
        s1(false);
        s2(false);
        s3(false);
        s4(false);
        sAP(false);
        setIdEquipoSeleccionado(e.target.value);
        setCambios('cambio');        
    }


    const dejarPrimera = () =>{
        s1(true);
        s2(false);
        s3(false);
        s4(false);
        sAP(false);
        
    }
    const dejarSegunda = () =>{
        s1(false);
        s2(true);
        s3(false);
        s4(false);
        sAP(false);
        
    }
    const dejarTercera = () =>{
        s1(false);
        s2(false);
        s3(true);
        s4(false);
        sAP(false);
        
    }
    const dejarCuarta = () => {
        s1(false);
        s2(false);
        s3(false);
        s4(true);
        sAP(false);
        
    }

    const addProfeTab = () => {
        s1(false);
        s2(false);
        s3(false);
        s4(false);
        sAP(true);
    }

    async function crearEquipo() {
        
        const currentYear = new Date().getFullYear();
        const lastTwoDigits = currentYear % 100;

        axios.get('http://localhost:4000/api/professors/profesByCampus/'+usuario.campus)
        .then(response => {
            axios.post('http://localhost:4000/api/plan/', {profesorId: response.data[0]._id})
            .then(response2 => {
                axios.post('http://localhost:4000/api/guideTeam/createTeam', {
                    generation: lastTwoDigits, guideProfessor: response.data[0]._id, students: [], adminAssistants:[usuario._id], plan: response2.data._id, professors:[]
                })
                .then(response => {
                    setCambios('cambio');
                })
            })
        })
    } 


  return (
    <div className="sidebar">
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
            <div className="section">
            <button onClick ={crearEquipo} className="botonAzul">Crear Equipo</button>
            </div>
        </li>
        <li>
            <div className="section">
                <h2>Profesores guía</h2>
                <button onClick={dejarPrimera} className="botonAzul">Ver todos los profesores</button>
                <button onClick={dejarSegunda}>Ver lista</button>
                <button onClick={addProfeTab} className="botonAzul">Añadir un profesor</button>
            </div>
        </li>
        <li>
            <div className="section">
                <h2>Estudiantes</h2>
                <button onClick={dejarTercera}className="botonAzul">Ver lista</button>
            </div>
        </li>
        <li>
            <div className="section">
                <h2>Actividades</h2>
                <button onClick={dejarCuarta} className="botonAzul">Ver siguiente actividad</button>
            </div>
        </li>
        {/* Add more list items for your sidebar options */}
      </ul>
    </div>
  );
}

export default Sidebar;