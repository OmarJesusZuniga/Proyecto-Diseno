import "../components/infoProfesor.css"

const InfoProfesor = ({professor}) => {
    
    return(
        <div className="cartaProfesor">
            <h4>Nombre: {professor.firstname} {professor.firstLastname}</h4>
            <h2>Teléfono-Celular: {professor.phoneNumber}</h2>
            <h2>Teléfono-Oficina: {professor.officeNumber}</h2>
            <h2>Correo: {professor.email}</h2>
            <h2>Código: {professor.code}</h2>
        </div>
        
    );
}
 
export default InfoProfesor;