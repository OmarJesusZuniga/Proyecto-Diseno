import "../components/listaEstudiantes.css"
import InfoEstudiante from "./infoEstudiante";

const ListaEstudiantes = () => {
    return ( 
        <div className="listaEstudiantes">
            <h2>Estudiantes de la sede</h2>
            <InfoEstudiante/>
            <InfoEstudiante/>
        </div>
    );
}
 
export default ListaEstudiantes;