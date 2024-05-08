import React from 'react';
import InfoProfeGuia from './infoProfeGuia';

const ListaProfGuia = ({profes, equipo}) => {
    
    return (
        <div className='listaProfesores'>
            {profes && profes.map((profe) => (
                <InfoProfeGuia key={profe._id} profe={profe} equipoId={equipo._id}/>
            ))}
        </div>
    );
}

export default ListaProfGuia;
