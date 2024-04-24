import { useEffect, useState } from "react";
import Sidebar from "../components/sideBar";

const Home = () => {
    const [workouts, setWorkouts] = useState(null)
    
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])
    
    return (
        <div className="home"> 
         <div className="workouts"> 
            {workouts && workouts.map((workout) => (
                <p key={workout.id}>{workout.title}</p>
            ))}
         </div>
        <div className="contenido"><p>buenass</p></div>
        </div>
    )
}


export default Home;