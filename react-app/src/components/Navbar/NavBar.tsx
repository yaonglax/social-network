
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
    return (
        <div className="navbar">
            <div className='navbar-container container'>
                <div className="navbar-container__wrapper">
                    <span className="navbar-container-logo logo">
                        <img src="/src/assets/logo.png" alt="Bloomie" className="navbar-container-logoimage" />
                    </span>
                    <span className="navbar-container-description">Bloom w/friends!</span>
                    <MenuIcon fontSize="medium" />
                </div>
            </div>
        </div>
    )
}

export default NavBar