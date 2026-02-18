"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { AuthProvider } from "@/context/AuthContext";
export default function AuthWrapper({ children }) {
    return _jsx(AuthProvider, { children: children });
}
