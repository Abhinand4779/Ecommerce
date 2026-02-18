import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Footer from '@/components/layout/Footer';
import ProductCardFlipkart from '@/components/ui/ProductCardFlipkart';
import { ChevronRight } from 'lucide-react';
import { products as allProducts } from '@/data/products';
export default function SubcategoryPage({ params }) {
    const { slug: category, sub } = params;
    const title = `${sub.charAt(0).toUpperCase() + sub.slice(1)} ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    const products = allProducts.filter(p => p.category === category && p.sub === sub);
    return (_jsxs("main", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "bg-white border-b border-gray-200", children: _jsx("div", { className: "container mx-auto px-4 sm:px-6 py-3", children: _jsxs("div", { className: "flex items-center gap-2 text-xs sm:text-sm text-gray-600", children: [_jsx("span", { className: "hover:text-blue-600 cursor-pointer", children: "Home" }), _jsx(ChevronRight, { size: 14 }), _jsx("span", { className: "hover:text-blue-600 cursor-pointer", children: category }), _jsx(ChevronRight, { size: 14 }), _jsx("span", { className: "text-gray-900 font-medium", children: sub })] }) }) }), _jsxs("div", { className: "container mx-auto px-4 sm:px-6 py-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: title }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: products.length > 0 ? products.map(p => (_jsx(ProductCardFlipkart, { product: p }, p.id))) : (_jsx("div", { className: "col-span-full bg-white p-6 rounded border border-gray-200 text-center", children: "No products found for this category yet." })) })] }), _jsx(Footer, {})] }));
}
