import { useEffect, useState } from "react";

export const useToggleMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

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

  const toggleMenu = () => {
    if (isDesktop) {
      setIsSubMenuOpen((prev) => !prev);
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen((prev) => !prev);
      setIsSubMenuOpen(false);
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
