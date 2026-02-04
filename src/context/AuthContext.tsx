"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type User = { name: string; email?: string; guest?: boolean };

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  signInGuest: () => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const persist = useCallback((u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem("auth_user", JSON.stringify(u));
    else localStorage.removeItem("auth_user");
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    // Mocked sign-in (replace with API call)
    await new Promise((r) => setTimeout(r, 700));
    const u: User = { name: email.split("@")[0], email };
    persist(u);
  }, [persist]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    // Mocked register (replace with API call)
    await new Promise((r) => setTimeout(r, 800));
    const u: User = { name, email };
    persist(u);
  }, [persist]);

  const signInGuest = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 300));
    const u: User = { name: "Guest", guest: true };
    persist(u);
  }, [persist]);

  const signOut = useCallback(() => {
    persist(null);
  }, [persist]);

  return (
    <AuthContext.Provider value={{ user, signIn, register, signInGuest, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
