import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import React from 'react';
import SideBarProfe from "../components/sideBarProfe";

const HomeProfe = () => {
    const {state} = useLocation();
    const {usuario} = state || {};
    
    
    
    
    return (
        <div className="home">
            <Navbar  id={usuario.firstname} apellido={usuario.firstLastname}/>
            <div className="horizontal-container">
                <SideBarProfe/>
                <div className="contenedor lista">
                    
                </div>

            </div>
            
        </div>
    );
}

export default HomeProfe;



