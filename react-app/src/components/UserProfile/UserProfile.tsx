import UserHead from "../UserHead/UserHead"
import UserMain from "../UserMain/UserMain"


const UserProfile = () => {
    return (
        <div className="userprofile">

            <div className="userprofile-container container">

                <div className="userprofile-container-wrapper">
                    <UserHead />
                    <hr style={{ width: "85%" }} />
                    <UserMain />
                </div>
            </div>
        </div>
    )
}

export default UserProfile