import {useEffect} from "react";
import {useUser} from '../../hooks/useUser.ts'
import StarRateIcon from '@mui/icons-material/StarRate';
import CustomButtonBlack from '../CustomButton/CustomButtonBlack';
import {useNavigate} from "react-router-dom";

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
    }
    return (
        <div className="userprofile">

            <div className="userprofile-container container">

                <div className="userprofile-container-wrapper">
                    <div className="userhead">
                        <div className="userhead__container">
                            <div className="userhead__container-wrapper">
                                <div className="userhead__header">
                                    <div className="userhead__header-top">
                                        <span className="userhead__header-title">Bloomie's space</span>
                                        <span className="userhead__header-description">Bloom w/friends<i>!</i></span>
                                    </div>
                                    <div className="userhead__header-bottom">
                                        <div className="userhead__header-bottom-cover userhead__cover">
                                            <div className="userhead__cover-title">introducing<br/>
                                                {user.username}
                                            </div>
                                            <span
                                                className="userhead__cover-description">Welcome to {user.username}' space!</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style={{width: "85%"}}/>
                    <div className="usermain__main">
                        <div className="usermain__btns">
                            <CustomButtonBlack>profile</CustomButtonBlack>
                            <CustomButtonBlack>fandoms</CustomButtonBlack>
                            <CustomButtonBlack>home</CustomButtonBlack>
                        </div>
                        <div className="usermain__info">
                            <div className="usermain__info-left">
                                <div className="usermain__info-left-wrapper">
                        <span className="usermain__info-image">
                            <img src="/src/assets/carrd.jpg" alt="Info Cover" className="usermain__info-img"/>
                            <div className="usermain__info-infoblock">
                                <span className="usermain__info-name">{user.username} -<StarRateIcon fontSize='small'/></span>
                                <p className="usermain__info-addition">
                                    <span className="usermain__info-addition-prns">she/her</span>
                                    <span className="usermain__info-addition-age">21</span>
                                </p>
                            </div>
                        </span>

                                </div>
                            </div>
                            <div className="usermain__info-right">
                                <div className="usermain__info-right-wrapper">
                                    <table className="usermain__info-table table">
                                        <thead className='usermain__info-table-thead'>
                                        <tr>
                                            <th>know me more <StarRateIcon fontSize='medium'/></th>
                                        </tr>
                                        </thead>
                                        <tbody className="usermain__info-table-tbody tbody">
                                        <tr className="usermain__info-table-row">
                                            <td>about</td>
                                        </tr>
                                        <tr className="usermain__info-table-row">
                                            <td>likes</td>
                                        </tr>
                                        <tr className="usermain__info-table-row">
                                            <td>dislikes</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleLogOut}>Выйти</button>
        </div>
    )
}

export default UserProfile