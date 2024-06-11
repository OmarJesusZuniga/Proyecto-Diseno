import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
import "../components/listaEstudiantes.css"
import InfoEstudianteProfe from './infoEstudianteProfe';


const ListaEstudiantesProfe = ({campus, usuario}) => {


    const [estudiantes, setEstudiantes] = useState([]);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchEstudiantes = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/students?sort=${sortOption}`);
                setEstudiantes(response.data);
            } catch (error) {
                console.error('Failed to fetch students:', error);
            }
        };

        if (sortOption) { // Only fetch if a sort option is selected
            fetchEstudiantes();
        }
    }, [sortOption]); 

    const handleSortChange = (event) => {
        const value = event.target.value;
        switch (value) {
            case 'team2':
                setSortOption('firstname');
                break;
            case 'team3':
                setSortOption('studentCard');
                break;
            case 'team4':
                setSortOption('campus');
                break;
            default:
                setSortOption('');
                break;
        }
    };


    return (
        <div>
            <div className="listaEstudiantes">
            <h2>Estudiantes de la sede</h2>
            <div className="dropdown">
                <select onChange={handleSortChange}>
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
