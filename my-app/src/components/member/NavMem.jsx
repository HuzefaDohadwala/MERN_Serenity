import React, { useState } from "react";
import "./NavMem.css";

const NavMem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="logo">Betterhelp</div>
      <ul className="navigation">
        <li>Go Pro</li>
      </ul>

      <div className="hamburger" onClick={toggleMenu}>
        <i className="fas fa-bars on" id="on"></i>
      </div>
      <div className={`alert ${isOpen ? "open" : ""}`}>
        <i className="fas fa-times close" onClick={toggleMenu}></i>
        <ul className="navigation1">
          <li>Go Pro</li>
        </ul>
      </div>
    </header>
  );
};

export default NavMem;
