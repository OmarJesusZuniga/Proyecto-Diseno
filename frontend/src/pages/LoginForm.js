import React, {  useState, useEffect } from 'react';
import './LoginForm.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['Asistente Administrativa', 'Profesor'];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
    
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
    };

    const forgot = async (e) => {
        navigate("/forgotPassword", {state :{selectedOption, user, pass}});
    }

    async function submitX(e){
        e.preventDefault();

            
        try {
            const response = await axios.post('http://localhost:4000/api/logIn/namepass/get/', {
                name: user,
                password: pass
            })
            const { Status, Data } = response.data;
    
            if (Status === "Professor" || Status === "Admin Assistant") {
                const usuario = Data[0];
                const route = Status === "Professor" ? '/homeProfe' : '/home/';
                navigate(route, { state: { usuario } });
            } else {
                navigate('/')
            }
        } catch (error){
            
            console.log(error)
            navigate('/')
        }
    }
    
    return (
        <div className="wrapper">
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
                            onChange={(e) => setPass(e.target.value)} 
                            required/>
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