import React, {  useState } from 'react';
import './forgotPassword.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['Asistente Administrativa', 'Profesor'];

    
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
    };

    const enviar = async (e) => {
        navigate("/forgotPassword/");
    }

    async function submit(e){
        e.preventDefault();
        
        if (selectedOption === 'Asistente Administrativa'){
            try{
                const response = await axios.post('http://localhost:4000/api/adminAssistants/namepass/get/', {
                    name: user,
                    password: pass
                })
    
                const dataArray = response.data
                
                if (dataArray.length === 0 ){
                    navigate('/');
                } else{
                    const usuario = dataArray[0]
                    navigate('/home/', {state: {usuario}});
                }
                
                
            }catch{
                navigate('/')
            }
        } else if (selectedOption === 'Profesor'){
            try {

                const response = await axios.post('http://localhost:4000/api/professors/namepass/get/', {
                    user: user,
                    password: pass
                })

                const dataArray = response.data;
                if(dataArray.length === 0){
                    navigate('/')
                } else {
                    const usuario = dataArray[0];
                    navigate('/homeProfe', {state: {usuario}})
                }


            } catch {
                navigate('/')
            }
        }


    }


    return (
        <div className="forgot-password">
            <form action='POST'>
                <h1>Forgot Password</h1>
                <div className="input-box">
                    <input type="text" placeholder='Enter Email' onChange={(e) => setUser(e.target.value)} required />
                </div>
  
                <div className='botonEnviar'>
                    <button onClick={enviar}>Enviar </button>
                </div>

            </form> 

        </div>
    )
}

export default ForgotPassword;