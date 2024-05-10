import React from 'react';
import InfoProfeCoordinador from './infoProfeCoordinador';
import '../components/listaEquipoGuia.css'
import ListaProfGuia from './listaProfGuia';
import ListaEstuGuia from './listaEstuGuia';

const ListaEquipoGuia = ({equipo, setCambios}) => {
    
    return (
        <div className='listaProfesores'>
            <h2>Equipo Guía Primer Ingreso 20{equipo.generation}</h2>
            <h3>Profe coordinador</h3>
            <InfoProfeCoordinador prof={equipo.guideProfessor}/>
            <div className="estudiantesYprofes">
                <div className="profesGuias">
                    <h2>Profesores del Equipo</h2>
                    <ListaProfGuia profes={equipo.professors} equipo={equipo} setCambios = {setCambios}/>
                </div>
                <div className="estudiantesGuias">
                    <h2>Estudiantes del equipo</h2>
                    <ListaEstuGuia estudiantes={equipo.students}/>
                </div>
            </div>
        </div>
    );
}

export default ListaEquipoGuia;
