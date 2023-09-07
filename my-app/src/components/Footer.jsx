import React from "react";
import "./Footer.css";

const Footer = () => {
  // Sample titles for the 2nd and 3rd columns
  const columnTitles = [
    "Home",
    "About Us",
    "Careers",
    "Providers",
    "Blog",
    "Help Center",
  ];

  const columnTitles2 = [
    "Nondiscrimination Policy",
    "Health Information Policy",
    "Privacy Policy",
    "Practice Policy",
    "Terms of Service",
    "Cookie Preferences",
  ];

  return (
    <div className="parent-wrapper">
      <div className="footer_emptySpace"></div>
      <div className="footer-wrapper">
        {/* 1st column with Logo */}
        <div className="logo-wrapper">
          <h1>Betterhelp</h1>
        </div>

        {/* 2nd column with titles */}
        <ul className="title-list">
          {columnTitles.map((title, index) => (
            <li key={index} className="title-item">
              {title}
            </li>
          ))}
        </ul>

        {/* 3rd column with titles */}
        <ul className="title-list">
          {columnTitles2.map((title, index) => (
            <li key={index} className="title-item">
              {title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
