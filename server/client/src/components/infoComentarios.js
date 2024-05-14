import "./infoComentarios.css"
import moment from 'moment';  

const InfoComentarios = ({comentario , usuario, todosFalse, sAgregarComentarios }) => {

    const agregarComentario = () => {
        todosFalse();
        sAgregarComentarios(true);
    }

    const formattedDate = moment(comentario.createdAt).format("MM/DD/YY HH:mm");

    return(
        <div className="cartaComentario">
            <div className="infoEspecifica">
                <h2>{usuario.email} </h2>
                <div>
                    <h3>Comentario: </h3>
                    <h5>{comentario.text}</h5>
                </div>
                
                <div>
                    <h3>Fecha: </h3>
                    <h5>{formattedDate}</h5>
                </div>
                
            </div>     
        </div>
        
    );
}
 
export default InfoComentarios;
