"use client";
import { AuthContext } from "@/context";
import axiosInstance from "@/lib/axiosInstance";
import { loadCart, resetCart } from "@/store/cartSlice";
import { loadWishlist, resetWishlist } from "@/store/wishlistSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // restore session on app load

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await axiosInstance.get("/api/user/me");
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  useEffect(() => {
    if (user?.isVerified) {
      dispatch(loadCart());
      dispatch(loadWishlist());
    }
  }, [user, dispatch]);

  // Login
  const login = async ({ email, password }) => {
    const { data } = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });

    setUser(data.user);
    document.cookie = `userRole=${data.user.role}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
    return data.user;
  };

  // logout
  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
    } finally {
      setUser(null);
      document.cookie = "userRole=; path=/; max-age=0";
      dispatch(resetCart());
      dispatch(resetWishlist());
    }
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  const authInfo = {
    user,
    loading,
    login,
    logout,
    updateUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
