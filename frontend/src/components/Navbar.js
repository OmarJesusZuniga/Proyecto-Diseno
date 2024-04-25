import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        
            <div className="container">
                <h1>Sistema de equipo guía</h1>
                
                <div className="logout" type="submit">
                    <Link to="/" style={{textDecoration:"none"}}>Logout</Link>
                </div>
            </div>
        
    );
}

export default Navbar;