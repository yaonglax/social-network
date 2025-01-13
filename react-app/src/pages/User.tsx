import { useEffect, useState } from "react"
import NavBar from "../components/Navbar/NavBar"
import UserProfile from "../components/UserProfile/UserProfile"
import axios from "axios"
const User = () => {
    const [user, setUser] = useState(null);
    const userId = 1;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/users/${userId}`)
                setUser(res.data)
                console.log(res.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchUser()
    }, [])
    return (
        <div className="userpage">
            <header className="header">
                <NavBar />
            </header>
            <main className="main userpage__main">
                <UserProfile />
            </main>
        </div>
    )
}

export default User