"use client";

import { GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/client";

type TAuthContext = {
  currentUser: User | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<TAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user ?? null);
    });

    return () => unsubscribe();
  }, []);

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function logout() {
    await auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Trying to useAuth outside of AuthContext");
  return context;
}
