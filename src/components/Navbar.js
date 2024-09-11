
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavbar } from '../context/NavbarContext';
import { FaHome } from "react-icons/fa";
import { GiTeamDowngrade } from "react-icons/gi";
import { MdOutlineAddchart } from "react-icons/md";
import { BiSolidLogOut } from "react-icons/bi";
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
              <FaHome /> Acasa
            </Link>
          </li>
          <li className="nav-item nav-text">
            <Link className="nav-link text-white" to="/grades" onClick={handleLinkClick}>
              <MdOutlineAddchart /> Adaugă note
            </Link>
          </li>
          <li className="nav-item nav-text">
            <Link className="nav-link text-white" to="/students-grades" onClick={handleLinkClick}>
              <GiTeamDowngrade /> Vizualizează note
            </Link>
          </li>
          <li className="nav-item nav-text">
            <Link className="nav-link text-white" to="/logout" onClick={handleLinkClick}>
              <BiSolidLogOut />  Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
