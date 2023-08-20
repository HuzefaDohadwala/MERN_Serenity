import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="logo">Betterhelp</div>
      <ul className="navigation">
        <li>
          <a href="#banner">HOME</a>
        </li>

        <li>
          <a href="#about">ABOUT</a>
        </li>
        <li>
          <a href="#providers">PROVIDERS</a>
        </li>
        <li>
          <a href="#login">LOGIN</a>
        </li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        <i className="fas fa-bars on" id="on"></i>
      </div>
      <div className={`alert ${isOpen ? "open" : ""}`}>
        <i className="fas fa-times close" onClick={toggleMenu}></i>
        <ul className="navigation1">
          <li>
            <a href="#banner" onClick={toggleMenu}>
              HOME
            </a>
          </li>

          <li>
            <a href="#about" onClick={toggleMenu}>
              ABOUT
            </a>
          </li>
          <li>
            <a href="#providers" onClick={toggleMenu}>
              PROVIDERS
            </a>
          </li>
          <li>
            <a href="#login" onClick={toggleMenu}>
              LOGIN
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
