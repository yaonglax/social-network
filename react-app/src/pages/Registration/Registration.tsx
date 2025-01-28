import {useNavigate} from "react-router-dom";
import * as React from "react";
import {useState} from "react";

function Registration() {
    const navigate = useNavigate()
    const initialState = {
        username: "",
        password: ""
    }
    const [registrationInputs, setRegistrationInputs] = useState(initialState)
    const validPass = registrationInputs.password.length > 7
    const isValid = Object.values(registrationInputs).every(value => value.length > 0) && validPass
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setRegistrationInputs({
            ...registrationInputs,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const registration = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/users/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(registrationInputs)
            });

            if (response.ok) {
                const data = await response.json()

                console.log("success:", data)
                navigate("/login")

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
                                registration()
                            }}>
                                <h1 className="auth__form-title">Регистрация</h1>
                                <input type="text"
                                       className="auth__form-input input username-input"
                                       placeholder="Username"
                                       name="username"
                                       value={registrationInputs.username}
                                       onChange={handleInputChange}
                                />
                                <input type="password"
                                       className="auth__form-input input password-input"
                                       placeholder="Password"
                                       name="password"
                                       value={registrationInputs.password}
                                       onChange={handleInputChange}
                                />
                                <input type="submit" value="Submit" className="auth__form-btn button submit-btn"
                                       disabled={!isValid}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;