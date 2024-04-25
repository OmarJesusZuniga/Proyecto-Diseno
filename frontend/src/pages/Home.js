import { useEffect, useState } from "react";
import Sidebar from "../components/sideBar";
import Navbar from "../components/Navbar";
import ListaEstudiantes from "../components/listaEstudiantes";
import { useParams } from "react-router-dom";

const Home = () => {
    const {id} = useParams();
    const [todosLosProfes, setTodosLosProfes] = useState(true);
    const [profesLista, setProfesLista] = useState(false);
    const [estudiantesLista, setEstudiantesLista] = useState(false);
    const [siguienteActividad, setSiguienteActividad] = useState(false);
    
    
    return (
        <div className="home"> 
            <Navbar id={id}/>
            <div className="horizontal-container"> {/* This div is added */}
                <Sidebar s1={setTodosLosProfes} s2={setProfesLista} s3={setEstudiantesLista} s4={setSiguienteActividad}/>
                {todosLosProfes && <div className="contenido"><p>Todos los profesores</p></div>}
                {profesLista && <div className="contenido"><p>Profes equipo guia</p></div>}
                {estudiantesLista && <ListaEstudiantes/>}
                {siguienteActividad && <div className="contenido"><p>Siguiente Actividad</p></div>}
            </div>
            
        </div>
    )
}

export default Home;
