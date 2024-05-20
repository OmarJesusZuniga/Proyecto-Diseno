import React, {  useState } from "react";
import Sidebar from "../components/sideBar";
import Navbar from "../components/Navbar";
import ListaActividades from "../components/listaActividades";
import ListaEstudiantes from "../components/listaEstudiantes";
import ListaProfesores from "../components/listaProfesores";
import ListaActividadesProfe from "../components/listaActividadesProfe";

import { useLocation } from "react-router-dom";
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

// Para el excel

import ListaEquipoGuia from "../components/listaEquipoGuia";
import AddProfe from "../components/addProfe";

const Home = (req, res) => {
    const {state} = useLocation();
    const {usuario} = state || {};


    const [todosLosProfes, setTodosLosProfes] = useState(false);
    const [profesLista, setProfesLista] = useState(false);
    const [estudiantesLista, setEstudiantesLista] = useState(false);
    const [siguienteActividad, setSiguienteActividad] = useState(false);
    const [addProfe, setAddprofe] = useState(false);    

    const [cambiosDeEquipo, setCambios] = useState('');
    const [cargando, setCargando] = useState(true);
    const [idEquipoSeleccionado, setIdEquipoSeleccionado] = useState(null);


    const [editarActividad, setEditarActividad] = useState(false);
    const [listaObservaciones, setObservaciones] = useState(false)
    const [actividadAEditar, setActividadAEditar] = useState(null);
    const [observationIDList, setObservationIDList] = useState([]);
    const [agregarActividad, setAgregarActividad] = useState(false)
    const [planActual, setPlanActual] = useState(null);
    const [editarEstado, setEditarEstado] = useState(false);
    const [estadoAEditar, setEstadoAEditar] = useState(null);
    const [activityId, setActivityID] = useState([]);

    const limpiarPantalla = () => {
        setTodosLosProfes(false);
        setProfesLista(false);
        setEstudiantesLista(false);
        setSiguienteActividad(false);
    }
    

    //Equipos guia y equipo seleccionado

    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null)
    const [equipos, setEquipos] = useState([])
    const isProfe = false;


    
    // Excel
    
    const navigate = useNavigate();

    


    return (
        <div className="home"> 
            <Navbar id = {usuario.firstname} apellido = {usuario.firstLastname}/>
            <div className="horizontal-container">
                <Sidebar 
                s1={setTodosLosProfes} 
                s2={setProfesLista} 
                s3={setEstudiantesLista} 
                s4={setSiguienteActividad}  
                sE={setEquipos} 
                sES={setEquipoSeleccionado}
                sC ={setCargando}
                id={usuario._id}
                equipos={equipos}
                cambios = {cambiosDeEquipo}
                setIdEquipoSeleccionado={setIdEquipoSeleccionado}
                idEquipoSeleccionado={idEquipoSeleccionado}
                limpiarPantalla={limpiarPantalla}
                cambiosDeEquipo={cambiosDeEquipo}
                setCambios={setCambios}
                sAP={setAddprofe}
                usuario={usuario}/>


                
                <div className="contenedorListas">
                    {cargando && <h2>Cargando</h2>}
                    {todosLosProfes && <ListaProfesores 
                                        campus={usuario.campus} 
                                        usuario={usuario} 
                                        equipo={equipoSeleccionado}
                                        id={usuario._id}
                                        sE={setEquipos}
                                        limpiar = {limpiarPantalla}
                                        setCambios = {setCambios}
                                        adminMadre={usuario.adminMadre}/>}
                    {profesLista && <ListaEquipoGuia equipo={equipoSeleccionado} setCambios = {setCambios} isProfe={isProfe} adminMadre={usuario.adminMadre} campusUsuario={usuario.campus}/>}
                    {estudiantesLista && <ListaEstudiantes campus={usuario.campus} sTP ={setTodosLosProfes} sPL={setProfesLista} sEL={setEstudiantesLista} sA={setSiguienteActividad} />}
                    {siguienteActividad && <ListaActividadesProfe
                                            grupo={idEquipoSeleccionado} 
                                            usuario={usuario}
                                            todosFalse={limpiarPantalla}
                                            sO={setObservaciones}
                                            editarActividad={setEditarActividad}
                                            setActividadActual={setActividadAEditar}
                                            observationIDList={setObservationIDList}
                                            agregarActividad={setAgregarActividad}
                                            setPlanActual={setPlanActual}
                                            setEditarEstado={setEditarEstado}
                                            setEstadoAEditar={setEstadoAEditar}
                                            idActivity={setActivityID}
                                            adminAsis={true}/>}
                    {addProfe && <AddProfe campus={usuario.campus} setCambios={setCambios}/>}
                </div>
            </div>
            
        </div>
    )
}

export default Home;
