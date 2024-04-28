
import "../components/infoEstudiante.css"

const InfoEstudiante = () => {
    
    const dejarPrimera = () =>{
        
    }

    return(
        <div className="cartaEstudiante">
            <div className="infoEspecifica">
                <h4>Carné: </h4>
                <h4>Nombre Completo: </h4>
                <h2>Correo: </h2>
                <h2>Celular: </h2> 
            </div>
            <div className="botonesEstudiante">
                <button onClick={dejarPrimera}> Modificar información</button>
            </div>        
        </div>
        
    );
}
 
export default InfoEstudiante;