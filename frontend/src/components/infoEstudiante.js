import { Link } from "react-router-dom";
import "../components/infoEstudiante.css"

const InfoEstudiante = () => {

    return(
        <div className="cartaEstudiante">
            <div className="infoEspecifica">
                <h4>Carné: </h4>
                <h4>Nombre Completo: </h4>
                <h2>Correo: </h2>
                <h2>Celular: </h2> 
            </div>
            <div className="botonesEstudiante" type="submit">
                <Link to="/modEstudiante" style={{textDecoration:"none"}}>Modificar información</Link>
            </div>        
        </div>
        
    );
}
 
export default InfoEstudiante;