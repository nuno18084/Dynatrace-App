// hooks/useSidebarCollapse.js
import { useState, useEffect } from "react";

export default function useSidebarCollapse(initialState = false) {
  const [collapsed, setCollapsed] = useState(initialState);

  useEffect(() => {
    const body = document.body;
    if (!collapsed) {
      body.classList.add("navbar-open");
    } else {
      body.classList.remove("navbar-open");
    }
  }, [collapsed]);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return { collapsed, setCollapsed, toggleSidebar };
}
