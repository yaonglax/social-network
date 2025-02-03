import './styles/App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import User from './pages/UserPage/User';
import Authentication from './pages/Authentication/Authentication';
import Registration from './pages/Registration/Registration.tsx'
import NavBar from './components/Navbar/NavBar';
import {UserProvider} from "./context/UserContext.tsx";

function App() {
    return (

        <UserProvider>
            <Router>
                <NavBar/>
                <Routes>
                    <Route path='/login' element={<Authentication/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path='/userprofile' element={<User/>}/>
                </Routes>
            </Router>
        </UserProvider>
    )
}

export default App
