import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

const LoginForm = () => {

    

    const submitLogIn = (e) => {

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

                <div className="login" type="submit">
                    <Link to="/home" style={{textDecoration:"none"}}>LogIn</Link>
                </div>

            </form> 

        </div>
    )
}

export default LoginForm;