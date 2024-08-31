import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: JSON.parse(localStorage.getItem("auth"))?.user || null,
    token: JSON.parse(localStorage.getItem("auth"))?.token || "",
  });
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
