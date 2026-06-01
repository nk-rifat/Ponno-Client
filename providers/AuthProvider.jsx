import React, { createContext, useEffect, useRef, useState } from "react";

import auth from "../config/firebase";
import api, {
  registerTokenGetter,
  registerTokenSetter,
} from "../lib/axios/interceptor.js";

import { onAuthStateChanged } from "firebase/auth";
import { backendLogin } from "../services/authService";
import { AuthContext } from "../context/index";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const tokenRef = useRef(null);

  // keep ref updated
  useEffect(() => {
    tokenRef.current = accessToken;
  }, [accessToken]);

  // register axios bridge once
  useEffect(() => {
    registerTokenGetter(() => tokenRef.current);
    registerTokenSetter(setAccessToken);
  }, []);

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const firebaseToken = await currentUser.getIdToken();

          const data = await backendLogin(firebaseToken);

          setAccessToken(data.accessToken);
          setUser(currentUser);
        } else {
          setUser(null);
          setAccessToken(null);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    accessToken,
    loading,
    setUser,
    setAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
