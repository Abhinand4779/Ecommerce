"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProductCardFlipkart from './ProductCardFlipkart';
import { products as allProducts } from '@/data/products';
export default function SubcategoryGrid({ category, sub }) {
    const items = allProducts.filter((p) => p.category === category && p.sub === sub);
    return (_jsxs("div", { className: "container mx-auto px-4 sm:px-6 py-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: sub.charAt(0).toUpperCase() + sub.slice(1) }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: items.length > 0 ? (items.map((p) => {
                    const enhanced = { ...p, rating: p.rating ?? 4.5, reviews: p.reviews ?? 0 };
                    return _jsx(ProductCardFlipkart, { product: enhanced }, p.id);
                })) : (_jsx("div", { className: "col-span-full bg-white p-6 rounded border border-gray-200 text-center", children: "No products found for this subcategory yet." })) })] }));
}
