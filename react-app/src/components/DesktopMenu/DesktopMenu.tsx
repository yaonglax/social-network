import {useEffect, useState} from "react";
import {UserInfo} from "../Navbar/NavBar";
import {Link} from "react-router-dom";
import {useSearch} from "../../hooks/useSearch.ts";

interface DesktopMenuProps {
    openedSubMenu: boolean,
    handleLogOut: () => void,
    usersList: UserInfo[]
}

const DesktopMenu = ({openedSubMenu, handleLogOut, usersList}: DesktopMenuProps) => {

    const [searchResult, setSearchResult] = useState<UserInfo[]>([])
    const [usernameLink, setUsernameLink] = useState<string | null>(null)
    const {userId} = useSearch(usernameLink || "")

    useEffect(() => {
        if (usernameLink) {
            viewProfile()
        }
    }, [usernameLink]);

    const handleSearch = (value: string) => {

        const newUserList = usersList.filter(user => user.username.includes(value))
        if (value.length === 0) {
            newUserList.length = 0
        }
        setSearchResult(newUserList)
    }

    const viewProfile = async () => {

        try {
            const url =
                userId ? `http://localhost:3000/api/users/profile?userId=${userId}`
                    :
                    'http://localhost:3000/api/users/profile'
            const res = await fetch(url, {
                method: "GET",
                credentials: "include"
            })
            if (res.ok) {
                const data = await res.json()
            } else {
                console.error('Ошибка загрузки', await res.text())
            }
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div
            className={`navbar-container__sub-nav ${openedSubMenu ? "navbar-container__sub-nav--visible" : ""}`}>
            <ul className="navbar-container__list">
                <li className="navbar-container__item item">
                    <div className="navbar-container__search-container search-container">
                        <input className="navbar-container__search-field search-field" type="text"
                               placeholder="Найти пользователя" onChange={(e) => handleSearch(e.target.value)}/>
                        <ul className="search-container__list">
                            {searchResult.length === 0 ?
                                <li className="search-container__item item item--default">Пользователь не найден</li>
                                :
                                searchResult.map((user) => (
                                    <li key={user.user_id}><Link
                                        to={{pathname: `/${user.username}`}}
                                        onClick={() => {

                                            setUsernameLink(user.username);

                                        }}>{user.username}</Link>
                                    </li>
                                ))}


                        </ul>
                    </div>
                </li>
                <li className="navbar-container__item item">Настройки</li>
                <li className="navbar-container__item item">
                    <button className="navbar-container-button" type="button" onClick={handleLogOut}>Выйти
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default DesktopMenu;