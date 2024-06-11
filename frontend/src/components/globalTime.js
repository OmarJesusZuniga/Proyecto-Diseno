import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GlobalTime = () => {
    const [fecha, setFecha] = useState(null); // Se sobreescr
    const [fechaNueva, setFechaNueva] = useState(() => new Date());

    useEffect(() => {
        axios.get('http://localhost:4000/api/systemDate')
            .then(res => {
                setFecha(new Date(res.data[0].date));
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + (d.getDate() + 1);
        let year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    // Event handler for date input change
    const changeFecha = (e) => {
        setFechaNueva(new Date(e.target.value));
    };

    // Update the current date with the new date
    const actualizarNuevaFecha = () => {
        axios.patch('http://localhost:4000/api/systemDate', {date: fechaNueva});
        setFecha(fechaNueva);
    };

    // Reset the current date to today's date
    const resetearFecha = () => {
        const date = new Date();
        axios.patch('http://localhost:4000/api/systemDate', {date: date});
        date.setDate(date.getDate() - 1);
        setFecha(date);
    };

    return (
        <div className="bg-background border rounded border-accent p-3 w-min h-min">
            <h1 className="text-text font-bold">Selecciona la fecha:</h1>
            <div className="flex content-center justify-left items-center">
                <input onChange={changeFecha} type="date" id="fecha" name="fecha" className="inputBox2"/>
                <button onClick={actualizarNuevaFecha} className="btnAgregar3">Actualizar Fecha</button>
            </div>
            <h1 className="text-text font-bold">Fecha actual</h1>
            <div className="flex content-center justify-left items-center">
                <input value={formatDate(fecha)} type="date" readOnly className="inputBox2"/>
                <button onClick={resetearFecha} className="btnAgregar3">Resetear</button>
            </div>
        </div>
    );
}

export default GlobalTime;
