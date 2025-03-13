import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useUser } from "../../hooks/useUser.ts";
import { useToggleMenu } from "../../hooks/useToggleMenu.ts";
import DesktopMenu from "../DesktopMenu/DesktopMenu.tsx";
import MobileSidebar from "../MobileSidebar/MobileSidebar.tsx";

export interface UserInfo {
    user_id: number,
    username: string
}

const NavBar = () => {

    const navigate = useNavigate();
    const { clearUser } = useUser()
    const { isSidebarOpen, isSubMenuOpen, closeAll, toggleMenu, isDesktop } = useToggleMenu()
    const [usersList, setUsersList] = useState<UserInfo[] | null>(null)

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/users/getAllUsers', {
                    method: "GET",
                    credentials: "include"
                })
                if (res.ok) {
                    const data: UserInfo[] = await res.json()
                    setUsersList(data)


                }
                else {
                    console.error('Ошибка при получении списка пользователей')
                }
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchAllUsers()
    }, [])

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
                closeAll()
            } else {
                const data = res.json()
                console.log('Ошибка выхода: ', data)
            }
        } catch (e) {
            console.error(e)
        }
        closeAll()
    }
    // const handleSubMenu = () => {
    //     setOpenedSubMenu(prev => !prev)
    //
    // }

    return (
        <div className={`navbar ${isSubMenuOpen && isDesktop ? "navbar--expanded" : ""}`}>
            <div className='navbar-container container'>
                <div className="navbar-container__wrapper">
                    <div className="navbar-container__main-nav">
                        <span className="navbar-container-logo logo">
                            <img src="/src/assets/logo.png" alt="Bloomie" className="navbar-container-logoimage" />
                        </span>
                        <span className="navbar-container-description">Bloom w/friends!</span>
                        <button className="navbar-container__burgerbutton"><MenuIcon fontSize="medium"
                            onClick={toggleMenu} /></button>
                    </div>

                    {isDesktop ?
                        <DesktopMenu openedSubMenu={isSubMenuOpen} handleLogOut={handleLogOut} usersList={usersList || []} />
                        :
                        <MobileSidebar openedSidebar={isSidebarOpen} handleLogOut={handleLogOut} toggleMenu={toggleMenu} />}


                </div>
            </div>
        </div>
    )
}

export default NavBar