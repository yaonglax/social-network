interface SidebarProps {
    openedSidebar: boolean,
    handleLogOut: () => void,
    toggleMenu: () => void
}

const MobileSidebar = ({ openedSidebar, toggleMenu }: SidebarProps) => {

    return (
        <>
            <div className="sidebar-background" style={{ display: openedSidebar ? 'block' : 'none' }}></div>
            <div className={`sidebar ${openedSidebar ? "sidebar--visible" : ""}`}>
                <div className="sidebar__wrapper">
                    <ul className="sidebar__list">
                        <li className="sidebar__item">Настройки</li>
                        <li className="sidebar__item">
                            <button type="button" onClick={toggleMenu}>Закрыть</button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MobileSidebar;