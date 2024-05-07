import "../components/infoObservaciones.css"

const InfoComentarios = ({comentario , usuario, todosFalse, sAgregarComentarios }) => {

    const agregarComentario = () => {
        todosFalse();
        sAgregarComentarios(true);
    }

    return(
        <div className="cartaComentario">
            <div className="infoEspecifica">
                <h2>{usuario.email} </h2>
                <div>
                    <h3>Observación: </h3>
                    <h5>{comentario.text}</h5>
                </div>
                <button onClick={agregarComentario} className="btnCommentarios">Agregar comentario</button>
                <div>
                    <h3>Fecha: </h3>
                    <h5>{comentario.createdAt}</h5>
                </div>

            </div>     
        </div>
        
    );
}
 
export default InfoComentarios;
