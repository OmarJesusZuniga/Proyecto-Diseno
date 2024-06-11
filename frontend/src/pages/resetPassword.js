import React, {  useState } from 'react';
import './resetPassword.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {  useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { name } = useParams();
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);    

    const actualizar = async (e) => {
        e.preventDefault();

        if (pass.length < 7) {
            toast.error("La contraseña no es de 8 dígitos.", {
                className: "toast-message"
            });
            return
        }

        console.log(name)
        console.log(pass)

        try {
            const response = await axios.post(`http://localhost:4000/api/logIn/updatePassword/${name}`, { 
                password: pass 
            });
            if (response.data.Status === "Not") {
                toast.error("El correo no existe en el sistema.", {
                    className: "toast-message"
                });
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            toast.error("An error occurred. Please try again.", {
                className: "toast-message"
            });
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,8}$/.test(value)) {
            setPass(value);
        }
    };

    return (
        
        <div className="Reset-password">
            <ToastContainer />
            <form action='POST'>
                <h1>Reset Password \ {name} \</h1>
                <div className="input-box">
                <input type={showPass ? "text" : "password"}
                        placeholder='Password'
                        title="Must be numeric and 8 characters long."
                        pattern="^[0-9]{8}$"
                        maxLength={8} 
                        value={pass}
                        onChange={handleChange} 
                        required />
                    <span className='icon' onClick={() => setShowPass(!showPass)}>
                        {showPass ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
  
                <div className='botonActualizar'>
                    <button onClick={actualizar}>Actualizar </button>
                </div>

            </form> 

        </div>
    )
}

export default ResetPassword;