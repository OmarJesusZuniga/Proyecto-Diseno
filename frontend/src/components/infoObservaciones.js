import "../components/infoObservaciones.css"
import {  useNavigate } from 'react-router-dom';

const InfoObservaciones = ({professor, observacion}) => {
    const navigate = useNavigate();

    

    return(
        <div className="cartaObservacion">
            <div className="infoEspecifica">
                <h2>{professor.email} </h2>
                <div>
                    <h3>Observación: </h3>
                    <h5>{observacion.text}</h5>
                </div>
                
                <div>
                    <h3>Fecha: </h3>
                    <h5>{observacion.createdAt}</h5>
                </div>

            </div>     
        </div>
        
    );
}
 
export default InfoObservaciones;