import "../components/listaProfesores.css"
import InfoProfesor from "./infoProfesor";

const ListaProfesores = () => {
    return ( 
        <div className="listaProfesores">
            <h2>Profesores en la sede</h2>
            <InfoProfesor/>
            <InfoProfesor/>
        </div>
    );
}
 
export default ListaProfesores;