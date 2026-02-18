import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
const ProductCardFlipkart = ({ product }) => {
    const { addToCart } = useCart();
    return (_jsxs("div", { className: "bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-shadow group block relative", children: [_jsxs(Link, { to: `/shop/${product.id}`, className: "block", children: [_jsxs("div", { className: "aspect-square bg-gray-50 overflow-hidden relative", children: [_jsx("img", { src: product.images?.[0] ?? product.image ?? '', alt: product.name }), product.discount && (_jsxs("div", { className: "absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-sm", children: [product.discount, "% OFF"] }))] }), _jsxs("div", { className: "p-3", children: [_jsx("h3", { className: "font-medium text-sm text-gray-800 mb-1 line-clamp-2 min-h-[40px]", children: product.name }), (() => {
                                const rating = product.rating ?? 4.5;
                                const reviews = product.reviews ?? 0;
                                return (_jsxs("div", { className: "flex items-center gap-1 mb-2", children: [_jsxs("div", { className: "flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded-sm text-xs font-semibold", children: [rating, _jsx(Star, { size: 10, fill: "white" })] }), _jsxs("span", { className: "text-xs text-gray-500", children: ["(", reviews.toLocaleString(), ")"] })] }));
                            })(), _jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsxs("span", { className: "text-lg font-bold text-gray-900", children: ["\u20B9", product.price.toLocaleString()] }), product.originalPrice && (_jsxs(_Fragment, { children: [_jsxs("span", { className: "text-sm text-gray-500 line-through", children: ["\u20B9", product.originalPrice.toLocaleString()] }), _jsxs("span", { className: "text-sm text-green-600 font-semibold", children: [product.discount, "% off"] })] }))] }), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: product.category })] })] }), _jsx("button", { onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (addToCart)
                        addToCart({ id: product.id, name: product.name, price: product.price, image: product.images?.[0] ?? product.image ?? '' });
                }, className: "absolute bottom-3 right-3 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 text-xs rounded-sm shadow-md", children: "Add" })] }));
};
export default ProductCardFlipkart;
