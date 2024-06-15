import "../components/calendarioEstudiante.css";
import React, { useState } from "react";
import dayjs from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "./calendar";
import cn from "./cn";

const CalendarioEstudiante = () => {

    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    console.log(today.year());
    console.log(today.month());
    const [selectDate, setSelectDate] = useState(currentDate);


    return (
        <div className="clase-calendario">
            <div className="tituloActividades">
                <h2>Calendario del Equipo guía</h2>
            </div>
            <div className="calendar-box">
                <div className="header">
                    <h1 className="select-none font-semibold">
                        {months[today.month()]}, {today.year()}
                    </h1>
                    <div className="month-navigation">
                        <GrFormPrevious className="icon" onClick={() => setToday(today.subtract(1, 'month'))} />
                        <h1 className="icon" onClick={() => setToday(currentDate)}>
                            Today
                        </h1>
                        <GrFormNext className="icon" onClick={() => setToday(today.add(1, 'month'))} />
                    </div>
                </div>
                <div className="days-grid">
                    {days.map((day, index) => (
                        <h1 key={index} className="day-label">
                            {day}
                        </h1>
                    ))}
                </div>
                <div className="dates-grid">
                    {generateDate(today.month(), today.year()).map(({ date, currentMonth, today: isToday }, index) => (
                        <div key={index} className="date-cell">
                            <h1 className={`date-number ${cn(currentMonth ? "" : "non-current-month", isToday ? "today" : "")} 
                                    ${selectDate.isSame(date, 'day') ? "selected-date" : ""}`}
                                onClick={() => setSelectDate(date)}>
                                {date.date()}
                            </h1>
                        </div>
                    ))}
                </div>
            </div>
            <div className="schedule-box">
                <h1 className="font-semibold">
                    Actividades de {selectDate.format('dddd, MMMM D, YYYY')}
                </h1>
                <p className="no-meetings">
                    No hay actividades del día.
                </p>
            </div>
        </div>
    );
}

export default CalendarioEstudiante;