import { Link } from "react-router-dom";
import "../components/infoEstudiante.css"

const InfoEstudiante = () => {

    return(
        <div className="cartaEstudiante">
            <div className="infoEspecifica">
                <h2>Omar Jesus Zuniga Campos</h2>
                <div>
                    <h3>Carné: </h3>
                    <h5>2022019053</h5>
                </div>
                
                <div>
                    <h3>Correo: </h3>
                    <h5>omarzunigpi@gmail.com</h5>
                </div>

                <div>
                    <h3>Celular: </h3>
                    <h5>8565-1919</h5>
                </div>

            </div>
            <div className="botonesEstudiante" type="submit">
                <Link to="/modEstudiante" className="botonesEstudiante-button">Modificar información</Link>
            </div>        
        </div>
        
    );
}
 
export default InfoEstudiante;