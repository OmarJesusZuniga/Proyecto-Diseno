import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages & components
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import ForgotPassword from './pages/forgotPassword';
import ModificarEstudiante from './pages/modificarEstudiante';
import ModificarProfesor from './pages/modificarProfesor';
import HomeProfe from './pages/HomeProfe';

import FilePrueba from './pages/borrar'; // Borrar

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginForm/>} />
          <Route exact path="/home/" element={<Home/>}/>
          <Route exact path="/homeProfe" element={<HomeProfe/>}/>
          <Route path="/modEstudiante" element={<ModificarEstudiante/>} />
          <Route path="/modProfesor" element={<ModificarProfesor/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} /> 
          <Route path="/file" element={<FilePrueba/>} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
