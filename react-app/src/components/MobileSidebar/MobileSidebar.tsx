interface SidebarProps {
    openedSidebar: boolean,
    handleLogOut: () => void
}

const MobileSidebar = ({openedSidebar, handleLogOut}: SidebarProps) => {

    return (
        <div className="sidebar__container">
            <div className="sidebar__wrapper">
                <ul className="sidebar__list">
                    <li className="sidebar__item">Настройки</li>
                    <li className="sidebar__item">
                        <button type="button" onClick={handleLogOut}></button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MobileSidebar;