import { Link } from "react-router-dom";

const Navbar = ({id}) => {
    return (
        
            <div className="container">
                <h1>Sistema de equipo guía - {id}</h1>
                
                <div className="logout" type="submit">
                    <Link to="/" style={{textDecoration:"none"}}>Logout</Link>
                </div>
            </div>
        
    );
}

export default Navbar;