import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import SideBarProfe from "../components/sideBarProfe";
import ListaEstudiantesProfe from "../components/listaEstudiantesProfe";
import ListaActividadesProfe from "../components/listaActividadesProfe";
import ListaObservaciones from "../components/listaObservaciones";
import ListaComentarios from "../components/listaComentarios";
import AgregarObservacion from "../components/agregarObservacion";
import AgregarActividad from "../components/agregarActividad";
import AgregarComentario from "../components/agregarComentario";
import EditarActividad from "../components/editarActividad";
import EditarEstado from "../components/editarEstado"

const HomeProfe = () => {
    const {state} = useLocation();
    const {usuario} = state || {};



    const [listaProfes, setProfes] = useState(true)
    const [listaActividadesProfe, setActividadesProfe] = useState(false)
    const [listaObservaciones, setObservaciones] = useState(false)
    const [agregarObservacion, setAgregarObservacion] = useState(false)
    const [agregarComentario, setAgregarComentario] = useState(false)
    const [listaEstudiantes, setEstudiantes] = useState(false)
    const [bienvenida, setBienvenida] = useState(true);
    // Agregar Actividad
    const [agregarActividad, setAgregarActividad] = useState(false)
    const [planActual, setPlanActual] = useState(null);
    // Editar Actividada
    const [editarActividad, setEditarActividad] = useState(false);
    const [actividadAEditar, setActividadAEditar] = useState(null);
    const [grupo, setGrupo] = useState();

    const [observationIDList, setObservationIDList] = useState([]);
    const [activityId, setActivityID] = useState([]);
    const [commentIDList, setCommentIDList] = useState([]);
    // Modificar Estado 
    const [editarEstado, setEditarEstado] = useState(false);
    const [estadoAEditar, setEstadoAEditar] = useState(null);


    const todoFalse = () => {
        setProfes(false);
        setActividadesProfe(false);
        setProfes(false);
        setEditarActividad(false);
        setObservaciones(false);
        setAgregarObservacion(false);
        setAgregarComentario(false);
        setEstudiantes(false);
        setBienvenida(false);
        setAgregarActividad(false);
        setPlanActual(false);
        setObservationIDList([]);
        setCommentIDList([]);
        setEditarEstado(false);
    }
    
    return (
        <div className="home"> 
            <Navbar  id={usuario.firstname} apellido={usuario.firstLastname}/>
            <div className="horizontal-container">
                <SideBarProfe usuario={usuario} sP = {setProfes} sA = {setActividadesProfe} sE={setEstudiantes} todosFalse={todoFalse} id={usuario._id} grupo={setGrupo}/>
                <div className="contenedorListas">
                    {bienvenida && <div className="contenido"><h1>Bienvenido, profesor</h1></div>}
                    {listaEstudiantes && <ListaEstudiantesProfe campus={usuario.campus}/> }
                    {listaObservaciones && <ListaObservaciones idActivity={activityId} usuario={usuario} todosFalse={todoFalse} sAgregarObservacion={setAgregarObservacion} commentIDList={setCommentIDList}/>}
                    {listaActividadesProfe && <ListaActividadesProfe
                                                                    // Generales
                                                                    grupo={grupo} 
                                                                    usuario={usuario} 
                                                                    // 
                                                                    todosFalse={todoFalse} 
                                                                    sO ={setObservaciones}
                                                                    // Actividades
                                                                    editarActividad ={setEditarActividad}
                                                                    setActividadActual = {setActividadAEditar}
                                                                    // Observaciones
                                                                    observationIDList = {setObservationIDList}
                                                                    // Agregar Actividad
                                                                    agregarActividad = {setAgregarActividad}
                                                                    setPlanActual={setPlanActual}
                                                                    // Editar Estado
                                                                    setEditarEstado={setEditarEstado}
                                                                    setEstadoAEditar={setEstadoAEditar}
                                                                    // Activity 
                                                                    idActivity={setActivityID}
                                                                    />}
                    {agregarObservacion && <AgregarObservacion usuario={usuario} idActivity={activityId} todosFalse={todoFalse} returnPage={setObservaciones} />}
                    {agregarComentario && <AgregarComentario usuario={usuario}/>}
                    
                    {agregarActividad && <AgregarActividad reset={todoFalse} returnPage={setActividadesProfe} plan={planActual}/>}
                    {editarActividad && <EditarActividad reset={todoFalse} returnPage={setActividadesProfe} actividad={actividadAEditar} />}
                    {editarEstado && <EditarEstado reset={todoFalse} returnPage={setActividadesProfe} estado={estadoAEditar}/>}
                </div>

            </div>
            
        </div>
    );
}

export default HomeProfe;



