
import '../components/infoProfeCoordinador.css';
import React from 'react';
import ProfessorFacade from '../PatronFacade/ProfeFacade';

const InfoProfeCoordinador = ({ prof, adminMadre, equipoId, setCambios }) => {
    const eliminarProf = async () => {
        try {
            await ProfessorFacade.removeGuideProfessor(equipoId);
            setCambios('cambio');
        } catch (error) {
            console.log(error);
        }
    };

    if (prof === null) {
        return (
            <div className="cartaProfeCoord"></div>
        );
    } else {
        return (
            <div className='cartaProfeCoord'>
                <h2>Nombre: {prof.firstname} {prof.middlename} {prof.firstLastname} {prof.secondLastname}</h2>
                <h2>Email: {prof.email}</h2>
                <h4>Número de teléfono: {prof.phoneNumber}</h4>
                <h4>Número de oficina: {prof.officeNumber}</h4>
                <div className="botonesProfesor">
                    {adminMadre && <button onClick={eliminarProf}>Dar de baja</button>}
                </div>
            </div>
        );
    }
}

export default InfoProfeCoordinador;
