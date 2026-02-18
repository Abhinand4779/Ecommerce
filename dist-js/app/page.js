import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import HeroBanner from "@/components/ui/HeroBanner";
import CategoryBanner from "@/components/ui/CategoryBanner";
import DealsSection from "@/components/ui/DealsSection";
import ProductCarousel from "@/components/ui/ProductCarousel";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { TruckIcon, ShieldCheck, RotateCcw, Headphones } from "lucide-react";
const trendingProducts = [
    { id: 1, name: 'Royal Emerald Necklace Set', price: 45000, originalPrice: 75000, discount: 40, rating: 4.5, image: '/images/necklaces.jpg' },
    { id: 2, name: 'Solitaire Diamond Ring', price: 28000, originalPrice: 40000, discount: 30, rating: 4.7, image: '/images/rings.jpg' },
    { id: 3, name: 'Pearl Drop Earrings', price: 12000, originalPrice: 18000, discount: 33, rating: 4.3, image: '/images/earrings.jpg' },
    { id: 4, name: 'Gold Bangle Set', price: 32000, originalPrice: 45000, discount: 29, rating: 4.6, image: '/images/bracelets.jpg' },
    { id: 5, name: 'Diamond Wedding Band', price: 19000, originalPrice: 28000, discount: 32, rating: 4.8, image: '/images/rings.jpg' },
    { id: 6, name: 'Opal Pendant', price: 21000, originalPrice: 30000, discount: 30, rating: 4.4, image: '/images/necklaces.jpg' },
];
const bestSellers = [
    { id: 7, name: 'Diamond Stud Earrings', price: 15000, originalPrice: 22000, discount: 32, rating: 4.6, image: '/images/earrings.jpg' },
    { id: 8, name: 'Ruby Eternity Ring', price: 35000, originalPrice: 50000, discount: 30, rating: 4.7, image: '/images/rings.jpg' },
    { id: 9, name: 'Rose Gold Bracelet', price: 24000, originalPrice: 35000, discount: 31, rating: 4.5, image: '/images/bracelets.jpg' },
    { id: 2, name: 'Solitaire Diamond Ring', price: 28000, originalPrice: 40000, discount: 30, rating: 4.7, image: '/images/rings.jpg' },
    { id: 1, name: 'Royal Emerald Necklace', price: 45000, originalPrice: 75000, discount: 40, rating: 4.5, image: '/images/necklaces.jpg' },
    { id: 3, name: 'Pearl Drop Earrings', price: 12000, originalPrice: 18000, discount: 33, rating: 4.3, image: '/images/earrings.jpg' },
];
export default function Home() {
    return (_jsxs("main", { className: "min-h-screen bg-gray-50", children: [_jsx(HeroBanner, {}), _jsx(CategoryBanner, {}), _jsx(DealsSection, {}), _jsx(ProductCarousel, { title: "Trending Jewellery", products: trendingProducts }), _jsx("section", { className: "bg-gradient-to-r from-purple-600 to-pink-600 py-8 sm:py-12 border-y border-gray-200", children: _jsx("div", { className: "container mx-auto px-4 sm:px-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center", children: [_jsxs("div", { className: "text-white", children: [_jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-bold mb-3", children: "Wedding Season Special" }), _jsx("p", { className: "text-base sm:text-lg mb-4 opacity-90", children: "Get up to 50% OFF on bridal jewellery collections" }), _jsx(Link, { to: "/shop?category=wedding", className: "inline-block bg-white text-purple-600 px-6 py-3 rounded-sm font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base", children: "Explore Collection" })] }), _jsx("div", { className: "hidden md:block", children: _jsx("img", { src: "/images/necklaces.jpg", alt: "Wedding Collection", className: "w-full h-48 object-cover rounded-lg shadow-xl" }) })] }) }) }), _jsx(ProductCarousel, { title: "Best Sellers", products: bestSellers }), _jsx("section", { className: "bg-gradient-to-r from-yellow-400 to-orange-500 py-8 sm:py-12 border-y border-gray-200", children: _jsxs("div", { className: "container mx-auto px-4 sm:px-6 text-center", children: [_jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3", children: "Gold Jewellery Starting at \u20B915,999" }), _jsx("p", { className: "text-base sm:text-lg text-gray-800 mb-6", children: "Exclusive designs with hallmark certification" }), _jsx(Link, { to: "/shop?category=gold", className: "inline-block bg-gray-900 text-white px-6 sm:px-8 py-3 rounded-sm font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base", children: "Shop Gold Collection" })] }) }), _jsx("section", { className: "bg-white py-8 sm:py-12 border-b border-gray-200", children: _jsx("div", { className: "container mx-auto px-4 sm:px-6", children: _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6", children: [
                            { icon: _jsx(TruckIcon, { size: 32 }), title: 'Free Delivery', desc: 'On orders above ₹10,000' },
                            { icon: _jsx(ShieldCheck, { size: 32 }), title: '100% Certified', desc: 'Hallmarked jewellery' },
                            { icon: _jsx(RotateCcw, { size: 32 }), title: 'Easy Returns', desc: '7-day return policy' },
                            { icon: _jsx(Headphones, { size: 32 }), title: '24/7 Support', desc: 'Dedicated customer care' },
                        ].map((item, i) => (_jsxs("div", { className: "text-center p-4 hover:bg-gray-50 rounded-lg transition-colors", children: [_jsx("div", { className: "flex justify-center text-blue-600 mb-3", children: item.icon }), _jsx("h3", { className: "font-semibold text-sm sm:text-base text-gray-800 mb-1", children: item.title }), _jsx("p", { className: "text-xs sm:text-sm text-gray-600", children: item.desc })] }, i))) }) }) }), _jsx("section", { className: "bg-white py-6 border-b border-gray-200", children: _jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [_jsx("h2", { className: "text-lg sm:text-xl font-bold text-gray-800 mb-4", children: "Shop by Occasion" }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4", children: [
                                { name: 'Wedding', image: '/images/necklaces.jpg' },
                                { name: 'Engagement', image: '/images/rings.jpg' },
                                { name: 'Anniversary', image: '/images/bracelets.jpg' },
                                { name: 'Birthday', image: '/images/earrings.jpg' },
                                { name: 'Festival', image: '/images/necklaces.jpg' },
                                { name: 'Gifting', image: '/images/rings.jpg' },
                            ].map((occasion) => (_jsxs(Link, { to: `/shop?occasion=${occasion.name.toLowerCase()}`, className: "group", children: [_jsx("div", { className: "aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2", children: _jsx("img", { src: occasion.image, alt: occasion.name, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" }) }), _jsx("p", { className: "text-xs sm:text-sm font-medium text-center text-gray-700 group-hover:text-blue-600", children: occasion.name })] }, occasion.name))) })] }) }), _jsx("section", { className: "bg-blue-600 py-8 sm:py-12", children: _jsxs("div", { className: "container mx-auto px-4 sm:px-6 text-center", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-white mb-3", children: "Get Exclusive Offers & Updates" }), _jsx("p", { className: "text-white/90 mb-6 text-sm sm:text-base", children: "Subscribe to our newsletter and never miss a deal" }), _jsxs("div", { className: "max-w-md mx-auto flex gap-2", children: [_jsx("input", { type: "email", placeholder: "Enter your email", className: "flex-1 px-4 py-3 rounded-sm text-sm focus:outline-none" }), _jsx("button", { className: "bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-sm font-semibold transition-colors text-sm sm:text-base", children: "Subscribe" })] })] }) }), _jsx(Footer, {})] }));
}
