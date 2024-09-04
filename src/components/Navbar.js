
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavbar } from '../context/NavbarContext';
import './Navbar.css';

function Navbar() {
  const { isNavbarActive, toggleNavbar } = useNavbar();

  const handleLinkClick = () => {
    if (isNavbarActive) {
      toggleNavbar();
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="menu-bars" onClick={toggleNavbar}>
          &#9776;
        </div>
      </div>
      <nav className={`nav-menu ${isNavbarActive ? 'active' : ''}`}>
        <ul className="nav flex-column nav-menu-items">
          <li className="navbar-toggle">
            <div className="menu-bars" onClick={toggleNavbar}>
              &times;
            </div>
          </li>
          <li className="nav-item nav-text">
            <Link className="nav-link text-white" to="/dashboard" onClick={handleLinkClick}>
              Acasa
            </Link>
          </li>
          <li className="nav-item nav-text">
            <Link className="nav-link text-white" to="/grades" onClick={handleLinkClick}>
              Adaugă note
            </Link>
          </li>
          <li className="nav-item nav-text">
            <Link className="nav-link text-white" to="/students-grades" onClick={handleLinkClick}>
              Vizualizează note
            </Link>
          </li>
          <li className="nav-item nav-text">
            <Link className="nav-link text-white" to="/logout" onClick={handleLinkClick}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
