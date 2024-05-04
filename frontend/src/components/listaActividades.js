import "../components/listaActividades.css"
import InfoActividad from "./infoActividad";

const ListaActividades = ({observaciones}) => {
    
    return ( 
        <div className="listaActividades">
            <h2>Actividades del Equipo guía</h2>
            <InfoActividad observaciones={observaciones}/>
            <InfoActividad observaciones={observaciones}/>
        </div>
    );
}
 
export default ListaActividades;