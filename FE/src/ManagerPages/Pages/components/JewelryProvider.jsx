// src/ManagerPages/Pages/components/JewelryContext.jsx
import React, { createContext, useState, useContext } from "react";

const JewelryContext = createContext();

export const useJewelry = () => useContext(JewelryContext);

export const JewelryProvider = ({ children }) => {
  const [jewelry, setJewelry] = useState([]);
  const [original, setOriginal] = useState([]);
  const [selected, setSelected] = useState("All");
  return (
    <JewelryContext.Provider
      value={{
        jewelry,
        setJewelry,
        original,
        setOriginal,
        selected,
        setSelected,
      }}
    >
      {children}
    </JewelryContext.Provider>
  );
};
