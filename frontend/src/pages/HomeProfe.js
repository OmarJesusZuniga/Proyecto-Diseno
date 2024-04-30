import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import SideBarProfe from "../components/sideBarProfe";

const HomeProfe = () => {
    const {state} = useLocation();
    const {usuario} = state || {};

    const [listaProfes, setProfes] = useState(true)
    const [listaActividades, setActividades] = useState(false)
    const [listaEstudiantes, setEstudiantes] = useState(false)
    const [bienvenida, setBienvenida] = useState(true);
    
    
    
    return (
        <div className="home"> 
            <Navbar  id={usuario.firstname} apellido={usuario.firstLastname}/>
            <div className="horizontal-container">
                <SideBarProfe sP = {setProfes} sA = {setActividades} sE={setEstudiantes} sB ={setBienvenida}/>
                <div className="contenedorListas">
                    {bienvenida && <div className="contenido"><h1>Bienvenido, profesor</h1></div>}
                    {}
                    {}
                    {}
                </div>

            </div>
            
        </div>
    );
}

export default HomeProfe;



