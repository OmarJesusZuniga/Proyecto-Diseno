import {BrowserRouter, Routes, Route, Router} from 'react-router-dom'

//pages & components
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginForm/>} />
          <Route path="/home/:id" element={<Home/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
