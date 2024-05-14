import React from 'react';
import './infoEstuGuia.css'

const InfoEstuGuia = ({estudiante}) => {
    return (
        <div className="cartaProfesor">
            
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
    );
}

export default InfoEstuGuia;
