import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";
import {useUser} from "../../hooks/useUser.ts";
import {useState} from "react";


const NavBar = () => {

    const navigate = useNavigate();
    const {clearUser} = useUser()
    const [openedSubMenu, setOpenedSubMenu] = useState(false)

    const handleLogOut = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/users/logout', {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (res.ok) {
                clearUser();
                navigate('/login')
            } else {
                const data = res.json()
                console.log('Ошибка выхода: ', data)
            }
        } catch (e) {
            console.error(e)
        }
        setOpenedSubMenu(false)
    }
    const handleSubMenu = () => {
        setOpenedSubMenu(prev => !prev)
    }
    return (
        <div className={`navbar ${openedSubMenu ? "navbar--expanded" : ""}`}>
            <div className='navbar-container container'>
                <div className="navbar-container__wrapper">
                    <div className="navbar-container__main-nav">
                    <span className="navbar-container-logo logo">
                        <img src="/src/assets/logo.png" alt="Bloomie" className="navbar-container-logoimage"/>
                    </span>
                        <span className="navbar-container-description">Bloom w/friends!</span>
                        <button><MenuIcon fontSize="medium" onClick={handleSubMenu}/></button>
                    </div>
                    <div
                        className={`navbar-container__sub-nav ${openedSubMenu ? "navbar-container__sub-nav--visible" : ""}`}>
                        <ul className="navbar-container__list">
                            <li className="navbar-container__item item">Настройки</li>
                            <li className="navbar-container__item item">
                                <button className="navbar-container-button" type="button" onClick={handleLogOut}>Выйти
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar