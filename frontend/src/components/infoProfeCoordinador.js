import '../components/infoProfeCoordinador.css'
import React from 'react';

const InfoProfeCoordinador = ({prof}) => {
    return (
        <div className='cartaProfeCoord'>
            <h2>Nombre: {prof.firstname} {prof.middlename} {prof.firstLastname} {prof.secondLastname}</h2>
            <h2>Email: {prof.email}</h2>
            <h4>Número de teléfono: {prof.phoneNumber}</h4>
            <h4>Número de oficina: {prof.officeNumber}</h4>
        </div>
    );
}

export default InfoProfeCoordinador;
