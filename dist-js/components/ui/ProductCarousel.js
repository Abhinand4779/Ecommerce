import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
const ProductCarousel = ({ title, products }) => {
    const scrollRef = useRef(null);
    const { addToCart } = useCart();
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    const AddButtonOverlay = ({ product }) => (_jsx("button", { onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart({ id: product.id, name: product.name, price: product.price, image: product.images?.[0] ?? product.image ?? '' });
        }, className: "absolute bottom-3 right-3 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 text-xs rounded-sm shadow-md", children: "Add" }));
    return (_jsx("section", { className: "bg-white py-6 border-b border-gray-200", children: _jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-lg sm:text-xl font-bold text-gray-800", children: title }), _jsx(Link, { to: "/shop", className: "text-blue-600 text-sm font-medium hover:underline", children: "View All" })] }), _jsxs("div", { className: "relative group", children: [_jsx("button", { onClick: () => scroll('left'), className: "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block hover:bg-gray-50", style: { marginLeft: '-20px' }, children: _jsx(ChevronLeft, { size: 20, className: "text-gray-700" }) }), _jsx("div", { ref: scrollRef, className: "flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2", children: products.map((product) => (_jsxs("div", { className: "flex-shrink-0 w-44 sm:w-52 bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-all group/card relative", children: [_jsxs(Link, { to: `/shop/${product.id}`, className: "block", children: [_jsxs("div", { className: "aspect-square bg-gray-50 overflow-hidden relative", children: [_jsx("img", { src: product.images?.[0] ?? product.image ?? '', alt: product.name, className: "w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300" }), _jsxs("div", { className: "absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-sm", children: [product.discount, "% OFF"] })] }), _jsxs("div", { className: "p-3", children: [_jsx("h3", { className: "font-medium text-sm text-gray-800 mb-2 line-clamp-2 min-h-[40px]", children: product.name }), _jsx("div", { className: "flex items-center gap-1 mb-2", children: _jsxs("div", { className: "flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded-sm text-xs font-semibold", children: [product.rating, _jsx(Star, { size: 10, fill: "white" })] }) }), _jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsxs("span", { className: "text-base sm:text-lg font-bold text-gray-900", children: ["\u20B9", product.price.toLocaleString()] }), _jsxs("span", { className: "text-xs sm:text-sm text-gray-500 line-through", children: ["\u20B9", product.originalPrice.toLocaleString()] })] })] })] }), _jsx(AddButtonOverlay, { product: product })] }, product.id))) }), _jsx("button", { onClick: () => scroll('right'), className: "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block hover:bg-gray-50", style: { marginRight: '-20px' }, children: _jsx(ChevronRight, { size: 20, className: "text-gray-700" }) })] })] }) }));
};
export default ProductCarousel;
