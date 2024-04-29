import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState(""); 
    

    const submitLogIn = async (e) => {

        const data = {
            name: user,
            password: pass
        }

        const response = await fetch('https://localhost:4000/api/adminAssistants/namepass/get', {
            method: 'GET',
            body: JSON.stringify(data)
        });
        const json = await response.json();

        console.log(json);

        
    }


    return (
        <div className="wrapper">
            <form onSubmit={submitLogIn}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' onChange={(e) => setUser(e.target.value)} />
                    {/* <FaUser className='icon' /> */}
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password'  title="Must be numeric and  8 characters long."  onChange={(e) => setPass(e.target.value)}/>
                    {/* <FaLock className='icon' /> */}
                </div>
                <div className="forgot">
                    <a href="#">¿Olvidó su contraseña?</a>               
                </div>

                <button>Login</button>

            </form> 

        </div>
    )
}

export default LoginForm;