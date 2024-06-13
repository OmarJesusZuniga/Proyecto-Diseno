import './infoNotificaciones.css'
import moment from 'moment';  

const InfoNotificaciones = ({notificacion}) => {
    
    const formattedDate = moment(notificacion.date).format("MM/DD/YY HH:mm");

    return (
        <div className="cartaComentario">
            <div className="infoEspecifica">
                <h2>{notificacion.sender} </h2>
                <div>
                    <h3>Texto: </h3>
                    <h5>{notificacion.text}</h5>
                </div>
                
                <div>
                    <h3>Fecha: </h3>
                    <h5>{formattedDate}</h5>
                </div>
                
            </div>     
        </div>
    );
}

export default InfoNotificaciones;