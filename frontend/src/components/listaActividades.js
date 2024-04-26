import "../components/listaActividades.css"
import InfoActividad from "./infoActividad";

const ListaActividades = () => {
    return ( 
        <div className="listaActividades">
            <h2>Actividades del Equipo guía</h2>
            <InfoActividad/>
            <InfoActividad/>
        </div>
    );
}
 
export default ListaActividades;