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
        e.preventDefault()
        axios.post('http://localhost:4000/api/logIn/forgot/', {email})
        .then(res => {
            if(res.data.Status === "Not") {
                toast.error("El correo no existe en el sistema.", {
                    className: "toast-message"
                });
                return
            }
            else {
                navigate('/')
            }
        }).catch(err => console.log(err))
        
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
                    <button onClick={enviar}>Enviar </button>
                    <button onClick={volver}>Volver </button>
                </div>

            </form> 

        </div>
    )
}

export default ForgotPassword;