import React, {  useState } from 'react';
import './forgotPassword.css';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from "react-router-dom";
const ForgotPassword = () => {

    const {state} = useLocation();
    const {selectedOption, user, pass} = state || {};


    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const enviar = async (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/api/logIn', {email})
        .then(res => {
            if(res.data.Status === "Not") {
                navigate("/forgotPassword")
            }
            else {
                navigate('/')
            }
        }).catch(err => console.log(err))
        
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
                    <input type="text" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
                </div>
  
                <div className='botonEnviar'>
                    <button onClick={enviar}>Enviar </button>
                </div>

            </form> 

        </div>
    )
}

export default ForgotPassword;