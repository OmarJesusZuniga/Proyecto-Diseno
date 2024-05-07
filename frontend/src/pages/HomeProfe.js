import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import SideBarProfe from "../components/sideBarProfe";
import ListaEstudiantesProfe from "../components/listaEstudiantesProfe";
import ListaActividadesProfe from "../components/listaActividadesProfe";
import ListaObservaciones from "../components/listaObservaciones";
import ListaComentarios from "../components/listaComentarios";
import agregarActividadPage from "../components/agregarActividad";
import AgregarObservacion from "../components/agregarObservacion";

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
    const [agregarActividad, setAgregarActividad] = useState(false)

    const todoFalse = () => {
        setActividadesProfe(false);
        setProfes(false);
        setObservaciones(false);
        setEstudiantes(false);
        setBienvenida(false);
        setAgregarObservacion(false);
        setAgregarActividad(false);
        observationIDList(false);
        commentIDList(false);
    }
    
    const [grupo, setGrupo] = useState();

    const [observationIDList, setObservationIDList] = useState([]);
    const [commentIDList, setCommentIDList] = useState([]);
    
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
                                                                    agregarActividad = {setAgregarActividad}/>}
                    {agregarObservacion && <AgregarObservacion usuario={usuario} />}
                    {commentIDList && <ListaComentarios commentIDList={commentIDList} usuario={usuario} todosFalse={todoFalse} sAgregarComentarios={setAgregarComentario} />}
                    {agregarActividad && <agregarActividadPage />}
                </div>

            </div>
            
        </div>
    );
}

export default HomeProfe;



