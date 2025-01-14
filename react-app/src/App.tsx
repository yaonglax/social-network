
import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User from './pages/UserPage/User';
import Authentication from './pages/Authentication/Authentication';
import NavBar from './components/Navbar/NavBar';


function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path='/' element={<Authentication />} />
          <Route path='/user' element={<User />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
