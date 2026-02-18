import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogin from '@/components/admin/AdminLogin';
export default function AdminLayout() {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        // read admin session from localStorage on client
        setIsAdmin(!!localStorage.getItem('isAdmin'));
        // listen to storage changes from other tabs
        const onStorage = (e) => {
            if (e.key === 'isAdmin')
                setIsAdmin(!!e.newValue);
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);
    if (!isAdmin) {
        return _jsx(AdminLogin, {});
    }
    return (_jsxs("div", { className: "min-h-screen bg-[#0A0A0A] text-white", children: [_jsx(AdminSidebar, {}), _jsxs("main", { className: "pl-64 min-h-screen", children: [_jsxs("header", { className: "h-16 border-b border-white/5 flex items-center justify-between px-10 sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-md z-40", children: [_jsx("h2", { className: "text-gray-400 font-medium", children: "Overview" }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsxs("div", { className: "text-right hidden sm:block", children: [_jsx("p", { className: "text-xs text-gray-400", children: "Welcome back," }), _jsx("p", { className: "text-sm font-semibold text-[#D4AF37]", children: "Admin Master" })] }), _jsx("div", { className: "w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold", children: "AM" })] })] }), _jsx("div", { className: "p-10", children: _jsx("div", { className: "p-10", children: _jsx(Outlet, {}) }) })] })] }));
}
