import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Package, Users, Settings, LogOut, ShoppingBag, Gem } from 'lucide-react';
const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { signOut } = useAuth();
    const pathname = location.pathname;
    const menuItems = [
        { name: 'Dashboard', icon: _jsx(LayoutDashboard, { size: 20 }), href: '/admin' },
        { name: 'Products', icon: _jsx(Package, { size: 20 }), href: '/admin/products' },
        { name: 'Categories', icon: _jsx(Gem, { size: 20 }), href: '/admin/categories' },
        { name: 'Orders', icon: _jsx(ShoppingBag, { size: 20 }), href: '/admin/orders' },
        { name: 'Customers', icon: _jsx(Users, { size: 20 }), href: '/admin/customers' },
        { name: 'Settings', icon: _jsx(Settings, { size: 20 }), href: '/admin/settings' },
    ];
    return (_jsxs("aside", { className: "fixed left-0 top-0 h-screen w-64 bg-[#141414] border-r border-white/5 flex flex-col z-50", children: [_jsx("div", { className: "p-8", children: _jsxs(Link, { to: "/", className: "text-xl font-bold tracking-widest text-[#D4AF37]", children: ["AURELIA ", _jsx("span", { className: "text-white text-xs block font-light", children: "ADMIN PANEL" })] }) }), _jsx("nav", { className: "flex-grow px-4 mt-8", children: _jsx("ul", { className: "flex flex-col gap-2", children: menuItems.map((item) => (_jsx("li", { children: _jsxs(Link, { to: item.href, className: `flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${pathname === item.href
                                ? 'bg-[#D4AF37] text-black font-semibold'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'}`, children: [item.icon, _jsx("span", { children: item.name })] }) }, item.name))) }) }), _jsx("div", { className: "p-8 border-t border-white/5", children: _jsxs("button", { onClick: () => {
                        if (typeof window !== 'undefined')
                            localStorage.removeItem('isAdmin');
                        try {
                            signOut();
                        }
                        catch (e) { /* ignore */ }
                        navigate('/admin');
                    }, className: "flex items-center gap-4 text-gray-400 hover:text-red-400 transition-colors w-full px-4 py-3", children: [_jsx(LogOut, { size: 20 }), _jsx("span", { children: "Sign Out" })] }) })] }));
};
export default AdminSidebar;
