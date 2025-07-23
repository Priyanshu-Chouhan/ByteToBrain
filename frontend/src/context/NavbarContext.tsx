"use client";

import React, { createContext, useContext, useState } from 'react';

interface NavbarContextType {
  openServices: boolean;
  setOpenServices: (open: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType>({
  openServices: false,
  setOpenServices: () => {},
});

export function useNavbarContext() {
  return useContext(NavbarContext);
}

const NavbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openServices, setOpenServices] = useState(false);
  return (
    <NavbarContext.Provider value={{ openServices, setOpenServices }}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarProvider; 