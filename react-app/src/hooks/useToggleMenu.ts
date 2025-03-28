import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useToggleMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeAll = () => {
    setIsSidebarOpen(false);
    setIsSubMenuOpen(false);
  };

  useEffect(() => {
    closeAll();
  }, [location.key]);

  const toggleMenu = () => {
    if (isDesktop) {
      setIsSubMenuOpen((prev) => !prev);
      setIsSidebarOpen(false);
      console.log(isDesktop);
    } else {
      setIsSidebarOpen((prev) => !prev);
      setIsSubMenuOpen(false);
      console.log(isDesktop);
    }
  };

  return {
    isSidebarOpen,
    isSubMenuOpen,
    isDesktop,
    closeAll,
    toggleMenu,
  };
};
