interface DesktopMenuProps {
    openedSubMenu: boolean,
    handleLogOut: () => void
}

const DesktopMenu = ({openedSubMenu, handleLogOut}: DesktopMenuProps) => {

    return (
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
    );
};

export default DesktopMenu;