"use client";
import React from 'react';
import ProductCardFlipkart from './ProductCardFlipkart';
import { products as allProducts } from '@/data/products';
export default function SubcategoryGrid({ category, sub }) {
    const items = allProducts.filter((p) => p.category === category && p.sub === sub);
    return (<div className="container mx-auto px-4 sm:px-6 py-8">
            <h1 className="text-2xl font-bold mb-4">{sub.charAt(0).toUpperCase() + sub.slice(1)}</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.length > 0 ? (items.map((p) => {
            const enhanced = { ...p, rating: p.rating ?? 4.5, reviews: p.reviews ?? 0 };
            return <ProductCardFlipkart key={p.id} product={enhanced}/>;
        })) : (<div className="col-span-full bg-white p-6 rounded border border-gray-200 text-center">No products found for this subcategory yet.</div>)}
            </div>
        </div>);
}
