import { useUserProfile } from "../../hooks/useUserProfile.ts";
import { useEffect, useState } from "react";
import { PeopleAlt, RssFeed } from "@mui/icons-material";
import LinkIcon from '@mui/icons-material/Link';
import { FriendsModal } from "../modals/FriendsModal/friendsModal.tsx";
import { useLocation } from "react-router-dom";


const UserProfile = () => {
    const location = useLocation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        displayUser,
        isLoading,
        friendshipStatus,
        friendRequestsCount,
        handleFriendRequest
    } = useUserProfile();

    const statusMessage =
        friendshipStatus === 'pending'
            ? 'Запрос отправлен'
            : friendshipStatus === 'accepted'
                ? 'Удалить из друзей'
                : 'Добавить в друзей';

    useEffect(() => {
        setIsModalOpen(false)
    }, [location.key])
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
                                    <li className="userprofile-info__item userprofile-info-status"><RssFeed />i saw the devil by the window!!
                                        {friendshipStatus && (
                                            <button onClick={handleFriendRequest}>
                                                {statusMessage}
                                            </button>
                                        )}
                                    </li>
                                    <li className="userprofile-info__item userprofile-info-friendslist"><PeopleAlt
                                        fontSize="medium" />{displayUser?.friendsCount} friends
                                        {friendRequestsCount > 0 ?
                                            <button className="userprofile-info__requests-button" onClick={() => setIsModalOpen(true)}>{`+ ${friendRequestsCount > 10 ? "" : friendRequestsCount}`}</button>
                                            : ""}
                                        <FriendsModal
                                            open={isModalOpen}
                                            onClose={() => setIsModalOpen(false)}
                                        />
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