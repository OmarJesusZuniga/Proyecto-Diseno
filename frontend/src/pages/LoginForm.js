import React, {  useState } from 'react';
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

    async function submit(e){
        e.preventDefault();
        
        if (selectedOption === 'Asistente Administrativa'){
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
                    const usuario = dataArray[0]
                    navigate('/home/', {state: {usuario}});
                }
                
                
            }catch{
                navigate('/')
            }
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
                    <input type={showPass ? "text" : "password"}
                            placeholder='Password'
                            title="Must be numeric and 8 characters long."
                            pattern="^[0-9]{8}$"
                            onChange={(e) => setPass(e.target.value)} />
                        <span className='icon' onClick={() => setShowPass(!showPass)}>
                            {showPass ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    
                    {/* <input type="password" placeholder='Password'  title="Must be numeric and  8 characters long."  onChange={(e) => setPass(e.target.value)}/> <FaLock className='icon' />  */}
                </div>
                <div className="dropdown-container">
                    <div className="dropdown-top-text">Tipo de usuario</div>
                    <div className="dropdown-header" onClick={toggleDropdown}>
                    {selectedOption || 'Select an option'}
                    <i className={`arrow ${isOpen ? 'up' : 'down'}`} />
                  </div>
                  {isOpen && (
                    <ul className="dropdown-list">
                      {options.map((option, index) => (
                        <li key={index} onClick={() => handleOptionClick(option)}>
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
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