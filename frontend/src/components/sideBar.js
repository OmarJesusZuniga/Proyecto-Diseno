import React from 'react';
import '../components/sideBar.css'; // You can define your sidebar styles in this file
import '../pages/HomeAdmin.css';

const Sidebar = ({s1, s2, s3, s4}) => {

    const dejarPrimera = () =>{
        s1(true);
        s2(false);
        s3(false);
        s4(false);
    }
    const dejarSegunda = () =>{
        s1(false);
        s2(true);
        s3(false);
        s4(false);
    }
    const dejarTercera = () =>{
        s1(false);
        s2(false);
        s3(true);
        s4(false);
    }
    const dejarCuarta = () => {
        s1(false);
        s2(false);
        s3(false);
        s4(true);
    }


  return (
    <div className="sidebar">
      <h2>Menú</h2>
      <ul>
        <li>
            <div className="dropdown">
                <select>
                    <option value="team1">Equipo guía primer ingreso</option>
                </select>
            </div>
        </li>
        <li>
            <div className="section">
                <h2>Profesores guía</h2>
                <button onClick={dejarPrimera} className="botonAzul">Ver todos los profesores</button>
                <button onClick={dejarSegunda}>Ver lista</button>
            </div>
        </li>
        <li>
            <div className="section">
                <h2>Estudiantes</h2>
                <button onClick={dejarTercera}className="botonAzul">Ver lista</button>
            </div>
        </li>
        <li>
            <div className="section">
                <h2>Actividades</h2>
                <button onClick={dejarCuarta} className="botonAzul">Ver siguiente actividad</button>
            </div>
        </li>
        {/* Add more list items for your sidebar options */}
      </ul>
    </div>
  );
}

export default Sidebar;