import UserProfile from "../../components/UserProfile/UserProfile"

const User = () => {
    // const [user, setUser] = useState(null)
    // const userId = 1;
    //
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const res = await axios.get(`http://localhost:3000/api/users/${userId}`)
    //             setUser(res.data)
    //             console.log(res.data)
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }
    //     fetchUser()
    // }, []);
    return (
        <div className="userpage">

            <main className="main userpage__main">
                <UserProfile/>
            </main>
        </div>
    )
}

export default User