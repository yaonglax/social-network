import { useEffect, useState } from "react";
import { useUser } from '../../hooks/useUser.ts'
import { useParams } from "react-router-dom";
import { PeopleAlt, RssFeed } from "@mui/icons-material";
import LinkIcon from '@mui/icons-material/Link';

interface profileUserType {
    user_id: number,
    username: string,
    friendsCount: number
}

const UserProfile = () => {

    const { username } = useParams()
    const { user, updateUser } = useUser()
    const [profileUser, setProfileUser] = useState<profileUserType | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [friendshipStatus, setFriendShipStatus] = useState(null)

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

    useEffect(() => {
        if (!username) return;

        const fetchData = async () => {
            setIsLoading(true);

            try {

                const profileUser = await fetchProfileUser();
                if (profileUser) {
                    await fetchFriendshipStatus(profileUser.user_id);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchProfileUser = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(`http://localhost:3000/api/users/profile/${username}`,
                    {
                        method: "GET",
                        credentials: "include"
                    })
                if (res.ok) {
                    const data = await res.json()
                    setProfileUser(data)
                    return data;
                } else {
                    console.error("Ошибка загрузки пользователя")
                    setProfileUser(null)
                }
            } catch (e) {
                console.error(e)
            } finally {
                setIsLoading(false)
            }
        }
        const fetchFriendshipStatus = async (user2: number) => {
            const user1 = user?.id

            try {
                const res = await fetch(`http://localhost:3000/api/friends/fetchStatus?id1=${user1}&id2=${user2}`,
                    {
                        credentials: "include",
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                if (res.ok) {
                    const data = await res.json()
                    setFriendShipStatus(data)
                    console.log(data)
                }
            } catch (e) {
                console.error(e)
            }
        }

        fetchData();
    }, [username, user?.id]);
    console.log(profileUser)

    const handleFriendRequest = async () => {
        const senderId = user?.id
        const consumerId = profileUser?.user_id

        if (senderId === undefined || consumerId === undefined || isNaN(senderId) || isNaN(consumerId)) {
            console.error('senderId и consumerId должны быть числами');
            return;
        }
        setIsLoading(true)


        try {
            const res = await fetch('http://localhost:3000/api/friends/sendRequest',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id1: Number(senderId),
                        id2: Number(consumerId)
                    })
                })
            if (res.ok) {
                const data = await res.json()
                console.log(data)
            }


        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    const displayUser = profileUser || user;
    const statusMessage =
        friendshipStatus === 'pending'
            ? 'Запрос отправлен'
            : friendshipStatus === 'accepted'
                ? 'Удалить из друзей'
                : 'Добавить в друзей';

    return (
        <div className="userprofile">

            <div className="userprofile-container container">

                <div className="userprofile-container-wrapper">
                    <div className="userprofile-info">
                        <div className="userprofile-info__wrapper">
                            <div className="userprofile-info__left">
                                <div className="userprofile-info__userphoto">
                                    <img src="/src/assets/carrd.jpg" alt="userphoto" className="userprofile-info__img" />
                                </div>
                                <span className="userprofile-info-username">{displayUser?.username}</span>
                            </div>
                            <div className="userprofile-info__right">
                                <ul className="userprofile-info__list">
                                    <li className="userprofile-info__item userprofile-info-status"><RssFeed />i
                                        saw
                                        the
                                        devil
                                        by
                                        the
                                        window!!
                                        {profileUser && profileUser.user_id !== user?.id && !isLoading ?
                                            <button onClick={handleFriendRequest}>{statusMessage}</button> : ""}
                                    </li>
                                    <li className="userprofile-info__item userprofile-info-friendslist"><PeopleAlt
                                        fontSize="medium" />{displayUser?.friendsCount} friends
                                    </li>
                                    <li className="userprofile-info__item userprofile-info-links"><LinkIcon />links</li>
                                    <li className="userprofile-info__item userprofile-info-gender">she/her</li>
                                </ul>

                            </div>

                        </div>
                    </div>
                    <div className="userprofile-highlights">
                        <h2 className="userprofile-highlights-title">Highlights</h2>
                        <hr style={{ border: 'none', borderTop: '2px solid lightgrey' }} />
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