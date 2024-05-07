import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import SideBarProfe from "../components/sideBarProfe";
import ListaEstudiantesProfe from "../components/listaEstudiantesProfe";
import ListaActividadesProfe from "../components/listaActividadesProfe";
import ListaObservaciones from "../components/listaObservaciones";
import agregarActividadPage from "../components/agregarActividad";

const HomeProfe = () => {
    const {state} = useLocation();
    const {usuario} = state || {};



    const [listaProfes, setProfes] = useState(true)
    const [listaActividadesProfe, setActividadesProfe] = useState(false)
    const [listaObservaciones, setObservaciones] = useState(false)
    const [listaEstudiantes, setEstudiantes] = useState(false)
    const [bienvenida, setBienvenida] = useState(true);
    const [agregarActividad, setAgregarActividad] = useState(false)

    const todoFalse = () => {
        setActividadesProfe(false);
        setProfes(false);
        setObservaciones(false);
        setEstudiantes(false);
        setBienvenida(false);
    }
    
    const [grupo, setGrupo] = useState();

    const [actividad, setActividadSeleccionada] = useState([]);
    
    return (
        <div className="home"> 
            <Navbar  id={usuario.firstname} apellido={usuario.firstLastname}/>
            <div className="horizontal-container">
                <SideBarProfe usuario={usuario} sP = {setProfes} sA = {setActividadesProfe} sO = {setObservaciones} sE={setEstudiantes} sB ={setBienvenida} id={usuario._id} grupo={setGrupo}/>
                <div className="contenedorListas">
                    {bienvenida && <div className="contenido"><h1>Bienvenido, profesor</h1></div>}
                    {listaEstudiantes && <ListaEstudiantesProfe campus={usuario.campus}/> }
                    {listaObservaciones && <ListaObservaciones usuario={usuario} todosFalse={todoFalse} sO = {setObservaciones}/>}
                    {listaActividadesProfe && <ListaActividadesProfe
                                                                    grupo={grupo} 
                                                                    listaIdActividad={actividad}
                                                                    usuario={usuario} 
                                                                    todosFalse={todoFalse} 
                                                                    sO ={setObservaciones}
                                                                    setActividad = {setActividadSeleccionada}
                                                                    agregarActividad = {setAgregarActividad}/>}
                    {agregarActividad && <agregarActividadPage />}
                </div>

            </div>
            
        </div>
    );
}

export default HomeProfe;



