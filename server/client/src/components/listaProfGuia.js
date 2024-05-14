import React from 'react';
import InfoProfeGuia from './infoProfeGuia';

const ListaProfGuia = ({profes, equipo, setCambios, isProfe}) => {
    
    return (
        <div className='listaProfesores'>
            {profes && profes.map((profe) => (
                <InfoProfeGuia key={profe._id} profe={profe} equipoId={equipo._id} setCambios={setCambios} isProfe={isProfe}/>
            ))}
        </div>
    );
}

export default ListaProfGuia;
