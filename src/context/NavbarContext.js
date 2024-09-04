import React, { createContext, useState, useContext } from 'react';
import Navbar from '../components/Navbar';

const NavbarContext = createContext();

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }) => {
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarActive(!isNavbarActive);
  };

  return (
    <NavbarContext.Provider value={{ isNavbarActive, toggleNavbar }}>
      <Navbar />
      {children}
    </NavbarContext.Provider>
  );
};
