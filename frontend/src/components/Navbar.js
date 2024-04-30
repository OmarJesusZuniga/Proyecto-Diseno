import { Link } from "react-router-dom";
import '../components/NavBar.css'; // You can define your sidebar styles in this file

const Navbar = ({id, apellido}) => {
    return (
        
        <div className="container">
            <h1>Sistema de equipo guía - {id} {apellido}</h1>
            
            <div className="logout" type="submit">
                <Link to="/" className="logout-link" >Logout</Link>
            </div>
        </div>
    
        
    );
}

export default Navbar;