import * as React from "react";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../../hooks/useUser";


const Authentication = () => {
    const navigate = useNavigate()
    const {user} = useUser()
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/users/verify', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log("Токен валиден:", data);
                    navigate(`/${data.user.username}`);

                } else {
                    console.log("Ошибка проверки токена:", res.statusText);
                }
            } catch (error) {
                console.error("Ошибка подключения:", error);
            }
        };

        verifyToken();
    }, [navigate]);


    const initialState = {
        username: "",
        password: ""
    }
    const [loginInputs, setLoginInputs] = useState(initialState)
    const validPass = loginInputs.password.length > 7
    const isValid = Object.values(loginInputs).every(value => value.length > 0) && validPass
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setLoginInputs({
            ...loginInputs,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const login = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(loginInputs)
            });

            if (response.ok) {
                const data = await response.json()
                const {user_id} = data

                localStorage.setItem('user_id', user_id)
                console.log("success:", data)
                navigate(`/${loginInputs.username}`);

            } else {
                const error = await response.json()
                alert(error.message)
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
                                <h1 className="auth__form-title">Логин</h1>
                                <input type="text"
                                       className="auth__form-input input username-input"
                                       placeholder="Username"
                                       name="username"
                                       value={loginInputs.username}
                                       onChange={handleInputChange}
                                />
                                <input type="password"
                                       className="auth__form-input input password-input"
                                       placeholder="Password"
                                       name="password"
                                       value={loginInputs.password}
                                       onChange={handleInputChange}
                                       autoComplete="on"
                                />
                                <input type="submit" value="Submit" className="auth__form-btn button submit-btn"
                                       disabled={!isValid}/>
                            </form>
                            <Link to="/registration">Нет аккаунта? Создайте!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication