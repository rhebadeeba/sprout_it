import React from "react";
import "./Navbar.css"; // we'll add some styles here
import PlantLogo from "../assets/sprout-logo.png"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="name">Sprout It!</div>
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/schedule">Schedule</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
