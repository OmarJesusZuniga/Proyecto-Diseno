
import React, { useEffect, useState } from 'react';
import DateFacade from '../PatronFacade/DateFacade';

const GlobalTime = () => {
    const [fecha, setFecha] = useState(null);
    const [fechaNueva, setFechaNueva] = useState(() => new Date());

    useEffect(() => {
        DateFacade.getSystemDate()
            .then(data => {
                setFecha(new Date(data[0].date));
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const changeFecha = (e) => {
        setFechaNueva(new Date(e.target.value));
    };

    const actualizarNuevaFecha = async () => {
        try {
            await DateFacade.updateSystemDate(fechaNueva);
            await DateFacade.notifyObeserver();
            setFecha(fechaNueva);
        } catch (err) {
            console.log(err);
        }
    };

    const resetearFecha = async () => {
        try {
            await DateFacade.resetSystemDate();
            await DateFacade.notifyObeserver();
            const date = new Date();
            date.setDate(date.getDate() - 1); // Esto parece innecesario, se podría eliminar.
            setFecha(date);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bg-background border rounded border-accent p-3 w-min h-min">
            <h1 className="text-text font-bold">Selecciona la fecha:</h1>
            <div className="flex content-center justify-left items-center">
                <input onChange={changeFecha} type="date" id="fecha" name="fecha" className="inputBox2" />
                <button onClick={actualizarNuevaFecha} className="btnAgregar3">Actualizar Fecha</button>
            </div>
            <h1 className="text-text font-bold">Fecha actual</h1>
            <div className="flex content-center justify-left items-center">
                <input value={formatDate(fecha)} type="date" readOnly className="inputBox2" />
                <button onClick={resetearFecha} className="btnAgregar3">Resetear</button>
            </div>
        </div>
    );
}

export default GlobalTime;
