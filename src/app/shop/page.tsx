"use client";

import React, { useState } from 'react';
import Footer from "@/components/layout/Footer";
import ProductCardFlipkart from "@/components/ui/ProductCardFlipkart";
import { ChevronRight, X, SlidersHorizontal } from 'lucide-react';

import { products as allProducts } from '@/data/products';

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [priceRange, setPriceRange] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');

    const filteredProducts = activeCategory === 'All'
        ? allProducts
        : allProducts.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

    return (
        <main className="min-h-screen bg-gray-50">

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 py-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <span className="hover:text-blue-600 cursor-pointer">Home</span>
                        <ChevronRight size={14} />
                        <span className="text-gray-900 font-medium">Jewellery</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
                <div className="flex gap-4">
                    {/* Filters Sidebar - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white border border-gray-200 rounded-sm sticky top-20">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="font-bold text-lg">Filters</h3>
                            </div>

                            {/* Category Filter */}
                            <div className="border-b border-gray-200">
                                <div className="p-4">
                                    <h4 className="font-semibold text-sm mb-3 uppercase text-gray-700">Category</h4>
                                    <div className="space-y-2">
                                        {['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((cat) => (
                                            <label key={cat} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    checked={activeCategory === cat}
                                                    onChange={() => setActiveCategory(cat)}
                                                    className="w-4 h-4 text-blue-600"
                                                />
                                                <span className="text-sm text-gray-700">{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="border-b border-gray-200">
                                <div className="p-4">
                                    <h4 className="font-semibold text-sm mb-3 uppercase text-gray-700">Price</h4>
                                    <div className="space-y-2">
                                        {[
                                            { label: 'All Prices', value: 'all' },
                                            { label: 'Under ₹20,000', value: 'under20k' },
                                            { label: '₹20,000 - ₹40,000', value: '20k-40k' },
                                            { label: 'Above ₹40,000', value: 'above40k' },
                                        ].map((range) => (
                                            <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="price"
                                                    checked={priceRange === range.value}
                                                    onChange={() => setPriceRange(range.value)}
                                                    className="w-4 h-4 text-blue-600"
                                                />
                                                <span className="text-sm text-gray-700">{range.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Discount Filter */}
                            <div className="border-b border-gray-200">
                                <div className="p-4">
                                    <h4 className="font-semibold text-sm mb-3 uppercase text-gray-700">Discount</h4>
                                    <div className="space-y-2">
                                        {['30% or more', '20% or more', '10% or more'].map((discount) => (
                                            <label key={discount} className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm text-gray-700">{discount}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <div className="p-4">
                                    <h4 className="font-semibold text-sm mb-3 uppercase text-gray-700">Customer Ratings</h4>
                                    <div className="space-y-2">
                                        {['4★ & above', '3★ & above'].map((rating) => (
                                            <label key={rating} className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm text-gray-700">{rating}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Section */}
                    <div className="flex-1">
                        {/* Mobile Filter Button */}
                        <div className="lg:hidden mb-4">
                            <button
                                onClick={() => setShowMobileFilters(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-sm text-sm font-medium"
                            >
                                <SlidersHorizontal size={16} />
                                Filters
                            </button>
                        </div>

                        {/* Sort Bar */}
                        <div className="bg-white border border-gray-200 rounded-sm p-3 sm:p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-semibold">{filteredProducts.length}</span> results
                            </p>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="text-sm text-gray-700">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 flex-1 sm:flex-none"
                                >
                                    <option value="popularity">Popularity</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Customer Rating</option>
                                    <option value="newest">Newest First</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                            {filteredProducts.map((product) => (
                                <ProductCardFlipkart key={product.id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="bg-white border border-gray-200 rounded-sm p-12 text-center">
                                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filters Modal */}
            {showMobileFilters && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                            <h3 className="font-bold text-lg">Filters</h3>
                            <button onClick={() => setShowMobileFilters(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        {/* Same filter content as desktop sidebar */}
                        <div className="p-4">
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="w-full bg-blue-600 text-white py-3 rounded-sm font-semibold"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
