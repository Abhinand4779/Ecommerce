import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from "@/components/layout/Footer";
import ProductCardFlipkart from "@/components/ui/ProductCardFlipkart";
import { ChevronRight, X, SlidersHorizontal } from 'lucide-react';
import { api, Product } from '@/services/api';

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [priceRange, setPriceRange] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const category = activeCategory === 'All' ? undefined : activeCategory;
                const data = await api.products.list({ category });
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [activeCategory]);

    // Sorting logic
    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // popularity/default
    });

    // Filtering logic (price range)
    const filteredProducts = sortedProducts.filter(p => {
        if (priceRange === 'under20k') return p.price < 20000;
        if (priceRange === '20k-40k') return p.price >= 20000 && p.price <= 40000;
        if (priceRange === 'above40k') return p.price > 40000;
        return true;
    });

    const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];

    return (
        <main className="min-h-screen bg-gray-50">

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 py-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <Link to="/" className="hover:text-blue-600 cursor-pointer">Home</Link>
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
                                        {categories.map((cat) => (
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
                                {loading ? 'Loading...' : (
                                    <>Showing <span className="font-semibold">{filteredProducts.length}</span> results</>
                                )}
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
                                </select>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                            {filteredProducts.map((p) => (
                                <ProductCardFlipkart key={p.id} product={{
                                    ...p,
                                    originalPrice: p.original_price ?? p.price,
                                    image: p.image || (p.images && p.images[0]) || '/images/placeholder.jpg',
                                    reviews: p.review_count
                                } as any} />
                            ))}
                        </div>

                        {!loading && filteredProducts.length === 0 && (
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
                        <div className="p-4">
                            <h4 className="font-semibold text-sm mb-3 uppercase text-gray-700">Category</h4>
                            <div className="space-y-2 mb-6">
                                {categories.map((cat) => (
                                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="category-mobile"
                                            checked={activeCategory === cat}
                                            onChange={() => setActiveCategory(cat)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm text-gray-700">{cat}</span>
                                    </label>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="w-full bg-blue-600 text-white py-3 rounded-sm font-semibold"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}

