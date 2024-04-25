import "../components/listaProfesores.css"
import InfoProfesor from "./infoProfesor";

const ListaProfesores = () => {
    return ( 
        <div className="listaProfesores">
            <InfoProfesor/>
            <InfoProfesor/>
        </div>
    );
}
 
export default ListaProfesores;