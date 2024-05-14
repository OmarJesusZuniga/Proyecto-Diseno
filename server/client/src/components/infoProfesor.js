
import "./infoProfesor.css"
import {  useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

const InfoProfesor = ({equipo, professor , usuario, limpiar, setCambios, adminMadre}) => {
    const navigate = useNavigate();
    
    const [estoyEnEquipo, setEE] = useState(false);
    const [hayPorfCoord, setCoord] = useState(true);

    useEffect(() => {
        equipo.professors.map((prof) => {
            if (prof._id === professor._id){
                setEE(true);
            }
        })

        
        if (equipo.guideProfessor === null){
            setCoord(false);
        } else{
            if (equipo.guideProfessor._id === professor._id){
                setEE(true);
            }
        }

    }, []);

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
                setCambios('cambio');
            })
            .catch(error => {
                console.error('Error adding professor:', error);
            });
        }
    }

    const addCoordinador = async () => {
        axios.patch('http://localhost:4000/api/guideTeam/addGuideProf/'+equipo._id+'/'+professor._id)
        .then(response => {
            limpiar();
            setCambios('cambio');
        })
        .catch(error => {
            console.error('Error adding professor:', error);
        });
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
                    {!estoyEnEquipo && <button onClick={registroProfesor}>Registrar al equipo</button>}
                    {adminMadre && !hayPorfCoord && <button onClick={addCoordinador}>Denominar Coordinador</button>}
                </div>

            </div>
            
        
    );
}
 
export default InfoProfesor;