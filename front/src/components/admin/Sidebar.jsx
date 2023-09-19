import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { links } from "./SidebarData";
import React from "react";

const Sidebar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600 && isNavOpen) {
        setIsNavOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isNavOpen]);

  return (
    <>
      <button
        className="Sidebar-toggle nav-button"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <span className="material-symbols-outlined">
          {isNavOpen ? "toggle_on" : "toggle_off"}
        </span>
      </button>
      <aside className={`nav ${isNavOpen ? "nav-open" : ""}`}>
        <div className="title">Administrateur</div>
        <ul>
          {links.map((link) => (
            <li>
              <Link className="links-sidebar" to={link.path}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};
export default Sidebar;
