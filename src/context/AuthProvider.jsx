import { useState, useEffect } from "react";
import { checkLs } from "../utils/checkLc";
import { AuthContext } from "./AuthContext.jsx";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // сначала null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = checkLs() || localStorage.getItem("userInfo");
      if (storedUser) {
        setUser(typeof storedUser === "string" ? JSON.parse(storedUser) : storedUser);
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных из localStorage или checkLs():", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserInfo = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("userInfo", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userInfo");
    }
  };

  const login = (loginData) => {
    updateUserInfo(loginData);
    return true;
  };

  const logout = () => {
    updateUserInfo(null);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
