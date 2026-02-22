import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api, User } from "@/services/api";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  signInGuest: () => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (token: string) => {
    try {
      const profile = await api.auth.getMe(token);
      setUser(profile);
      localStorage.setItem("auth_user", JSON.stringify(profile));
    } catch (e) {
      console.error("Failed to fetch profile", e);
      signOut();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const cachedUser = localStorage.getItem("auth_user");

    if (token) {
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
        setLoading(false);
        // Refresh profile in background
        fetchProfile(token);
      } else {
        fetchProfile(token);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { access_token } = await api.auth.login(email, password);
    localStorage.setItem("auth_token", access_token);
    await fetchProfile(access_token);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const { access_token } = await api.auth.register({
      email,
      password,
      full_name: name
    });
    localStorage.setItem("auth_token", access_token);
    await fetchProfile(access_token);
  }, []);

  const signInGuest = useCallback(async () => {
    // Guest mode can still be a mock or a special flag
    const u: User = {
      id: -1,
      email: "guest@example.com",
      full_name: "Guest User",
      is_admin: false,
      is_active: true
    };
    setUser(u);
    localStorage.setItem("auth_user", JSON.stringify(u));
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, register, signInGuest, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
