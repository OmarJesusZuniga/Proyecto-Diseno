import './modificarEstudiante.css';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

const ModificarEstudiante = () => {
    const {id} = useParams();
    
    return (       
        <div className="principal">
            <Navbar id={id}/>
            <h2>Información estudiante</h2>
            <div className="input-box">
                <input type="text" placeholder='Nombre completo' required />
            </div>
            <div className="input-box">
                <input type="text" placeholder='Correo' required />
            </div>
            <div className="input-box">
                <input type="text" placeholder='Celular' required />
            </div>
            <div className="botonGuardar" type="submit">
                <Link to="/home/:id" style={{textDecoration:"none"}}>Guardar Cambios</Link>
            </div> 

        </div>
        
    );
}

export default ModificarEstudiante;