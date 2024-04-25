import { useEffect, useState } from "react";
import Sidebar from "../components/sideBar";
import Navbar from "../components/Navbar";

const Home = () => {
    const [workouts, setWorkouts] = useState(null);
    const [option1, setOption1] = useState(true);
    const [option2, setOption2] = useState(false);
    const [option3, setOption3] = useState(false);
    
    return (
        <div className="home"> 
            <Navbar/>
            <div className="horizontal-container"> {/* This div is added */}
                <Sidebar s1={setOption1} s2={setOption2} s3={setOption3}/>
                {option1 && <div className="contenido"><p>1</p></div>}
                {option2 && <div className="contenido"><p>2</p></div>}
            </div>
            
        </div>
    )
}

export default Home;
