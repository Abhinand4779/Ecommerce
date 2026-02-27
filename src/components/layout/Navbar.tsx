import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown, ChevronUp, Moon, Sun } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState<Record<string, boolean>>({});

    const location = useLocation();
    const pathname = location.pathname;

    // Desktop dropdown open state and close timer
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const closeTimerRef = React.useRef<number | null>(null);

    // Hide global Navbar on admin routes
    if (pathname && pathname.startsWith('/admin')) return null;

    const openDropdownNow = (name: string) => {
        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        setOpenDropdown(name);
    };

    const closeDropdownDelayed = () => {
        if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = window.setTimeout(() => setOpenDropdown(null), 160);
    };

    // Theme state and persistence
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (stored === 'dark' || (!stored && prefersDark)) {
            document.documentElement.classList.add('dark');
            setTheme('dark');
        } else {
            document.documentElement.classList.remove('dark');
            setTheme('light');
        }
    }, []);

    const toggleTheme = () => {
        if (theme === 'dark') {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setTheme('light');
        } else {
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
        if (!user) navigate('/login');
        else navigate('/profile');
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
        { name: 'Admin', href: '/admin' },
    ];

    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
            {/* Top Bar - Logo and Icons */}
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 -ml-2 text-gray-600 hover:text-amber-600 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Logo (Centered on mobile, Left on desktop) */}
                    <Link to="/" className="flex flex-col items-center md:items-start group transition-transform duration-300 hover:scale-105">
                        <span className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-gray-900 group-hover:text-amber-600">
                            AURELIA
                        </span>
                        <span className="text-[10px] sm:text-xs tracking-[0.3em] font-light text-amber-600 -mt-1 font-sans">
                            FINE JEWELLERY
                        </span>
                    </Link>

                    {/* Search Bar - Hidden on mobile, shown on md+ */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full group">
                            <input
                                type="text"
                                placeholder="Search our collection..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600 transition-all"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-600 transition-colors" size={18} />
                        </div>
                    </div>

                    {/* Right Actions - Icons */}
                    <div className="flex items-center gap-2 sm:gap-6">
                        <button className="md:hidden p-2 text-gray-600 hover:text-amber-600 transition-colors">
                            <Search size={22} />
                        </button>

                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            title="Toggle theme"
                            className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
                        >
                            {/* show moon when light (so clicking switches to dark); show sun when dark */}
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button onClick={onProfileClick} className="p-2 text-gray-600 hover:text-amber-600 transition-colors hidden sm:block" aria-label="My account">
                            <User size={22} />
                        </button>

                        {/* Quick guest sign-in (desktop) */}
                        {!user && (
                            <button onClick={onGuestSignIn} className="hidden sm:inline-block px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 ml-2">
                                Start as Guest
                            </button>
                        )}

                        <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors relative">
                            <Heart size={22} />
                            {favorites.length > 0 && (
                                <span className="absolute top-1 right-1 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{favorites.length}</span>
                            )}
                        </button>

                        <Link to="/cart" className="p-2 text-gray-600 hover:text-amber-600 transition-colors relative">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Navigation Links (Desktop Only) */}
            <nav className="hidden md:block bg-white border-t border-gray-50">
                <div className="container mx-auto px-4">
                    <ul className="flex items-center justify-center gap-10 h-12">
                        {categories.map((cat) => (
                            <li
                                key={cat.name}
                                className="relative"
                                onMouseEnter={() => openDropdownNow(cat.name)}
                                onMouseLeave={closeDropdownDelayed}
                                onFocus={() => openDropdownNow(cat.name)}
                                onBlur={closeDropdownDelayed}
                            >
                                <Link
                                    to={cat.href}
                                    className="text-sm font-medium text-gray-600 hover:text-amber-600 uppercase tracking-widest transition-colors flex items-center gap-2"
                                    aria-haspopup={cat.subcategories ? 'menu' : undefined}
                                >
                                    <span>{cat.name}</span>
                                    {cat.subcategories && <ChevronDown size={14} className="text-gray-400" />}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
                                </Link>

                                {/* Desktop dropdown - controlled by state so it stays open while mouse moves */}
                                {cat.subcategories && (
                                    <div
                                        className={`absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md py-2 w-48 transition-all z-50 ${openDropdown === cat.name ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                                        role="menu"
                                        aria-label={`${cat.name} submenu`}
                                    >
                                        {cat.subcategories.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                to={sub.href}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-white pt-20">
                    <ul className="flex flex-col items-center gap-6 p-4">
                        {categories.map((cat) => (
                            <li key={cat.name} className="w-full text-left">
                                <div className="flex items-center justify-between w-full border-b border-gray-100 py-3">
                                    <Link
                                        to={cat.href}
                                        className="text-xl font-medium text-gray-800 hover:text-amber-600 block"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {cat.name}
                                    </Link>

                                    {cat.subcategories && (
                                        <button
                                            className="p-2 text-gray-600"
                                            onClick={() => setMobileOpen((prev) => ({ ...prev, [cat.name]: !prev[cat.name] }))}
                                            aria-expanded={!!mobileOpen[cat.name]}
                                        >
                                            {mobileOpen[cat.name] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                        </button>
                                    )}
                                </div>

                                {cat.subcategories && mobileOpen[cat.name] && (
                                    <ul className="pl-6 bg-white w-full">
                                        {cat.subcategories.map((sub) => (
                                            <li key={sub.name} className="py-2">
                                                <Link
                                                    to={sub.href}
                                                    className="text-gray-700 block"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}

                        <li className="w-full pt-4">
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    onProfileClick();
                                }}
                                className="flex items-center justify-center gap-2 text-gray-800 hover:text-amber-600 w-full"
                            >
                                <User size={20} />
                                <span>My Account</span>
                            </button>

                            {/* Mobile guest option */}
                            {!user && (
                                <div className="mt-3 px-2">
                                    <button
                                        className="w-full btn-secondary"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            onGuestSignIn();
                                        }}
                                    >
                                        Start as Guest
                                    </button>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
