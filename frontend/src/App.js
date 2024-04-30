import {BrowserRouter, Routes, Route, Router} from 'react-router-dom'

//pages & components
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import ModificarEstudiante from './pages/modificarEstudiante';
import ModificarProfesor from './pages/modificarProfesor';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginForm/>} />
          <Route path="/home/:id" element={<Home/>}/>
          <Route path="/modEstudiante" element={<ModificarEstudiante/>} />
          <Route path="/modProfesor" element={<ModificarProfesor/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
