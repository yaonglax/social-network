import {useEffect} from "react";
import {useUser} from '../../hooks/useUser.ts'
import {useNavigate} from "react-router-dom";
import {PeopleAlt, RssFeed} from "@mui/icons-material";
import LinkIcon from '@mui/icons-material/Link';

const UserProfile = () => {
    const navigate = useNavigate()
    const {user, updateUser, clearUser} = useUser()
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
                        console.log(data)
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

    if (!user) {
        return <div>Загрузка данных пользователя...</div>;
    }


    return (
        <div className="userprofile">

            <div className="userprofile-container container">

                <div className="userprofile-container-wrapper">
                    <div className="userprofile-info">
                        <div className="userprofile-info__wrapper">
                            <div className="userprofile-info__left">
                                <div className="userprofile-info__userphoto">
                                    <img src="/src/assets/carrd.jpg" alt="userphoto" className="userprofile-info__img"/>
                                </div>
                                <span className="userprofile-info-username">{user.username}</span>
                            </div>
                            <div className="userprofile-info-right">
                                <ul className="userprofile-info__list">
                                    <li className="userprofile-info__item userprofile-info-status"><RssFeed/>i
                                        saw
                                        the
                                        devil
                                        by
                                        the
                                        window!!
                                    </li>
                                    <li className="userprofile-info__item userprofile-info-friendslist"><PeopleAlt
                                        fontSize="medium"/>10 friends
                                    </li>
                                    <li className="userprofile-info__item userprofile-info-links"><LinkIcon/>links</li>
                                    <li className="userprofile-info__item userprofile-info-gender">she/her</li>
                                </ul>

                            </div>

                        </div>
                    </div>
                    <div className="userprofile-highlights">
                        <h2 className="userprofile-highlights-title">Highlights</h2>
                        <hr style={{border: 'none', borderTop: '2px solid lightgrey'}}/>
                        <ul className="userprofile-highlights__list">
                            <li className="userprofile-highlights__item">1</li>
                            <li className="userprofile-highlights__item">2</li>
                            <li className="userprofile-highlights__item">3</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile