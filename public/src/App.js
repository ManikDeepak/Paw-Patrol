import './App.css';
import Home from './home';
import Login from './login';
import Dashboard from './dashboard'
import Register from './register';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ForgotPassword from './forgotpass';


function App() {
  return (
    <div className="App">
      
      
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
