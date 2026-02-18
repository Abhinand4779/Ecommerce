"use client";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
export default function AuthWrapper({ children }) {
    return <AuthProvider>{children}</AuthProvider>;
}
