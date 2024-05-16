import { useState, useEffect } from "react";
import "../components/listaEstudiantes.css";
import InfoEstudiante from "./infoEstudiante";
import axios from 'axios';
import * as XLSX from 'xlsx';

const ListaEstudiantes = ({ campus, sTP, sPL, sEL, sA }) => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://proyecto-diseno-ol06.onrender.com/api/students/');
                const datosEstudiantes = response.data;
                setEstudiantes(datosEstudiantes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchEstudiantes = async () => {
            try {
                const response = await axios.get(`https://proyecto-diseno-ol06.onrender.com/api/students?sort=${sortOption}`);
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

    const createAndDownloadExcel = () => {
        const fieldsToInclude = ['studentCard', 'firstLastname', 'secondLastname', 'firstname', 'middlename', 'email', 'phoneNumber', 'campusCode'];

        const campuses = {};
        estudiantes.forEach((estudiante) => {
            if (!campuses[estudiante.campusCode]) {
                campuses[estudiante.campusCode] = [];
            }
            
            const filteredEstudiante = {};
            fieldsToInclude.forEach(field => {
                filteredEstudiante[field] = estudiante[field];
            });
            campuses[estudiante.campusCode].push(filteredEstudiante);
        });

        const workbook = XLSX.utils.book_new();

        for (const campus in campuses) {
            const worksheet = XLSX.utils.json_to_sheet(campuses[campus]);
            XLSX.utils.book_append_sheet(workbook, worksheet, campus);
        }

        XLSX.writeFile(workbook, 'Estudiantes.xlsx');
    };

    return ( 
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
            <button className="dropdown" onClick={createAndDownloadExcel}>Descargar Excel</button>
            {estudiantes && estudiantes.map((estudiante) => (
                (estudiante.campus === campus) && (
                    <InfoEstudiante key={estudiante.id} estudiante={estudiante} />
                )
            ))}
        </div>
    );
}

export default ListaEstudiantes;
