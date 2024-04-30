import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    

    async function submit(e){
        e.preventDefault();
        
        try{
            const response = await axios.post('http://localhost:4000/api/adminAssistants/namepass/get/', {
                name: user,
                password: pass
            })

            const dataArray = response.data
            console.log(dataArray[0])
            if (dataArray.length === 0 ){
                navigate('/');
            } else{
                navigate('/home/123456');
            }
            
            
        }catch{
            navigate('/')
        }


    }


    return (
        <div className="wrapper">
            <form action='POST'>
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

                <button onClick={submit}>Login </button>

            </form> 

        </div>
    )
}

export default LoginForm;