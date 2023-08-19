import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggle = () => {
      setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
      <div className="brand">
        <img src="logo.png" alt="Brand Logo" />
      </div>
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Providers</a></li>
        </ul>
        <div className="buttons">
          <button className="btn">Login</button>
          <button className="btn">Find a Therapist</button>
        </div>
      </div>
      <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={handleToggle}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </nav>
  );
};

export default Navbar;
