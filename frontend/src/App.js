import {BrowserRouter, Routes, Route, Router} from 'react-router-dom'

//pages & components
import Home from './pages/Home';
import HomeAdmin from './pages/HomeAdmin';
import Navbar from './components/Navbar';
import LoginForm from './pages/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginForm/>} />
          <Route exact path="/home" element={<HomeAdmin/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
