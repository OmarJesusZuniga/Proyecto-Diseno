import React, {  useState } from 'react';
import './LoginForm.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);    

    const forgot = async (e) => {
        navigate("/forgotPassword");
    }

    async function submitX(e){
        e.preventDefault();

        if (pass.length < 7) {
            toast.error("La contraseña no es de 8 dígitos.", {
                className: "toast-message"
            });
            return
        }

        try {
            const response = await axios.post('https://proyecto-diseno-ol06.onrender.com/api/logIn/namepass/get/', {
                name: user,
                password: pass
            })
            const { Status, Data } = response.data;
    
            if (Status === "Professor" || Status === "Admin Assistant") {
                const usuario = Data[0];
                const route = Status === "Professor" ? '/homeProfe' : '/home/';
                Status === "Professor" ? usuario.type = 1 : usuario.type = 0;
                if (Status === "Admin Assistant"){
                    if (usuario.campus === '662733740d5b97c9626be5ab'){
                        usuario.adminMadre = true;
                    } else {
                        usuario.adminMadre = false;
                    }
                }

                
                navigate(route, { state: { usuario } });
            } else {
                toast.error("Credenciales inválidas", {
                    className: "toast-message"
                });
                navigate('/')
            }
        } catch (error){
            toast.error("Credenciales inválidas", {
                className: "toast-message"
            });
            console.log(error)
            navigate('/')
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,8}$/.test(value)) {
            setPass(value);
        }
    };
    
    return (
        <div className="wrapper">
            <ToastContainer />
            <form action='POST'>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' onChange={(e) => setUser(e.target.value)} required />
                </div>
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
                <div className='botonOlvidar'>
                    <button onClick={forgot}>¿Olvidó su contraseña? </button>
                </div>
                
                <button onClick={submitX}>Login </button>

            </form> 

        </div>
    )
}

export default LoginForm;