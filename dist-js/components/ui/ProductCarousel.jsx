import React, { useRef } from 'react';
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
    const AddButtonOverlay = ({ product }) => (<button onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart({ id: product.id, name: product.name, price: product.price, image: product.images?.[0] ?? product.image ?? '' });
        }} className="absolute bottom-3 right-3 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 text-xs rounded-sm shadow-md">
            Add
        </button>);
    return (<section className="bg-white py-6 border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h2>
                    <Link to="/shop" className="text-blue-600 text-sm font-medium hover:underline">
                        View All
                    </Link>
                </div>

                <div className="relative group">
                    {/* Left Arrow */}
                    <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block hover:bg-gray-50" style={{ marginLeft: '-20px' }}>
                        <ChevronLeft size={20} className="text-gray-700"/>
                    </button>

                    {/* Products Container */}
                    <div ref={scrollRef} className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2">
                        {products.map((product) => (<div key={product.id} className="flex-shrink-0 w-44 sm:w-52 bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-all group/card relative">
                                <Link to={`/shop/${product.id}`} className="block">

                                    <div className="aspect-square bg-gray-50 overflow-hidden relative">
                                        <img src={product.images?.[0] ?? product.image ?? ''} alt={product.name} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"/>
                                        <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-sm">
                                            {product.discount}% OFF
                                        </div>
                                    </div>

                                    <div className="p-3">
                                        <h3 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
                                            {product.name}
                                        </h3>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mb-2">
                                            <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded-sm text-xs font-semibold">
                                                {product.rating}
                                                <Star size={10} fill="white"/>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-base sm:text-lg font-bold text-gray-900">
                                                ₹{product.price.toLocaleString()}
                                            </span>
                                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                                                ₹{product.originalPrice.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </Link>

                                {/* Add to Cart button */}
                                <AddButtonOverlay product={product}/>
                            </div>))}
                    </div>

                    {/* Right Arrow */}
                    <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block hover:bg-gray-50" style={{ marginRight: '-20px' }}>
                        <ChevronRight size={20} className="text-gray-700"/>
                    </button>
                </div>
            </div>
        </section>);
};
export default ProductCarousel;
