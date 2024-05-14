import React from 'react';
import InfoEstuGuia from './infoEstuGuia';

const ListaEstuGuia = ({estudiantes}) => {
    return (
        <div className='listaProfesores'>
            {estudiantes.map((estudiante) => (
                <InfoEstuGuia key={estudiante._id} estudiante={estudiante}/>
            ))}

        </div>
    );
}

export default ListaEstuGuia;
