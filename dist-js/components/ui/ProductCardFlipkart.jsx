import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
const ProductCardFlipkart = ({ product }) => {
    const { addToCart } = useCart();
    return (<div className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-shadow group block relative">
            <Link to={`/shop/${product.id}`} className="block">
                <div className="aspect-square bg-gray-50 overflow-hidden relative">
                    <img src={product.images?.[0] ?? product.image ?? ''} alt={product.name}/>
                    {product.discount && (<div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-sm">
                            {product.discount}% OFF
                        </div>)}
                </div>

                <div className="p-3">
                    <h3 className="font-medium text-sm text-gray-800 mb-1 line-clamp-2 min-h-[40px]">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    {(() => {
            const rating = product.rating ?? 4.5;
            const reviews = product.reviews ?? 0;
            return (<div className="flex items-center gap-1 mb-2">
                                <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded-sm text-xs font-semibold">
                                    {rating}
                                    <Star size={10} fill="white"/>
                                </div>
                                <span className="text-xs text-gray-500">({reviews.toLocaleString()})</span>
                            </div>);
        })()}

                    {/* Price */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg font-bold text-gray-900">
                            ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (<>
                                <span className="text-sm text-gray-500 line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                </span>
                                <span className="text-sm text-green-600 font-semibold">
                                    {product.discount}% off
                                </span>
                            </>)}
                    </div>

                    {/* Category Tag */}
                    <p className="text-xs text-gray-500 mt-2">{product.category}</p>
                </div>
            </Link>

            {/* Add to Cart button - prevents navigation (stopPropagation) */}
            <button onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (addToCart)
                addToCart({ id: product.id, name: product.name, price: product.price, image: product.images?.[0] ?? product.image ?? '' });
        }} className="absolute bottom-3 right-3 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 text-xs rounded-sm shadow-md">
                Add
            </button>
        </div>);
};
export default ProductCardFlipkart;
