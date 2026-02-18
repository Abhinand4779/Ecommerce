import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown, ChevronUp, Moon, Sun } from 'lucide-react';
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState({});
    const location = useLocation();
    const pathname = location.pathname;
    // Desktop dropdown open state and close timer
    const [openDropdown, setOpenDropdown] = useState(null);
    const closeTimerRef = React.useRef(null);
    // Hide global Navbar on admin routes
    if (pathname && pathname.startsWith('/admin'))
        return null;
    const openDropdownNow = (name) => {
        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        setOpenDropdown(name);
    };
    const closeDropdownDelayed = () => {
        if (closeTimerRef.current)
            window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = window.setTimeout(() => setOpenDropdown(null), 160);
    };
    // Theme state and persistence
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (stored === 'dark' || (!stored && prefersDark)) {
            document.documentElement.classList.add('dark');
            setTheme('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
            setTheme('light');
        }
    }, []);
    const toggleTheme = () => {
        if (theme === 'dark') {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setTheme('light');
        }
        else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
        }
    };
    // Auth and navigation
    const navigate = useNavigate();
    const { user, signInGuest } = useAuth();
    // Cart and favorites counts
    const { items, favorites } = useCart();
    const cartCount = items.reduce((acc, it) => acc + (it.quantity || 0), 0);
    const onProfileClick = () => {
        if (!user)
            navigate('/login');
        else
            navigate('/profile');
    };
    const onGuestSignIn = async () => {
        await signInGuest();
        navigate('/profile');
    };
    const categories = [
        { name: 'Home', href: '/' },
        {
            name: 'Ring',
            href: '/shop?category=rings',
            subcategories: [
                { name: 'Solitaire', href: '/shop?category=rings&type=solitaire' },
                { name: 'Halo', href: '/shop?category=rings&type=halo' },
                { name: 'Stackable', href: '/shop?category=rings&type=stackable' },
            ],
        },
        {
            name: 'Necklace',
            href: '/shop?category=necklaces',
            subcategories: [
                { name: 'Pendant', href: '/shop?category=necklaces&type=pendant' },
                { name: 'Choker', href: '/shop?category=necklaces&type=choker' },
            ],
        },
        {
            name: 'Anklets',
            href: '/shop?category=anklets',
            subcategories: [
                { name: 'Gold Anklets', href: '/shop?category=anklets&type=gold' },
                { name: 'Silver Anklets', href: '/shop?category=anklets&type=silver' },
            ],
        },
        {
            name: 'Bangles',
            href: '/shop?category=bangles',
            subcategories: [
                { name: 'Kada', href: '/shop?category=bangles&type=kada' },
                { name: 'Slim Bangles', href: '/shop?category=bangles&type=slim' },
            ],
        },
        {
            name: 'Earrings',
            href: '/shop?category=earrings',
            subcategories: [
                { name: 'Studs', href: '/shop?category=earrings&type=studs' },
                { name: 'Drops', href: '/shop?category=earrings&type=drops' },
            ],
        },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];
    return (_jsxs("header", { className: "bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100", children: [_jsx("div", { className: "container mx-auto px-4 sm:px-6", children: _jsxs("div", { className: "flex items-center justify-between h-16 sm:h-20", children: [_jsx("button", { className: "md:hidden p-2 -ml-2 text-gray-600 hover:text-amber-600 transition-colors", onClick: () => setIsMenuOpen(!isMenuOpen), children: isMenuOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) }), _jsxs(Link, { to: "/", className: "flex flex-col items-center md:items-start group transition-transform duration-300 hover:scale-105", children: [_jsx("span", { className: "text-2xl sm:text-3xl font-serif font-bold tracking-widest text-gray-900 group-hover:text-amber-600", children: "AURELIA" }), _jsx("span", { className: "text-[10px] sm:text-xs tracking-[0.3em] font-light text-amber-600 -mt-1 font-sans", children: "FINE JEWELLERY" })] }), _jsx("div", { className: "hidden md:flex flex-1 max-w-md mx-8", children: _jsxs("div", { className: "relative w-full group", children: [_jsx("input", { type: "text", placeholder: "Search our collection...", className: "w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600 transition-all" }), _jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-600 transition-colors", size: 18 })] }) }), _jsxs("div", { className: "flex items-center gap-2 sm:gap-6", children: [_jsx("button", { className: "md:hidden p-2 text-gray-600 hover:text-amber-600 transition-colors", children: _jsx(Search, { size: 22 }) }), _jsx("button", { onClick: toggleTheme, "aria-label": "Toggle theme", title: "Toggle theme", className: "p-2 text-gray-600 hover:text-amber-600 transition-colors", children: theme === 'dark' ? _jsx(Sun, { size: 20 }) : _jsx(Moon, { size: 20 }) }), _jsx("button", { onClick: onProfileClick, className: "p-2 text-gray-600 hover:text-amber-600 transition-colors hidden sm:block", "aria-label": "My account", children: _jsx(User, { size: 22 }) }), !user && (_jsx("button", { onClick: onGuestSignIn, className: "hidden sm:inline-block px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 ml-2", children: "Start as Guest" })), _jsxs("button", { className: "p-2 text-gray-600 hover:text-amber-600 transition-colors relative", children: [_jsx(Heart, { size: 22 }), favorites.length > 0 && (_jsx("span", { className: "absolute top-1 right-1 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center", children: favorites.length }))] }), _jsxs(Link, { to: "/cart", className: "p-2 text-gray-600 hover:text-amber-600 transition-colors relative", children: [_jsx(ShoppingCart, { size: 22 }), cartCount > 0 && (_jsx("span", { className: "absolute top-1 right-1 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center", children: cartCount }))] })] })] }) }), _jsx("nav", { className: "hidden md:block bg-white border-t border-gray-50", children: _jsx("div", { className: "container mx-auto px-4", children: _jsx("ul", { className: "flex items-center justify-center gap-10 h-12", children: categories.map((cat) => (_jsxs("li", { className: "relative", onMouseEnter: () => openDropdownNow(cat.name), onMouseLeave: closeDropdownDelayed, onFocus: () => openDropdownNow(cat.name), onBlur: closeDropdownDelayed, children: [_jsxs(Link, { to: cat.href, className: "text-sm font-medium text-gray-600 hover:text-amber-600 uppercase tracking-widest transition-colors flex items-center gap-2", "aria-haspopup": cat.subcategories ? 'menu' : undefined, children: [_jsx("span", { children: cat.name }), cat.subcategories && _jsx(ChevronDown, { size: 14, className: "text-gray-400" }), _jsx("span", { className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full" })] }), cat.subcategories && (_jsx("div", { className: `absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md py-2 w-48 transition-all z-50 ${openDropdown === cat.name ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`, role: "menu", "aria-label": `${cat.name} submenu`, children: cat.subcategories.map((sub) => (_jsx(Link, { to: sub.href, className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50", children: sub.name }, sub.name))) }))] }, cat.name))) }) }) }), isMenuOpen && (_jsx("div", { className: "md:hidden fixed inset-0 z-40 bg-white pt-20", children: _jsxs("ul", { className: "flex flex-col items-center gap-6 p-4", children: [categories.map((cat) => (_jsxs("li", { className: "w-full text-left", children: [_jsxs("div", { className: "flex items-center justify-between w-full border-b border-gray-100 py-3", children: [_jsx(Link, { to: cat.href, className: "text-xl font-medium text-gray-800 hover:text-amber-600 block", onClick: () => setIsMenuOpen(false), children: cat.name }), cat.subcategories && (_jsx("button", { className: "p-2 text-gray-600", onClick: () => setMobileOpen((prev) => ({ ...prev, [cat.name]: !prev[cat.name] })), "aria-expanded": !!mobileOpen[cat.name], children: mobileOpen[cat.name] ? _jsx(ChevronUp, { size: 18 }) : _jsx(ChevronDown, { size: 18 }) }))] }), cat.subcategories && mobileOpen[cat.name] && (_jsx("ul", { className: "pl-6 bg-white w-full", children: cat.subcategories.map((sub) => (_jsx("li", { className: "py-2", children: _jsx(Link, { to: sub.href, className: "text-gray-700 block", onClick: () => setIsMenuOpen(false), children: sub.name }) }, sub.name))) }))] }, cat.name))), _jsxs("li", { className: "w-full pt-4", children: [_jsxs("button", { onClick: () => {
                                        setIsMenuOpen(false);
                                        onProfileClick();
                                    }, className: "flex items-center justify-center gap-2 text-gray-800 hover:text-amber-600 w-full", children: [_jsx(User, { size: 20 }), _jsx("span", { children: "My Account" })] }), !user && (_jsx("div", { className: "mt-3 px-2", children: _jsx("button", { className: "w-full btn-secondary", onClick: () => {
                                            setIsMenuOpen(false);
                                            onGuestSignIn();
                                        }, children: "Start as Guest" }) }))] })] }) }))] }));
};
export default Navbar;
