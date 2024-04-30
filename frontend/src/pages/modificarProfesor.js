import './modificarProfesor.css';
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const ModificarProfesor = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [officePhone, setOfficePhone] = useState('');

    const submitModify = async (e) => {
        navigate("/home/"+"123");
    }

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    
    function handleOfficePhoneChange(e) {
        const input = e.target.value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
        let formattedInput = '';
        if (input.length <= 4) {
            formattedInput = input;
        } else if (input.length <= 8) {
            formattedInput = `${input.slice(0, 4)}-${input.slice(4)}`;
        } else {
            formattedInput = `${input.slice(0, 4)}-${input.slice(4, 8)} [extensión ${input.slice(8)}]`;
        }
        setOfficePhone(formattedInput);
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
                    <input type="text" value={officePhone} onChange={handleOfficePhoneChange} placeholder='Teléfono oficina' required />
                </div>
                <h4>Añada imagen (opcional)</h4>
                <div className="input-box">
                    <input type="file" onChange={handleChange} />
                </div>
                <div className="image-container">
                    {file && <img src={file} />}
                </div>

                <button>Guardar Cambios</button>

            </form>

        </div>
        
    );
}

export default ModificarProfesor;