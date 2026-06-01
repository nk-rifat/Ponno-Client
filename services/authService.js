import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";

import api from "../lib/axios/interceptor";

const provider = new GoogleAuthProvider();


// REGISTER

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};


// LOGIN

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};


// GOOGLE LOGIN

export const googleLogin = () => {
  return signInWithPopup(auth, provider);
};


// UPDATE PROFILE

export const updateUserProfile = (data) => {
  return updateProfile(auth.currentUser, data);
};


// BACKEND LOGIN (JWT)

export const backendLogin = async (firebaseToken) => {
  const res = await api.post("/auth/login", {
    firebaseToken,
  });

  return res.data;
};


// LOGOUT

export const backendLogout = () => {
  return api.post("/auth/logout");
};