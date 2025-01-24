import UserHead from "../UserHead/UserHead.tsx";
import UserMain from "../UserMain/UserMain.tsx"
import {useEffect} from "react";
import {useUser} from '../../context/UserContext.tsx'

const UserProfile = () => {

    const {user, updateUser} = useUser()
    useEffect(() => {
        if (!user) {
            const fetchUser = async () => {
                try {
                    const res = await fetch('http://localhost:3000/api/users/profile', {
                        method: "GET",
                        credentials: "include"
                    })
                    if (res.ok) {
                        const data = await res.json()
              
                        updateUser(data)
                    } else {
                        console.error('Ошибка загрузки', await res.text())
                    }
                } catch (e) {
                    console.log(e)
                }
            }

            fetchUser()
        }
    }, [user, updateUser]);
    return (
        <div className="userprofile">

            <div className="userprofile-container container">

                <div className="userprofile-container-wrapper">
                    <UserHead username={user?.username}/>
                    <hr style={{width: "85%"}}/>
                    <UserMain/>
                </div>
            </div>

        </div>
    )
}

export default UserProfile