import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        try {
            const raw = localStorage.getItem("auth_user");
            if (raw)
                setUser(JSON.parse(raw));
        }
        catch (e) {
            // ignore
        }
    }, []);
    const persist = useCallback((u) => {
        setUser(u);
        if (u)
            localStorage.setItem("auth_user", JSON.stringify(u));
        else
            localStorage.removeItem("auth_user");
    }, []);
    const signIn = useCallback(async (email, password) => {
        // Mocked sign-in (replace with API call)
        await new Promise((r) => setTimeout(r, 700));
        const u = { name: email.split("@")[0], email };
        persist(u);
    }, [persist]);
    const register = useCallback(async (name, email, password) => {
        // Mocked register (replace with API call)
        await new Promise((r) => setTimeout(r, 800));
        const u = { name, email };
        persist(u);
    }, [persist]);
    const signInGuest = useCallback(async () => {
        await new Promise((r) => setTimeout(r, 300));
        const u = { name: "Guest", guest: true };
        persist(u);
    }, [persist]);
    const signOut = useCallback(() => {
        persist(null);
    }, [persist]);
    return (<AuthContext.Provider value={{ user, signIn, register, signInGuest, signOut }}>
      {children}
    </AuthContext.Provider>);
};
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
