import "../components/infoActividad.css"

const InfoActividadProfe = () => {

    const dejarObservaciones = async (e) => {
        const observacion = null
    }

    return(
        <div className="cartaActividad">
            <h2>Juegos al aire libre</h2>
            <h3>Semana #16</h3>
            
            <div>
                <h4>Tipo: </h4>
                <h5>Actividad Fisica</h5>
            </div>

            <div>
                <h4>Fecha/hora:</h4>
                <h5>12 de Noviembre del 2024 a las 4:50pm</h5>
            </div>

            <div className="cartaActividad-Multiple">
                <h4>Responsable(s): </h4>
                <h5>Omar Jesus Zuniga Campos (2022019053)</h5>
                <h5>Omar Jesus Zuniga Campos (2022019053)</h5>
            </div>

            <div>
                <h4>Días anunciar: </h4>
                <h5>5 dias</h5>
            </div>

            <div className="cartaActividad-Multiple">
                <h4>Días recordatorio: </h4>
                <h5>15 de Mayo</h5>
                <h5>21 de Mayo</h5>
            </div>

            <div>
                <h4>Modalidad: </h4>
                <h5>Presencial</h5>
            </div>

            <div>
                <h4>Enlace: </h4>
                <h5>N/A</h5>
            </div>

            <div>
                <h4>Afiche: </h4>
                <h5>Formato PDF</h5>
            </div>

            <div>
                <h4>Estado: </h4>
                <h5>Completado</h5>
            </div>

            <button onClick={dejarObservaciones}> Observaciones </button>

        </div>
        
    );
}
 
export default InfoActividadProfe;