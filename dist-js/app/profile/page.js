import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
export default function ProfilePage() {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
    if (!user) {
        return null;
    }
    return (_jsx("main", { className: "min-h-screen bg-gray-50 py-8", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-2xl bg-white p-6 rounded shadow", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "My Account" }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Name" }), _jsx("div", { className: "font-medium text-gray-800", children: user.name }), user.email && _jsx("div", { className: "text-sm text-gray-600", children: user.email }), user.guest && _jsx("div", { className: "text-sm text-amber-600", children: "Signed in as Guest" })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { className: "btn-primary", onClick: () => navigate("/"), children: "Continue Shopping" }), _jsx("button", { className: "btn-secondary", onClick: () => {
                                    signOut();
                                    navigate("/");
                                }, children: "Sign Out" })] })] }) }) }));
}
