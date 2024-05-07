import "../components/infoObservaciones.css"

const InfoObservaciones = ({observacion , professor}) => {

    
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