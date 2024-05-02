import { useState, useEffect } from "react";
import "../components/listaEstudiantes.css"
import InfoEstudiante from "./infoEstudiante";
import axios from 'axios';

const ListaEstudiantes = ({ campus, sTP, sPL, sEL, sA, sAE }) => {
    
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

    const agregarEstudiante = () => {
        sTP(false);
        sPL(false);
        sEL(false);
        sA(false);
        sAE(true);
    }
    
    return ( 
        <div className="listaEstudiantes">
            <h2>Estudiantes de la sede</h2>
            <button onClick={agregarEstudiante} className="btnAgregarEstudiante">Agregar Estudiante</button>
            <div className="dropdown">
                <select>
                    <option value="team1">Ordenar por....</option>
                    <option value="team2">Orden alfabético</option>
                    <option value="team3">Carné</option>
                    <option value="team4">Campus</option>
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