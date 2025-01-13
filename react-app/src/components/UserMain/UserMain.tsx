

import StarRateIcon from '@mui/icons-material/StarRate';
import CustomButtonBlack from '../CustomButton/CustomButtonBlack';

const UserMain = () => {
    return (
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
                            <img src="/src/assets/carrd.jpg" alt="Info Cover" className="usermain__info-img" />
                            <div className="usermain__info-infoblock">
                                <span className="usermain__info-name">yaonglax -<StarRateIcon fontSize='small' /></span>
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
                            <thead className='usermain__info-table-thead'><tr><th>know me more <StarRateIcon fontSize='medium' /></th></tr></thead>
                            <tbody className="usermain__info-table-tbody tbody">
                                <tr className="usermain__info-table-row"><td>about</td></tr>
                                <tr className="usermain__info-table-row"><td>likes</td></tr>
                                <tr className="usermain__info-table-row"><td>dislikes</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserMain