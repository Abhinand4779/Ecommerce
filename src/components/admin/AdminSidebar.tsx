import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
    LayoutDashboard,
    Package,
    Users,
    Settings,
    LogOut,
    ShoppingBag,
    Gem,
    Edit2
} from 'lucide-react';

const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { signOut } = useAuth();
    const pathname = location.pathname;

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
        { name: 'Products', icon: <Package size={20} />, href: '/admin/products' },
        { name: 'Categories', icon: <Gem size={20} />, href: '/admin/categories' },
        { name: 'Orders', icon: <ShoppingBag size={20} />, href: '/admin/orders' },
        { name: 'Customers', icon: <Users size={20} />, href: '/admin/customers' },
        { name: 'Content', icon: <Edit2 size={20} />, href: '/admin/content' },
        { name: 'Settings', icon: <Settings size={20} />, href: '/admin/settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#141414] border-r border-white/5 flex flex-col z-50">
            <div className="p-8">
                <Link to="/" className="text-xl font-bold tracking-widest text-[#D4AF37]">
                    AURELIA <span className="text-white text-xs block font-light">ADMIN PANEL</span>
                </Link>
            </div>

            <nav className="flex-grow px-4 mt-8">
                <ul className="flex flex-col gap-2">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.href}
                                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${pathname === item.href
                                    ? 'bg-[#D4AF37] text-black font-semibold'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-8 border-t border-white/5">
                <button
                    onClick={() => {
                        signOut();
                        navigate('/');
                    }}
                    className="flex items-center gap-4 text-gray-400 hover:text-red-400 transition-colors w-full px-4 py-3"
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
