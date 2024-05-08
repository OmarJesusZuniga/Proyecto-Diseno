
import "../components/infoProfesor.css"
import {  useNavigate } from 'react-router-dom';
import axios from "axios";

const InfoProfesor = ({professor , usuario, equipo, limpiar}) => {
    const navigate = useNavigate();
    
    const submitModify = async (e) => {
        navigate("/modProfesor", {state: {usuario, professor}});
    }
    const registroProfesor = async (e) => {

        let hayProfeDeCampus = false;

        for (let i=0; i<equipo.professors.length; i++){
            if (equipo.professors[i].campus === usuario.campus){
                
                hayProfeDeCampus = true;
            }
        }
        if(hayProfeDeCampus){
            
            alert('Ya hay un profesor de este campus en el equipo guia')
        } else {
            axios.post('http://localhost:4000/api/guideTeam/addProfe/', {guideTeamId: equipo._id, professorId: professor._id})
            .then(response => {
                limpiar();
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error adding professor:', error);
            });
        }
    }


    return(
        
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
                    {equipo.professors.length > 0 && equipo.professors.map((professorM) => {
                        if (!(professorM._id === professor._id)) {
                        return (
                            <button key={professorM._id} onClick={registroProfesor}>Registrar al equipo</button>
                        );
                        }
                        return null; // or any other JSX you want to render if the condition is not met
                    })}
                    {equipo.professors.length === 0 && <button key={professor._id} onClick={registroProfesor}>Registrar al equipo</button>}
                </div>

            </div>
            
        
    );
}
 
export default InfoProfesor;