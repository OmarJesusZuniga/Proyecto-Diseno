import React from 'react';
import {  useNavigate } from 'react-router-dom';
import "../components/infoEstudiante.css"

const InfoEstudianteProfe = ({estudiante , usuario, campus}) => {
    const navigate = useNavigate();


    const submitModify = async (e) => {
        navigate("/modEstudiante", {state: {usuario, estudiante}});
    }

    return (
        <div className="cartaEstudiante">
            <div className="infoEspecifica">
                <h2>{estudiante.firstname} {estudiante.firstLastname} {estudiante.secondLastname}</h2>
                <div>
                    <h3>Carné: </h3>
                    <h5>{estudiante.studentCard}</h5>
                </div>
                
                <div>
                    <h3>Correo: </h3>
                    <h5>{estudiante.email}</h5>
                </div>

                <div>
                    <h3>Celular: </h3>
                    <h5>{estudiante.phoneNumber}</h5>
                </div>

            </div>
            {
                campus.includes(estudiante.campus) && 
                <div className="botonesProfesor">
                    <button onClick={submitModify}> Modificar informacion</button>
                </div>
            }        
        </div>
    );
}

export default InfoEstudianteProfe;
