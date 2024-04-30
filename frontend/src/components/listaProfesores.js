import { useEffect, useState } from "react";
import "../components/listaProfesores.css";
import InfoProfesor from "./infoProfesor";
import axios from 'axios';

const ListaProfesores = ({ campus }) => {
    const [professors, setProfessors] = useState([]);

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
                
                professor.campus.includes(campus) && (
                    <InfoProfesor key={index} professor={professor} />
                )
            ))}
        </div>
    );
};

export default ListaProfesores;