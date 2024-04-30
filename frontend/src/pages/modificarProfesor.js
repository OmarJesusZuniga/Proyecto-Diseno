import './modificarProfesor.css';
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const ModificarProfesor = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const submitModify = async (e) => {
        navigate("/home/"+"123");
    }

    const [file, setFile] = useState();

        function handleChange(e) {
            console.log(e.target.files);
            setFile(URL.createObjectURL(e.target.files[0]));
    }
    
    return (       
        <div className="principal">
            <form onSubmit={submitModify}>
                <Navbar id={id}/>
                <h2>Información estudiante</h2>
                <h4>Escriba el nombre completo</h4>
                <div className="input-box">
                    <input type="text" placeholder='Nombre completo' required />
                </div>
                <h4>Escriba el correo</h4>
                <div className="input-box">
                    <input type="text" placeholder='Correo' required />
                </div>
                <h4>Escriba el teléfono celular</h4>
                <div className="input-box">
                    <input type="text" placeholder='Teléfono celular' required />
                </div>
                <h4>Escriba el teléfono oficina</h4>
                <div className="input-box">
                    <input type="text" placeholder='Teléfono oficina' required />
                </div>
                <div className="input-box">
                    <input type="file" onChange={handleChange} />
                    <img src={file} />
                </div>

                <button>Guardar Cambios</button>

            </form>

        </div>
        
    );
}

export default ModificarProfesor;