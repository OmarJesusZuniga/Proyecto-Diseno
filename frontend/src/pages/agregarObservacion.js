import './agregarObservacion.css';
import Navbar from "../components/Navbar";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import SideBarProfe from "../components/sideBarProfe";

const AgregarObservacion = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {usuario, observation} = state || {};

    const [plan, setPlan] = useState([]);
    const [actividades, setActividad] = useState([]);
    const [listaProfes, setProfes] = useState(true)
    const [listaActividades, setActividades] = useState(false)
    const [listaEstudiantes, setEstudiantes] = useState(false)
    const [bienvenida, setBienvenida] = useState(true);
    const [grupo, setGrupo] = useState();

    const volver = () =>{
        navigate("/homeProfe", {state: {usuario}});
    }


    const submitModify = async (e) => {
        navigate("/homeProfe", {state: {usuario}});
    }
    return (       
        <div className="principal">
            <form >
                <Navbar id={usuario.firstname} apellido={usuario.firstLastname}/>
                <div className="horizontal-container">
                    <SideBarProfe usuario={usuario} sP = {setProfes} sA = {setActividades} sE={setEstudiantes} sB ={setBienvenida} id={usuario._id} grupo={setGrupo}/>
                    <div className="contenedorListas">
                        <h2>Observación</h2>

                        <h4>Escriba su observación</h4>
                        <div className="input-box">
                            <input type="text" value={"observation.text"} required />
                        </div>

                        <button onClick={volver}>Volver</button>
                        <button onClick={submitModify}>Guardar observación</button>
                    </div>
                </div>
            </form>

        </div>
        
    );
}

export default AgregarObservacion;