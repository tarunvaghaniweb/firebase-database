import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Profile from './Profile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
