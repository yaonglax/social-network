import {useState} from "react";
import {useNavigate} from "react-router-dom";


const Authentication = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const login = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({username, password})
            });

            if (response.ok) {
                const data = await response.json()
                const {user_id} = data

                localStorage.setItem('user_id', user_id)
                console.log("success:", data)
                navigate("/userprofile")

            } else {
                console.error('Ошибка', await response.text())
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="auth">
            <div className="auth-container container">
                <div className="auth-container__wrapper">
                    <div className="auth__form form">
                        <div className="auth__form-wrapper">
                            <form className="auth__form-login" onSubmit={(e) => {
                                e.preventDefault();
                                login();
                            }}>
                                <input type="text"
                                       className="auth__form-input input username-input"
                                       placeholder="Username"
                                       value={username}
                                       onChange={(e) => setUsername(e.target.value)}
                                />
                                <input type="password"
                                       className="auth__form-input input password-input"
                                       placeholder="Password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                                <input type="submit" value="Submit" className="auth__form-btn button submit-btn"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication