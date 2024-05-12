import axios from 'axios';
import React from 'react';

const InfoProfeGuia = ({profe, equipoId, setCambios, isProfe}) => {


    const darDeBaja = async () => {

        axios.post("http://localhost:4000/api/guideTeam/removeProfe/", {guideTeamId: equipoId, professorId: profe._id})
        .then(response => {
            console.log(response.data);
            setCambios('cambio');
        })
        .catch(error => {
            console.error('Error removing professor:', error);
        });
    }


    return (
        <div className='cartaProfesor'>
            <h2>{profe.firstname} {profe.firstLastname}</h2>
    
            <div>
                <h3>Teléfono-Celular: </h3>
                <h5>{profe.phoneNumber}</h5>
            </div>
            <div>
                <h3>Teléfono-Oficina: </h3>
                <h5>{profe.officeNumber}</h5>
            </div>
            <div>
                <h3>Correo:</h3>
                <h5>{profe.email}</h5>
            </div>
            <div>
                <h3>Código: </h3>
                <h5>{profe.code}</h5>
            </div>

            <div className="botonesProfesor">
                {!isProfe && <button onClick={darDeBaja}>Dar de baja</button>}
            </div>

        </div>
    );
}

export default InfoProfeGuia;
