import {  useState } from "react";
import Sidebar from "../components/sideBar";
import Navbar from "../components/Navbar";
import ListaActividades from "../components/listaActividades";
import ListaEstudiantes from "../components/listaEstudiantes";
import ListaProfesores from "../components/listaProfesores";
import { useLocation } from "react-router-dom";
import AgregarEstudiante from "../components/agregarEstudiante";

const Home = (req, res) => {
    const {state} = useLocation();
    const {usuario} = state || {};


    const [todosLosProfes, setTodosLosProfes] = useState(true);
    const [profesLista, setProfesLista] = useState(false);
    const [estudiantesLista, setEstudiantesLista] = useState(false);
    const [siguienteActividad, setSiguienteActividad] = useState(false);
    const [agregarEstudiante, setAgregEstu] = useState(false);
    
    
    return (
        <div className="home"> 
            <Navbar id = {usuario.firstname} apellido = {usuario.firstLastname}/>
            <div className="horizontal-container">
                <Sidebar s1={setTodosLosProfes} s2={setProfesLista} s3={setEstudiantesLista} s4={setSiguienteActividad} sAE={setAgregEstu}/>
                <div className="contenedorListas">
                    {todosLosProfes && <ListaProfesores campus={usuario.campus} usuario={usuario}/>}
                    {profesLista && <div className="contenido"><p>Todos los profesores</p></div>}
                    {estudiantesLista && <ListaEstudiantes campus={usuario.campus} sTP ={setTodosLosProfes} sPL={setProfesLista} sEL={setEstudiantesLista} sA={setSiguienteActividad} sAE={setAgregEstu}/>}
                    {siguienteActividad && <><ListaActividades/></>}
                    {agregarEstudiante && <AgregarEstudiante campus={usuario.campus} sTP ={setTodosLosProfes} sPL={setProfesLista} sEL={setEstudiantesLista} sA={setSiguienteActividad} sAE={setAgregEstu}/>}
                </div>
            </div>
            
        </div>
    )
}

export default Home;
