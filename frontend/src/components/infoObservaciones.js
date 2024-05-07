import "../components/infoObservaciones.css";
import moment from 'moment';  // Import moment

const InfoObservaciones = ({ observacion, usuario, todosFalse, commentIDList }) => {
    const verComentarios = () => {
        todosFalse();
        commentIDList(true);
    }

    // Format the date using moment
    const formattedDate = moment(observacion.createdAt).format("MM/DD/YY HH:mm");

    return (
        <div className="cartaObservacion">
            <div className="infoEspecifica">
                <h2>{usuario.email}</h2>
                <div>
                    <h3>Observación: </h3>
                    <h5>{observacion.text}</h5>
                </div>

                <div>
                    <h3>Fecha: </h3>
                    <h5>{formattedDate}</h5>  {/* Updated to use formattedDate */}
                </div>
                <button onClick={verComentarios} className="btnObservaciones">Agregar comentario</button>
            </div>
        </div>
    );
}

export default InfoObservaciones;
