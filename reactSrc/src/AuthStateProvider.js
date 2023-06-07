import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthStateProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for authentication status in browser storage (e.g., localStorage)
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(storedIsAuthenticated === "true");
  }, []);

  useEffect(() => {
    // Update browser storage when isAuthenticated changes
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const login = () => {
    // Implement the logic to perform the login action
    // Once the login is successful, set isAuthenticated to true
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Implement the logic to perform the logout action
    // Once the logout is successful, set isAuthenticated to false
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
