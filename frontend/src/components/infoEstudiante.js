import { Link } from "react-router-dom";
import "../components/infoEstudiante.css"

const InfoEstudiante = ({estudiante}) => {

    return(
        <div className="cartaEstudiante">
            <div className="infoEspecifica">
                <h2>{estudiante.firstname} {estudiante.firstLastname} {estudiante.secondLastname}</h2>
                <div>
                    <h3>Carné: </h3>
                    <h5>{estudiante.studentCard}</h5>
                </div>
                
                <div>
                    <h3>Correo: </h3>
                    <h5>{estudiante.email}</h5>
                </div>

                <div>
                    <h3>Celular: </h3>
                    <h5>{estudiante.phoneNumber}</h5>
                </div>

            </div>
                   
        </div>
        
    );
}
 
export default InfoEstudiante;