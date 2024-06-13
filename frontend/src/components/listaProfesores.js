
import React, { useEffect, useState } from "react";
import "../components/listaProfesores.css";
import InfoProfesor from "./infoProfesor";
import ProfessorFacade from '../PatronFacade/ProfeFacade';

const ListaProfesores = ({ campus, usuario, equipo, id, sE, limpiar, setCambios, adminMadre }) => {
    const [professors, setProfessors] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ProfessorFacade.fetchProfessors();
                setProfessors(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="listaProfesores">
            <h2>Profesores de la sede</h2>
            {professors && professors.map((professor, index) => (
                (professor.campus === campus) && (
                    <InfoProfesor
                        equipo={equipo}
                        key={index}
                        professor={professor}
                        usuario={usuario}
                        limpiar={limpiar}
                        setCambios={setCambios}
                        adminMadre={adminMadre}
                    />
                )
            ))}
        </div>
    );
};

export default ListaProfesores;
