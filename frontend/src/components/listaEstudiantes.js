import "../components/listaEstudiantes.css"
import InfoEstudiante from "./infoEstudiante";

const ListaEstudiantes = () => {
    return ( 
        <div className="listaEstudiantes">
            <h2>Estudiantes de la sede</h2>
            <div className="dropdown">
                <select>
                    <option value="team1">Orden alfabético</option>
                    <option value="team2">Carné</option>
                    <option value="team1">Campus</option>
                </select>
            </div>
            <InfoEstudiante/>
            <InfoEstudiante/>
        </div>
    );
}
 
export default ListaEstudiantes;