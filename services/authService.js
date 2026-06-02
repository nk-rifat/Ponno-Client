import { auth } from "@/config/firebase";
import api from "@/lib/axios/interceptor";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

// REGISTER

export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  // Instantly send the verification email right after account creation
  await sendEmailVerification(userCredential.user);

  // Force a logout immediately so an unverified session doesn't linger in the client
  await auth.signOut();

  return userCredential.user;
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
