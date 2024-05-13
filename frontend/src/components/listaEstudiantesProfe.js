import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
import "../components/listaEstudiantes.css"
import InfoEstudianteProfe from './infoEstudianteProfe';


const ListaEstudiantesProfe = ({campus, usuario}) => {


    const [estudiantes, setEstudiantes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/students/');
                setEstudiantes(response.data)
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    return (
        <div>
            <div className="listaEstudiantes">
            <h2>Estudiantes de la sede</h2>
            <div className="dropdown">
                <select>
                    <option value="team1">Ordenar por....</option>
                    <option value="team2">Orden alfabético</option>
                    <option value="team3">Carné</option>
                    <option value="team4">Campus</option>
                </select>
            </div>
            {estudiantes && estudiantes.map((estudiante) => (
                <InfoEstudianteProfe key={estudiante.id} estudiante={estudiante} usuario={usuario} campus={campus}/>
            ))}
        </div>
        </div>
    );
}

export default ListaEstudiantesProfe;
