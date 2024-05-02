import "../components/infoProfesor.css"
import {  useNavigate } from 'react-router-dom';

const InfoProfesor = ({professor , usuario, equipo}) => {
    const navigate = useNavigate();
    
    const submitModify = async (e) => {
        navigate("/modProfesor", {state: {usuario, professor}});
    }
    const registroProfesor = async (e) => {
        navigate("/home/", {state: {usuario}});
    }


    return(
        <form>
            <div className="cartaProfesor">

                <h2>{professor.firstname} {professor.firstLastname}</h2>
    
                <div>
                    <h3>Teléfono-Celular: </h3>
                    <h5>{professor.phoneNumber}</h5>
                </div>
                <div>
                    <h3>Teléfono-Oficina: </h3>
                    <h5>{professor.officeNumber}</h5>
                </div>
                <div>
                    <h3>Correo:</h3>
                    <h5>{professor.email}</h5>
                </div>
                <div>
                    <h3>Código: </h3>
                    <h5>{professor.code}</h5>
                </div>

                <div className="botonesProfesor">
                    <button onClick={submitModify}>Modificar informacion</button>
                    {equipo.professors.map((professorM) => {
                        if(professorM._id === professor._id){
                            <button onClick={registroProfesor}>Registrar al equipo</button>
                        }
                    })}
                </div>

            </div>
            </form>
        
    );
}
 
export default InfoProfesor;