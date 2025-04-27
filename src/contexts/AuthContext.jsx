import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const startClean = true; // force start with login screen (development only)
  const [user, setUser] = useState(
    startClean ? null : localStorage.getItem("rted_currentUser")
  );   
  const login = (username) => { setUser(username); localStorage.setItem("rted_currentUser", username); };
  const logout = () => {  localStorage.removeItem("rted_currentUser");
  setUser(null);};
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() { return useContext(AuthContext); }


