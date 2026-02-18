import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const categories = [
    { name: 'Gold Rings', image: '/images/rings.jpg', href: '/shop?category=rings' },
    { name: 'Diamond Necklaces', image: '/images/necklaces.jpg', href: '/shop?category=necklaces' },
    { name: 'Pearl Earrings', image: '/images/earrings.jpg', href: '/shop?category=earrings' },
    { name: 'Gold Bracelets', image: '/images/bracelets.jpg', href: '/shop?category=bracelets' },
    { name: 'Wedding Collection', image: '/images/necklaces.jpg', href: '/shop?category=wedding' },
    { name: 'Gemstone Rings', image: '/images/rings.jpg', href: '/shop?category=gemstone' },
];
const CategoryBanner = () => {
    const scrollRef = useRef(null);
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    return (_jsx("section", { className: "bg-white py-6 border-b border-gray-200", children: _jsxs("div", { className: "container mx-auto px-4 sm:px-6 relative", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-lg sm:text-xl font-bold text-gray-800", children: "Shop by Category" }), _jsx(Link, { to: "/shop", className: "text-blue-600 text-sm font-medium hover:underline", children: "View All" })] }), _jsxs("div", { className: "relative group", children: [_jsx("button", { onClick: () => scroll('left'), className: "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block", children: _jsx(ChevronLeft, { size: 20 }) }), _jsx("div", { ref: scrollRef, className: "flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth", style: { scrollbarWidth: 'none', msOverflowStyle: 'none' }, children: categories.map((cat) => (_jsxs(Link, { to: cat.href, className: "flex-shrink-0 w-32 sm:w-40 group/item", children: [_jsx("div", { className: "bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square", children: _jsx("img", { src: cat.image, alt: cat.name, className: "w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300" }) }), _jsx("p", { className: "text-xs sm:text-sm font-medium text-center text-gray-700 group-hover/item:text-blue-600", children: cat.name })] }, cat.name))) }), _jsx("button", { onClick: () => scroll('right'), className: "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block", children: _jsx(ChevronRight, { size: 20 }) })] })] }) }));
};
export default CategoryBanner;
