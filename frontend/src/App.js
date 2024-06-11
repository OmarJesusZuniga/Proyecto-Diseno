
//http://localhost:4000
//https://proyecto-diseno-ol06.onrender.com
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages & components
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import ModificarEstudiante from './pages/modificarEstudiante';
import ModificarProfesor from './pages/modificarProfesor';
import HomeProfe from './pages/HomeProfe';
import HomeStudent from './pages/HomeStudent';

import FilePrueba from './pages/borrar'; // Borrar

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginForm/>} />
          <Route exact path="/home/" element={<Home/>}/>
          <Route exact path="/homeProfe" element={<HomeProfe/>}/>
          <Route exact path="/homeStudent" element={<HomeStudent/>}/>
          <Route path="/modEstudiante" element={<ModificarEstudiante/>} />
          <Route path="/modProfesor" element={<ModificarProfesor/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} /> 
          <Route path="/ResetPassword/:name" element={<ResetPassword/>} />
          <Route path="/file" element={<FilePrueba/>} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
