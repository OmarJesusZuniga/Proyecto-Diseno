import { Link } from "react-router-dom";

const Navbar = ({id, apellido}) => {
    return (
        
            <div className="container">
                <h1>Sistema de equipo guía - {id} {apellido}</h1>
                
                <div className="logout" type="submit">
                    <Link to="/" style={{textDecoration:"none"}}>Logout</Link>
                </div>
            </div>
        
    );
}

export default Navbar;