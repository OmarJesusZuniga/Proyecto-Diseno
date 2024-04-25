import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    

    const submitLogIn = (e) => {
        navigate("/home/"+"123");
    }


    return (
        <div className="wrapper">
            <form onSubmit={submitLogIn}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' required />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' required />
                    <FaLock className='icon' />
                </div>

                <button>Login</button>

            </form> 

        </div>
    )
}

export default LoginForm;