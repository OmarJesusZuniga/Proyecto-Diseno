import { Link } from "react-router-dom";
import '../components/NavBar.css'; // You can define your sidebar styles in this file

const Navbar = ({id}) => {
    return (
        
        <div className="container">
            <h1>Sistema de equipo guía - {id}</h1>
            
            <div className="logout" type="submit">
                <Link to="/" className="logout-link" >Logout</Link>
            </div>
        </div>
    
        
    );
}

export default Navbar;