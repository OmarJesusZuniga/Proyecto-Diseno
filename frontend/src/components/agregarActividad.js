import React, { useState } from 'react';
import '../components/agregarEstudiante.css'
import axios from 'axios';

const AgregarActividad = ({ campus, sTP, sPL, sEL, sA, sAE}) => {
    
    const [week, setWeek] = useState(null);
    const [name, setName] = useState(null);
    const [type, setType] = useState(null);
    const [programmedDate, setProgrammedDate] = useState(null);
    const [programmedHour, setProgrammedHour] = useState(null);
    const [managers, setManagers] = useState([]);
    const [publishDate, setPublishDate] = useState(null);
    const [reminders, setReminders] = useState([]);
    const [modality, setModality] = useState(null);
    const [link, setLink] = useState(null);
    const [pdf, setPdf] = useState(null);

    const changeWeek = (e) => {
        setWeek(e.target.value);
    }

    const changeName = (e) => {
        setName(e.target.value);
    }

    const changeType = (e) => {
        setType(e.target.value);
    }
    
    const changeProgrammedDate = (e) => {
        setProgrammedDate(e.target.value);
    }
    
    const changeProgrammedHour = (e) => {
        setProgrammedHour(e.target.value);
    }

    const addManager = (manager) => {
        setManagers(prevManagers => [...prevManagers, manager]);
    }

    const changePublishDate = (e) => {
        setPublishDate(e.target.value);
    }

    const addReminder = (reminder) => {
        setReminders(prevReminders => [...prevReminders, reminder]);
    }
    
    const changeModality = (e) => {
        setModality(e.target.value);
    }
    
    const changeLink = (e) => {
        setLink(e.target.value);
    }
    
    const changePdf = (e) => {
        setPdf(e.target.value);
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
            <div className="btnVolverContainer"> 
                <button onClick={volver} className='btnVolver'>Volver</button>
            </div>
            <h2>Week</h2>
            <input onChange={changeWeek} type="text" className="inputBox" placeholder="Input Week"/>

            <h2>Nombre</h2>
            <input onChange={changeName} type="text" className="inputBox" placeholder="Input Name"/>

            <h2>Type</h2>
            <input onChange={changeType} type="text" className="inputBox" placeholder="Input Type"/>

            <h2>Programmed Date</h2>
            <input onChange={changeProgrammedDate} type="date" className="inputBox" placeholder="Select Date"/>

            <h2>Programmed Hour</h2>
            <input onChange={changeProgrammedHour} type="time" className="inputBox" placeholder="Select Hour"/>

            <h2>Managers</h2>
            {/* This would likely need a different UI element such as a dropdown or a multi-select component */}
            
            <h2>Publish Date</h2>
            <input onChange={changePublishDate} type="date" className="inputBox" placeholder="Select Publish Date"/>

            <h2>Reminders</h2>
            {/* This would likely need a different UI element such as a list of items with add/remove capabilities */}
            
            <h2>Modality</h2>
            <input onChange={changeModality} type="text" className="inputBox" placeholder="Input Modality"/>

            <h2>Link</h2>
            <input onChange={changeLink} type="url" className="inputBox" placeholder="Input URL"/>

            <h2>PDF</h2>
            <input onChange={changePdf} type="file" className="inputBox" placeholder="Upload PDF"/>
        </div>
    );
}

export default AgregarActividad;
