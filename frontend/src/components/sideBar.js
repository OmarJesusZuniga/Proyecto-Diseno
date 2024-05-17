import React, { useEffect, useState } from 'react';
import '../components/sideBar.css'; // You can define your sidebar styles in this file
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";

const Sidebar = ({s1, s2, s3, s4,  sE, sES, id, equipos, sC, setIdEquipoSeleccionado, idEquipoSeleccionado, limpiarPantalla,
    cambiosDeEquipo, setCambios, sAP, usuario
}) => {

    useEffect(() => {

        if (idEquipoSeleccionado === null){
            
        } else {
            const getTeam = async () => {
                limpiarPantalla();
                sC(true);
                axios.post('http://localhost:4000/api/guideTeam/assistant/get', {id: id})
                .then(response => {
                    sE(response.data);
                })
                axios.get('http://localhost:4000/api/guideTeam/'+idEquipoSeleccionado)
                    .then(response => {
                        sES(response.data);
                        setIdEquipoSeleccionado(response.data._id);
                        sC(false);
                        setCambios('');
                        dejarPrimera();
                    })
                    .catch(err => {
                        console.error('Error fetching data:', err);
                    });
            }
            getTeam();
        }
        
    }, [cambiosDeEquipo])

    useEffect(() => {
        const fetchTeams = async () => {
            axios.post('http://localhost:4000/api/guideTeam/assistant/get', {id: id})
                .then(response => {
                    sE(response.data);
                    sES(response.data[0]);
                    setIdEquipoSeleccionado(response.data[0]._id);
                    sC(false);
                    dejarPrimera();
                    
                    
                    
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                });
        };
    
        fetchTeams();
        
    }, []);

    const changeEquipo = (e) => {
        s1(false);
        s2(false);
        s3(false);
        s4(false);
        sAP(false);
        setIdEquipoSeleccionado(e.target.value);
        setCambios('cambio');        
    }


    const dejarPrimera = () =>{
        s1(true);
        s2(false);
        s3(false);
        s4(false);
        sAP(false);
        
    }
    const dejarSegunda = () =>{
        s1(false);
        s2(true);
        s3(false);
        s4(false);
        sAP(false);
        
    }
    const dejarTercera = () =>{
        s1(false);
        s2(false);
        s3(true);
        s4(false);
        sAP(false);
        
    }
    const dejarCuarta = () => {
        s1(false);
        s2(false);
        s3(false);
        s4(true);
        sAP(false);
        
    }

    const addProfeTab = () => {
        s1(false);
        s2(false);
        s3(false);
        s4(false);
        sAP(true);
    }

    async function crearEquipo() {
        
        const currentYear = new Date().getFullYear();
        const lastTwoDigits = currentYear % 100;
        let hayEquipo = false;

        equipos.map(equipo => {
            if(equipo.generation === lastTwoDigits){
                hayEquipo = true;
            }
        })
        
        if(hayEquipo){
            toast.error("Ya existe un equipo para este año.", {
                className: "toast-message"
            });
            
        } else{
            axios.get('http://localhost:4000/api/professors/profesByCampus/'+usuario.campus)
            .then(response => {
            axios.post('http://localhost:4000/api/plan/', {profesorId: response.data[0]._id})
                .then(response2 => {
                    axios.post('http://localhost:4000/api/guideTeam/createTeam', {
                    generation: lastTwoDigits, guideProfessor: response.data[0]._id, students: [], adminAssistants:[usuario._id], plan: response2.data._id, professors:[]
                    })
                    .then(response => {
                    setCambios('cambio');
                    })
                })
            })
        }
    } 
    const [data, setData] = useState([])
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
    <div className="sidebar">
        <ToastContainer />
      <ul>
        <li>
            <div className="dropdown">
                <h2>Equipo Guía</h2>
                <select onChange={changeEquipo}>
                {equipos.map((equipo) => (
                    <option key={equipo._id} value={equipo._id}>
                        20{equipo.generation}
                    </option>
                ))}
                </select>
                
            </div>
            <div className="section">
            <button onClick ={crearEquipo} className="botonAzul">Crear Equipo</button>
            </div>
        </li>
        <li>
            <div className="section">
                <h2>Profesores guía</h2>
                <button onClick={dejarPrimera} className="botonAzul">Ver todos los profesores</button>
                <button onClick={dejarSegunda}>Ver lista</button>
                <button onClick={addProfeTab} className="botonAzul">Añadir un profesor</button>
            </div>
        </li>
        <li>
            <div className="section">
                <h2>Estudiantes</h2>
                <button onClick={dejarTercera}className="botonAzul">Ver lista</button>
                <h2>Seleccione el archivo para agregar estudiantes</h2>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload}/>
            </div>
        </li>
        <li>
            <div className="section">
                <h2>Actividades</h2>
                <button onClick={dejarCuarta} className="botonAzul">Ver siguiente actividad</button>
            </div>
        </li>
        {/* Add more list items for your sidebar options */}
      </ul>
    </div>
  );
}

export default Sidebar;