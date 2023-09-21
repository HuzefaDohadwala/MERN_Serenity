import React, { useState } from "react";

const NavList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header>
        <div className="logo">Betterhelp</div>
        <ul className="navigation">
          <li>My Profile</li>
        </ul>

        <div className="hamburger" onClick={toggleMenu}>
          <i className="fas fa-bars on" id="on"></i>
        </div>
        <div className={`alert ${isOpen ? "open" : ""}`}>
          <i className="fas fa-times close" onClick={toggleMenu}></i>
          <ul className="navigation1">
            <li>My Profile</li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default NavList;
