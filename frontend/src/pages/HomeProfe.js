import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import SideBarProfe from "../components/sideBarProfe";
import ListaEstudiantesProfe from "../components/listaEstudiantesProfe";
import ListaActividadesProfe from "../components/listaActividadesProfe";
import ListaObservaciones from "../components/listaObservaciones";

const HomeProfe = () => {
    const {state} = useLocation();
    const {usuario} = state || {};

    const [listaProfes, setProfes] = useState(true)
    const [listaActividades, setActividades] = useState(false)
    const [ListaObservaciones, setObservaciones] = useState(false)
    const [listaEstudiantes, setEstudiantes] = useState(false)
    const [bienvenida, setBienvenida] = useState(true);
    
    const [grupo, setGrupo] = useState();
    
    return (
        <div className="home"> 
            <Navbar  id={usuario.firstname} apellido={usuario.firstLastname}/>
            <div className="horizontal-container">
                <SideBarProfe usuario={usuario} sP = {setProfes} sA = {setActividades} sO = {setObservaciones} sE={setEstudiantes} sB ={setBienvenida} id={usuario._id} grupo={setGrupo}/>
                <div className="contenedorListas">
                    {bienvenida && <div className="contenido"><h1>Bienvenido, profesor</h1></div>}
                    {listaEstudiantes && <ListaEstudiantesProfe campus={usuario.campus}/> }
                    {ListaObservaciones && <ListaObservaciones usuario={usuario} campus={usuario.campus}/>}
                    {listaActividades && <ListaActividadesProfe grupo={grupo} usuario={usuario} />}
                </div>

            </div>
            
        </div>
    );
}

export default HomeProfe;



