import {  useState } from "react";
import Sidebar from "../components/sideBar";
import Navbar from "../components/Navbar";
import ListaActividades from "../components/listaActividades";
import ListaEstudiantes from "../components/listaEstudiantes";
import ListaProfesores from "../components/listaProfesores";
import { useLocation } from "react-router-dom";

const Home = (req, res) => {
    const {state} = useLocation();
    const {usuario} = state || {};


    const [todosLosProfes, setTodosLosProfes] = useState(true);
    const [profesLista, setProfesLista] = useState(false);
    const [estudiantesLista, setEstudiantesLista] = useState(false);
    const [siguienteActividad, setSiguienteActividad] = useState(false);
    
    
    return (
        <div className="home"> 
            <Navbar id = {usuario.firstname} apellido = {usuario.firstLastname}/>
            <div className="horizontal-container"> {/* This div is added */}
                <Sidebar s1={setTodosLosProfes} s2={setProfesLista} s3={setEstudiantesLista} s4={setSiguienteActividad}/>
                <div className="contenedorListas">
                    {todosLosProfes && <ListaProfesores campus={usuario.campus}/>}
                    {profesLista && <div className="contenido"><p>Todos los profesores</p></div>}
                    {estudiantesLista && <ListaEstudiantes campus={usuario.campus}/>}
                    {siguienteActividad && <><ListaActividades/></>}
                </div>
            </div>
            
        </div>
    )
}

export default Home;
