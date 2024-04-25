import "../components/listaEstudiantes.css"
import InfoEstudiante from "./infoEstudiante";

const ListaEstudiantes = () => {
    return ( 
        <div className="listaEstudiantes">
            <InfoEstudiante/>
            <InfoEstudiante/>
        </div>
    );
}
 
export default ListaEstudiantes;