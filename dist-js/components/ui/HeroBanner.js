import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const banners = [
    {
        id: 1,
        title: 'Wedding Season Sale',
        subtitle: 'Up to 50% OFF on Bridal Jewellery',
        bgColor: 'from-pink-500 to-rose-600',
        image: '/images/necklaces.jpg'
    },
    {
        id: 2,
        title: 'Gold Collection',
        subtitle: 'Exclusive Designs Starting at ₹15,999',
        bgColor: 'from-yellow-500 to-orange-600',
        image: '/images/rings.jpg'
    },
    {
        id: 3,
        title: 'Diamond Jewellery',
        subtitle: 'Flat 40% OFF on All Diamond Items',
        bgColor: 'from-blue-500 to-purple-600',
        image: '/images/earrings.jpg'
    },
];
const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };
    return (_jsxs("div", { className: "relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-100", children: [_jsx("div", { className: "flex transition-transform duration-500 ease-out h-full", style: { transform: `translateX(-${currentSlide * 100}%)` }, children: banners.map((banner) => (_jsx("div", { className: `min-w-full h-full bg-gradient-to-r ${banner.bgColor} flex items-center justify-center relative`, children: _jsxs("div", { className: "container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center", children: [_jsxs("div", { className: "text-white z-10", children: [_jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in", children: banner.title }), _jsx("p", { className: "text-lg sm:text-xl md:text-2xl mb-6 animate-fade-in-delay", children: banner.subtitle }), _jsx(Link, { to: "/shop", className: "bg-white text-gray-900 px-6 sm:px-8 py-3 rounded-sm font-semibold hover:bg-gray-100 transition-colors animate-fade-in-delay-2 inline-block", children: "Shop Now" })] }), _jsx("div", { className: "hidden md:block", children: _jsx("img", { src: banner.image, alt: banner.title, className: "w-full h-64 object-cover rounded-lg shadow-2xl animate-slide-in-delayed" }) })] }) }, banner.id))) }), _jsx("button", { onClick: prevSlide, className: "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10", children: _jsx(ChevronLeft, { size: 24, className: "text-gray-800" }) }), _jsx("button", { onClick: nextSlide, className: "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10", children: _jsx(ChevronRight, { size: 24, className: "text-gray-800" }) }), _jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10", children: banners.map((_, index) => (_jsx("button", { onClick: () => setCurrentSlide(index), className: `w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}` }, index))) })] }));
};
export default HeroBanner;
