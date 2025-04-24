import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => localStorage.getItem("rted_currentUser") || null);
  const login = (username) => { setUser(username); localStorage.setItem("rted_currentUser", username); };
  const logout = () => { setUser(null); localStorage.removeItem("rted_currentUser"); };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() { return useContext(AuthContext); }



// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     return localStorage.getItem("rted_currentUser") || null;
//   });

//   const login = (username) => {
//     setUser(username);
//     localStorage.setItem("rted_currentUser", username);
//   };
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("rted_currentUser");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
