import "../components/infoProfesor.css"
import {  useNavigate } from 'react-router-dom';

const InfoProfesor = ({professor , usuario}) => {
    const navigate = useNavigate();

    const submitModify = async (e) => {
        navigate("/modProfesor", {state: {usuario}});
    }

    return(
        <form onSubmit={submitModify}>
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

                <button>Modificar información</button>  

            </div>
            </form>
        
    );
}
 
export default InfoProfesor;