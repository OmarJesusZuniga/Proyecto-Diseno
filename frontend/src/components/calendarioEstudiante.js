import "../components/calendarioEstudiante.css";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "./calendar";
import GuideTeamFacade from '../PatronFacade/EquipoGuiaFacade';
import cn from "./cn";


const CalendarioEstudiante = ({ grupo, usuario }) => {
    const [actividades, setActividad] = useState([]);  
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);
    
    useEffect(() => {
        const fetchData = async () => {
            if (grupo) {
                try {
                    const planData = await GuideTeamFacade.fetchPlan(grupo[0].plan);
                    setActividad(planData.activities);

                } catch (error) {
                    console.error('Error fetching plan data:', error);
                }
            } else {
                console.log("Plan ID is missing or undefined!");
            }
        };
    
        fetchData();
    }, [grupo, usuario._id]);

    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    
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
                        <h1 className="icon" onClick={() => {setToday(currentDate); setSelectDate(currentDate); }}>
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
                    {generateDate(today.month(), today.year()).map(({ date, currentMonth }, index) => {
                        const isToday = dayjs().isSame(date, 'day');
                        const isActiveDay = actividades.some(activity => 
                            dayjs(activity.programmedDate).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
                        );
                        return (
                            <div key={index} className="date-cell">
                                <h1 className={`date-number ${cn(
                                    currentMonth ? "" : "non-current-month", 
                                    isToday ? "today" : "", 
                                    selectDate.isSame(date, 'day') ? "selected-date" : "",
                                    isActiveDay ? "activity-day" : ""
                                )}`} onClick={() => setSelectDate(date)}>
                                    {date.date()}
                                </h1>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="schedule-box">
                <h1 className="font-semibold">
                    Actividades de {selectDate.format('dddd, MMMM D, YYYY')}
                </h1>
                {actividades.some(activity => 
                    dayjs(activity.programmedDate).format('YYYY-MM-DD') === selectDate.format('YYYY-MM-DD')
                ) ? (
                    actividades.filter(activity => 
                        dayjs(activity.programmedDate).format('YYYY-MM-DD') === selectDate.format('YYYY-MM-DD')
                    ).map((activity, index) => (
                        <div key={index}>
                            <p>{activity.name}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay actividades para este día.</p>
                )}

            </div>
        </div>
    );
}

export default CalendarioEstudiante;