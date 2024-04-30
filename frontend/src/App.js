import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages & components
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import ModificarEstudiante from './pages/modificarEstudiante';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginForm/>} />
          <Route path="/home/" element={<Home/>}/>
          <Route path="/modEstudiante" element={<ModificarEstudiante/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
