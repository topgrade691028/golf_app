import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthStateProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Add user state
  const [userRoles, setUserRoles] = useState(null);
  const [token, setToken] = useState(null); // Add token state

  useEffect(() => {
    // Check for authentication status in browser storage (e.g., localStorage)
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(storedIsAuthenticated === "true");

    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    const storedUserRoles = localStorage.getItem("userRoles");
    setUserRoles(storedUserRoles);
  }, []);

  useEffect(() => {
    // Update browser storage when isAuthenticated changes
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("token", token);
    localStorage.setItem("userRoles", userRoles);
  }, [isAuthenticated, token, userRoles]);

  const login = (userData, roles, token) => {
    setIsAuthenticated(true);
    console.log("userData is  " + userData);
    setUser(userData.user);
    console.log("userRoles is  " + userRoles);
    setUserRoles(roles);

    setToken(token); // Update the token state
    console.log("Token set:", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setUserRoles(null);
    localStorage.removeItem("token");
    setToken(null);
  };

  const fetchWithAuth = async (url, options = {}) => {
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    console.log("options are " + JSON.stringify(options));
    const response = await fetch(url, options);
    // Handle the response
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        userRoles,
        setUserRoles,
        user,
        setUser,
        login,
        logout,
        fetchWithAuth, // Make sure fetchWithAuth is included in the value
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
