import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function AdminLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const adminUser = import.meta.env.VITE_ADMIN_USERNAME ?? 'admin';
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD ?? 'password';
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        // Very small delay to emulate checking credentials
        await new Promise((r) => setTimeout(r, 500));
        if (username === adminUser && password === adminPass) {
            // mark admin session (client-side only; for production use server-side session)
            if (typeof window !== 'undefined') {
                localStorage.setItem('isAdmin', 'true');
            }
            navigate('/admin');
        }
        else {
            setError('Invalid username or password');
        }
        setLoading(false);
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white", children: _jsxs("div", { className: "w-full max-w-md bg-[#111111] border border-white/5 rounded-lg p-8", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Admin Sign In" }), _jsx("p", { className: "text-sm text-gray-400 mb-6", children: "Enter admin credentials to access the dashboard." }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs text-gray-400", children: "Username" }), _jsx("input", { value: username, onChange: (e) => setUsername(e.target.value), className: "mt-1 w-full px-3 py-2 rounded bg-black/40 outline-none" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs text-gray-400", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "mt-1 w-full px-3 py-2 rounded bg-black/40 outline-none" })] }), error && _jsx("div", { className: "text-sm text-red-400", children: error }), _jsx("div", { className: "flex items-center justify-between gap-3", children: _jsx("button", { type: "submit", disabled: loading, className: "bg-[#D4AF37] text-black px-4 py-2 rounded font-semibold w-full", children: loading ? 'Signing in...' : 'Sign In' }) }), _jsx("p", { className: "text-xs text-gray-500 mt-4", children: "Note: This is a client-side admin gate for development. For production use a secure server-side login and proper authentication/authorization." })] })] }) }));
}
