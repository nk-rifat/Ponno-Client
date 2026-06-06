import { AuthContext } from "@/context";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // restore session on app load

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await axiosInstance.get("/api/auth/me");
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  // Login
  const login = async ({ email, password }) => {
    const { data } = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });

    setUser(data.user);
    return data.user;
  };

  // logout
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  const authInfo = {
    user,
    loading,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
