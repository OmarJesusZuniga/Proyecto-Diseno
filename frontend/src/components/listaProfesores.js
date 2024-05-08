import React, { useEffect, useState } from "react";
import "../components/listaProfesores.css";
import InfoProfesor from "./infoProfesor";
import axios from 'axios';

const ListaProfesores = ({ campus , usuario, equipo, id, sE, limpiar}) => {
    const [professors, setProfessors] = useState([]);
    useEffect(() => {
        const fetchTeams = () => {
            axios.post('http://localhost:4000/api/guideTeam/assistant/get', {id: id})
                .then(response => {
                    sE(response.data);
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                });
        };
    
        fetchTeams();
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/professors/');
                setProfessors(response.data);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    
    return ( 
        <div className="listaProfesores">
            <h2>Profesores de la sede </h2>
            {professors && professors.map((professor, index) => (
                
                (professor.campus === campus) && <InfoProfesor 
                                                  equipo={equipo} 
                                                  key={index} 
                                                  professor={professor} 
                                                  usuario={usuario}
                                                  limpiar={limpiar}/>
            ))}
        </div>
    );
};

export default ListaProfesores;