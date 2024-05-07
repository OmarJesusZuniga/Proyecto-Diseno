import React, { useState } from 'react';
import '../components/agregarEstudiante.css'
import axios from 'axios';

const AgregarEstudiante = ({ campus, sTP, sPL, sEL, sA, sAE}) => {
    
    const [nombre, setNombre] = useState('')
    const [segundoNombre, setSegunNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [segundoApellido, setSegunApellido] = useState('')
    const [carne, setCarne] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNum] = useState('')

    const changeNombre = (e) => {
        setNombre(e.target.value)
    }
    const changeSegundoNombre = (e) => {
        setSegunNombre(e.target.value)
    }

    const changeApellido = (e) => {
        setApellido(e.target.value)
    }

    const changeSegundoApellido = (e) => {
        setSegunApellido(e.target.value)
    }

    const changeCarne = (e) => {
        setCarne(e.target.value)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changePhoneNum = (e) => {
        setPhoneNum(e.target.value)
    }

    
    const agregarEstudiante = async () => {

        // const response = await axios.post('http://localhost:4000/api/students/', {
        //     studentCard: carne, 
        //     firstLastname: apellido, 
        //     secondLastname: segundoApellido, 
        //     firstname: nombre, 
        //     middlename: segundoNombre, 
        //     email: email, 
        //     phoneNumber: phoneNumber, 
        //     campus: campus
        // })


        // sTP(false);
        // sPL(false);
        // sEL(true);
        // sA(false);
        // sAE(false);
    }

    const volver = () => {
        sTP(false);
        sPL(false);
        sEL(true);
        sA(false);
        sAE(false);
    }
    
    return (
        <div className='agregarEstudiante'>
            <div className="btnVolverContainer"> {/* Container for the Volver button */}
                <button onClick={volver} className='btnVolver'>Volver</button>
            </div>
            <h2>Nombre</h2>
            <input onChange={changeNombre} type="text" class="inputBox" placeholder="Input 1"/>
            <h2>Segundo Nombre</h2>
            <input onChange={changeSegundoNombre} type="text" class="inputBox" placeholder="Input 2"/>
            <h2>Primer Apellido</h2>
            <input onChange={changeApellido} type="text" class="inputBox" placeholder="Input 3"/>
            <h2>Segundo Apellido</h2>
            <input onChange={changeSegundoApellido} type="text" class="inputBox" placeholder="Input 4"/>
            <h2>Carné</h2>
            <input onChange={changeCarne} type="text" class="inputBox" placeholder="Input 5"/>
            <h2>Email</h2>
            <input onChange={changeEmail} type="text" class="inputBox" placeholder="Input 6"/>
            <h2>Phone Number</h2>
            <input onChange={changePhoneNum} type="text" class="inputBox" placeholder="Input 7"/>
            <button onClick={agregarEstudiante} className='btnAgregar'>Agregar Estudiante</button>
        </div>
    );
}

export default AgregarEstudiante;
