import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
export default function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await register(name, email, password);
            navigate("/profile");
        }
        catch (err) {
            setError("Registration failed.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(_Fragment, { children: _jsx("main", { className: "min-h-screen bg-gray-50 flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-md w-full bg-white p-6 rounded shadow", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Register" }), _jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Name" }), _jsx("input", { value: name, onChange: (e) => setName(e.target.value), type: "text", required: true, className: "w-full px-3 py-2 border rounded" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }), _jsx("input", { value: email, onChange: (e) => setEmail(e.target.value), type: "email", required: true, className: "w-full px-3 py-2 border rounded" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }), _jsx("input", { value: password, onChange: (e) => setPassword(e.target.value), type: "password", required: true, className: "w-full px-3 py-2 border rounded" })] }), _jsx("button", { disabled: loading, className: "btn-primary w-full", children: loading ? "Registering..." : "Register" }), error && _jsx("div", { className: "text-red-600 text-sm", children: error })] }), _jsxs("div", { className: "mt-4 text-sm text-gray-600", children: ["Already have an account? ", _jsx(Link, { to: "/login", className: "text-amber-600", children: "Sign In" })] })] }) }) }));
}
