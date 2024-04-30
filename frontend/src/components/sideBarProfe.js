import React from 'react';
import '../components/sideBar.css';


const SideBarProfe = () => {
    return (
        <div className='sidebar'>
            <ul>
                <li>
                    <div className="dropdown">
                        <h2>Equipo Guía</h2>
                        <select>
                            <option value="team1">Equipo guía primer ingreso</option>
                        </select>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default SideBarProfe;
