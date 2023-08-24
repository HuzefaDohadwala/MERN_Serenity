import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

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
          {/* <a href="#banner">HOME</a> */}
          <Link to="/">HOME</Link>
        </li>

        <li>
          {/* <a href="#about">ABOUT</a> */}
          <Link to="/about">ABOUT US</Link>
        </li>
        <li>
          {/* <a href="#discover">DISCOVER</a> */}
          <Link to="/discover">DISCOVER</Link>
        </li>
        <li>
          {/* <a href="#login">LOGIN</a> */}
          <Link to="/login">LOGIN</Link>
        </li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        <i className="fas fa-bars on" id="on"></i>
      </div>
      <div className={`alert ${isOpen ? "open" : ""}`}>
        <i className="fas fa-times close" onClick={toggleMenu}></i>
        <ul className="navigation1">
          <li>
            {/* <a href="#banner">HOME</a> */}
            <Link to="/">HOME</Link>
          </li>

          <li>
            {/* <a href="#about">ABOUT</a> */}
            <Link to="/about">ABOUT US</Link>
          </li>
          <li>
            {/* <a href="#discover">DISCOVER</a> */}
            <Link to="/discover">DISCOVER</Link>
          </li>
          <li>
            {/* <a href="#login">LOGIN</a> */}
            <Link to="/login">LOGIN</Link>
          </li>
        </ul>
      </div>
    </header>
  );  
};

export default Navbar;
