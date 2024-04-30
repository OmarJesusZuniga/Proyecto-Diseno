import { useState, useEffect } from "react";
import "../components/listaEstudiantes.css"
import InfoEstudiante from "./infoEstudiante";
import axios from 'axios';

const ListaEstudiantes = ({ campus }) => {
    
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

    useEffect(() => {
        console.log(estudiantes);
    
    }, [estudiantes]);
    
    return ( 
        <div className="listaEstudiantes">
            <h2>Estudiantes de la sede</h2>
            <div className="dropdown">
                <select>
                    <option value="team1">Orden alfabético</option>
                    <option value="team2">Carné</option>
                    <option value="team1">Campus</option>
                </select>
            </div>
            {estudiantes && estudiantes.map((estudiante) => (
                (estudiante.campus === campus) && (
                    <InfoEstudiante key={estudiante.id} estudiante={estudiante} />
                )
            ))}
        </div>
    );
}
 
export default ListaEstudiantes;