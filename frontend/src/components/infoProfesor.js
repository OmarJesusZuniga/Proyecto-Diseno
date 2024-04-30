import "../components/infoProfesor.css"
import { Link } from "react-router-dom";

const InfoProfesor = () => {
    return(
        <div className="cartaProfesor">

            <h2>Omar Jesus Zuniga Campos</h2>
 
            <div>
                <h3>Teléfono-Celular: </h3>
                <h5>8565-1919</h5>
            </div>
            <div>
                <h3>Teléfono-Oficina: </h3>
                <h5>8565-1919</h5>
            </div>
            <div>
                <h3>Correo:</h3>
                <h5>omarzunigpi@gmail.com</h5>
            </div>
            <div>
                <h3>Carné: </h3>
                <h5>20220190</h5>
            </div>

            <div className="botonesProfesor" type="submit">
                <Link to="/modProfesor" className="botonesProfesor-button">Modificar información</Link>
            </div>    

        </div>
        
    );
}
 
export default InfoProfesor;