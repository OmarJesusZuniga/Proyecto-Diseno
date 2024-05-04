import React, {  useState } from "react";
import Sidebar from "../components/sideBar";
import Navbar from "../components/Navbar";
import ListaActividades from "../components/listaActividades";
import ListaEstudiantes from "../components/listaEstudiantes";
import ListaProfesores from "../components/listaProfesores";
import AgregarEstudiante from "../components/agregarEstudiante";
import ListaObservaciones from "../components/listaObservaciones";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

// Para el excel
import * as XLSX from "xlsx";
import ListaEquipoGuia from "../components/listaEquipoGuia";

const Home = (req, res) => {
    const {state} = useLocation();
    const {usuario} = state || {};


    const [todosLosProfes, setTodosLosProfes] = useState(false);
    const [profesLista, setProfesLista] = useState(false);
    const [estudiantesLista, setEstudiantesLista] = useState(false);
    const [siguienteActividad, setSiguienteActividad] = useState(false);
    const [agregarEstudiante, setAgregEstu] = useState(false);
    const [mostrarObservaciones, setMostrarObservaciones] = useState(false);
    const [mostrarActividades, setActividades] = useState(false);

    //Equipos guia y equipo seleccionado

    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null)
    const [equipos, setEquipos] = useState([])


    
    // Excel
    const [data, setData] = useState([])
    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        try {
            const reader = new FileReader();
            reader.readAsBinaryString(e.target.files[0]);
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet);
                parsedData.forEach( async (student) => {
                    const { studentCard, firstLastname, secondLastname, firstname, middlename, email, phoneNumber, campus } = student;
                    try{
                        const response = await axios.post('http://localhost:4000/api/students/', {
                            studentCard: studentCard, 
                            firstLastname: firstLastname, 
                            secondLastname: secondLastname, 
                            firstname: firstname, 
                            middlename: middlename, 
                            email: email, 
                            phoneNumber: phoneNumber, 
                            campus: campus
                        })
                        
                    }catch (error) {
                        console.error(error.message);
                    }
                });
                setData(parsedData);
            }
        } catch (err) {
            console.log(err.message)
        }
    }


    return (
        <div className="home"> 
            <Navbar id = {usuario.firstname} apellido = {usuario.firstLastname}/>
            <div className="horizontal-container">
                <Sidebar 
                s1={setTodosLosProfes} 
                s2={setProfesLista} 
                s3={setEstudiantesLista} 
                s4={setSiguienteActividad} 
                sAE={setAgregEstu} 
                sE={setEquipos} 
                sES={setEquipoSeleccionado} 
                id={usuario._id}
                equipos={equipos}/>


                {/* <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload}/> */}
                <div className="contenedorListas">
                    {todosLosProfes && <ListaProfesores campus={usuario.campus} usuario={usuario} equipo={equipoSeleccionado}/>}
                    {profesLista && <ListaEquipoGuia equipo={equipoSeleccionado}/>}
                    {estudiantesLista && <ListaEstudiantes campus={usuario.campus} sTP ={setTodosLosProfes} sPL={setProfesLista} sEL={setEstudiantesLista} sA={setSiguienteActividad} sAE={setAgregEstu}/>}
                    {mostrarObservaciones && <ListaObservaciones usuario={usuario} campus={usuario.campus} observaciones={setMostrarObservaciones}/>}
                    {agregarEstudiante && <AgregarEstudiante campus={usuario.campus} sTP ={setTodosLosProfes} sPL={setProfesLista} sEL={setEstudiantesLista} sA={setSiguienteActividad} sAE={setAgregEstu}/>}
                    {mostrarActividades && <ListaActividades />}
                </div>
            </div>
            
        </div>
    )
}

export default Home;
