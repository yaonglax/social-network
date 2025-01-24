import './styles/App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import User from './pages/UserPage/User';
import Authentication from './pages/Authentication/Authentication';
import NavBar from './components/Navbar/NavBar';
import {UserProvider} from "./context/UserContext.tsx";

function App() {
    return (
        <UserProvider>
            <NavBar/>
            <Router>
                <Routes>
                    <Route path='/auth' element={<Authentication/>}/>
                    <Route path='/userprofile' element={<User/>}/>
                </Routes>
            </Router>
        </UserProvider>
    )
}

export default App
