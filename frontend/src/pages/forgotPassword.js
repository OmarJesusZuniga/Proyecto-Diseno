import React, {  useState } from 'react';
import './forgotPassword.css';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const enviar = async (e) => {
        e.preventDefault();
        console.log("Entro a enviar")
        try {
            const response = await axios.post('https://proyecto-diseno-ol06.onrender.com/api/logIn/forgot', { 
                name: email 
            });

            if (response.data.Status === "Not") {
                toast.error("El correo no existe en el sistema.", {
                    className: "toast-message"
                });
            } else {
                toast.success("Correo publicado correctamente!", {
                    className: "toast-message"
                });
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            toast.error("An error occurred. Please try again.", {
                className: "toast-message"
            });
        }
    }

    const volver = async (e) => {
        navigate('/');
    }

    return (
        
        <div className="forgot-password">
            <ToastContainer />
            <form action='POST'>
                <h1>Forgot Password</h1>
                <div className="input-box">
                    <input type="text" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
                </div>
  
                <div className='botonEnviar'>
                    <button onClick={volver}>Volver </button>
                    <button onClick={enviar}>Enviar </button>
                </div>

            </form> 

        </div>
    )
}

export default ForgotPassword;