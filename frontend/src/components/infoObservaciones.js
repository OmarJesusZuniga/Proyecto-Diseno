import "../components/infoObservaciones.css"

const InfoObservaciones = ({observacion , professor, todosFalse, commentIDList }) => {

    const verComentarios = () => {
        todosFalse();
        commentIDList(true);
    }

    return(
        <div className="cartaObservacion">
            <div className="infoEspecifica">
                <h2>{professor.email} </h2>
                <div>
                    <h3>Observación: </h3>
                    <h5>{observacion.text}</h5>
                </div>
                <button onClick={verComentarios} className="btnCommentarios">Agregar observación</button>
                <div>
                    <h3>Fecha: </h3>
                    <h5>{observacion.createdAt}</h5>
                </div>

            </div>     
        </div>
        
    );
}
 
export default InfoObservaciones;