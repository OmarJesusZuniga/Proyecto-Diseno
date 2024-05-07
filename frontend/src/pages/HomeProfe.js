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
    const [planActual, setPlanActual] = useState(null)

    const todoFalse = () => {
        setActividadesProfe(false);
        setProfes(false);
        setObservaciones(false);
        setEstudiantes(false);
        setBienvenida(false);
        setAgregarObservacion(false);
        setAgregarActividad(false);
        setObservationIDList(false);
        setCommentIDList(false);
        setAgregarActividad(false);
    }
    
    const [grupo, setGrupo] = useState();

    const [observationIDList, setObservationIDList] = useState(false);
    const [commentIDList, setCommentIDList] = useState(false);
    
    return (
        <div className="home"> 
            <Navbar  id={usuario.firstname} apellido={usuario.firstLastname}/>
            <div className="horizontal-container">
                <SideBarProfe usuario={usuario} sP = {setProfes} sA = {setActividadesProfe} sO = {setObservaciones} sE={setEstudiantes} sB ={setBienvenida} id={usuario._id} grupo={setGrupo}/>
                <div className="contenedorListas">
                    {bienvenida && <div className="contenido"><h1>Bienvenido, profesor</h1></div>}
                    {listaEstudiantes && <ListaEstudiantesProfe campus={usuario.campus}/> }
                    {listaObservaciones && <ListaObservaciones usuario={usuario} todosFalse={todoFalse} sAgregarObservacion={setAgregarObservacion} observationIDList={observationIDList} commentIDList={setCommentIDList}/>}
                    {listaActividadesProfe && <ListaActividadesProfe
                                                                    grupo={grupo} 
                                                                    usuario={usuario} 
                                                                    todosFalse={todoFalse} 
                                                                    sO ={setObservaciones}
                                                                    observationIDList = {setObservationIDList}
                                                                    agregarActividad = {setAgregarActividad}
                                                                    // setActividadSeleccionada = {setActividadSeleccionada}
                                                                    setPlanActual={setPlanActual}/>}
                    {agregarObservacion && <AgregarObservacion usuario={usuario} />}
                    {commentIDList && <ListaComentarios commentIDList={commentIDList} usuario={usuario} todosFalse={todoFalse} sAgregarComentarios={setAgregarComentario} />}
                    
                    {agregarActividad && <AgregarActividad reset={todoFalse} returnPage={setActividadesProfe} plan={planActual}/>}
                </div>

            </div>
            
        </div>
    );
}

export default HomeProfe;



