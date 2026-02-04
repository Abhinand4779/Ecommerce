import React from 'react';
import Footer from '@/components/layout/Footer';
import ProductCardFlipkart from '@/components/ui/ProductCardFlipkart';
import { ChevronRight } from 'lucide-react';

import { products as allProducts } from '@/data/products';

export default function SubcategoryPage({ params }: { params: { category: string; sub: string } }) {
    const { category, sub } = params;
    const title = `${sub.charAt(0).toUpperCase() + sub.slice(1)} ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    const products = allProducts.filter(p => p.category === category && p.sub === sub);

    return (
        <main className="min-h-screen bg-gray-50">

            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 py-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <span className="hover:text-blue-600 cursor-pointer">Home</span>
                        <ChevronRight size={14} />
                        <span className="hover:text-blue-600 cursor-pointer">{category}</span>
                        <ChevronRight size={14} />
                        <span className="text-gray-900 font-medium">{sub}</span>
                    </div>
                </div>
            </div>

                    <SubcategoryGrid category={category} sub={sub} />

            <Footer />
        </main>
    );
}