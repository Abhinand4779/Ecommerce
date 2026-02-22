import React from 'react';
import Footer from "@/components/layout/Footer";
import { Minus, Plus, Trash2, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { items: cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = 0; // not tracked in CartContext item model
    const deliveryCharges = subtotal > 50000 ? 0 : (subtotal > 0 ? 500 : 0);
    const total = subtotal + deliveryCharges;

    const navigate = useNavigate();
    const { user } = useAuth();

    const handlePlaceOrder = () => {
        if (!user) {
            // redirect to profile so user can sign in or register
            navigate('/profile');
            return;
        }
        navigate('/checkout');
    };

    return (
        <main className="min-h-screen bg-gray-50">

            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white border border-gray-200 rounded-sm">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="font-semibold text-lg">My Cart ({cartItems.length})</h2>
                                </div>

                                {cartItems.map((item) => (
                                    <div key={item.id} className="p-4 border-b border-gray-200 last:border-0">
                                        <div className="flex gap-4">
                                            {/* Image */}
                                            <Link to={`/shop/${item.id}`} className="flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-sm border border-gray-200"
                                                />
                                            </Link>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <Link to={`/shop/${item.id}`} className="hover:text-blue-600">
                                                    <h3 className="font-medium text-sm sm:text-base text-gray-800 mb-2 line-clamp-2">
                                                        {item.name}
                                                    </h3>
                                                </Link>

                                                {/* Price */}
                                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                                    <span className="text-lg font-semibold text-gray-900">
                                                        ₹{item.price.toLocaleString()}
                                                    </span>
                                                    {('originalPrice' in (item as any) && (item as any).originalPrice) ? (
                                                        <span className="text-sm text-gray-500 line-through">
                                                            ₹{(item as any).originalPrice.toLocaleString()}
                                                        </span>
                                                    ) : null}
                                                </div>

                                                {/* Delivery Info */}
                                                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                                                    Delivery by <span className="font-semibold">{(item as any).delivery ?? '5-7 days'}</span>
                                                </p>

                                                {/* Quantity & Remove */}
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center border border-gray-300 rounded-sm">
                                                        <button className="px-3 py-1 hover:bg-gray-50" onClick={() => decreaseQuantity(item.id)}>
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="px-4 py-1 border-x border-gray-300 text-sm font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <button className="px-3 py-1 hover:bg-gray-50" onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}>
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>

                                                    <button className="text-sm font-semibold text-gray-700 hover:text-red-600 flex items-center gap-1" onClick={() => removeFromCart(item.id)}>
                                                        <Trash2 size={14} />
                                                        REMOVE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Place Order Button - Mobile */}
                            <div className="lg:hidden bg-white border border-gray-200 rounded-sm p-4">
                                <button
                                    onClick={handlePlaceOrder}
                                    className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-sm text-center transition-colors"
                                >
                                    PLACE ORDER
                                </button>
                            </div>
                        </div>

                        {/* Price Details - Sticky on Desktop */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-gray-200 rounded-sm sticky top-20">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-700 uppercase text-sm">Price Details</h3>
                                </div>

                                <div className="p-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-700">Price ({cartItems.length} items)</span>
                                        <span className="text-gray-900">₹{(subtotal + discount).toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-700">Discount</span>
                                        <span className="text-green-600 font-semibold">- ₹{discount.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-700">Delivery Charges</span>
                                        <span className={deliveryCharges === 0 ? 'text-green-600 font-semibold' : 'text-gray-900'}>
                                            {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                                        </span>
                                    </div>

                                    {deliveryCharges > 0 && (
                                        <p className="text-xs text-gray-600 bg-blue-50 p-2 rounded-sm">
                                            Add items worth ₹{(50000 - subtotal).toLocaleString()} more for FREE delivery
                                        </p>
                                    )}

                                    <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-base">
                                        <span className="text-gray-900">Total Amount</span>
                                        <span className="text-gray-900">₹{total.toLocaleString()}</span>
                                    </div>

                                    <p className="text-sm text-green-600 font-semibold">
                                        You will save ₹{discount.toLocaleString()} on this order
                                    </p>
                                </div>

                                {/* Place Order - Desktop */}
                                <div className="hidden lg:block p-4 border-t border-gray-200">
                                    <button
                                        onClick={handlePlaceOrder}
                                        className="block w/full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-sm text-center transition-colors"
                                    >
                                        PLACE ORDER
                                    </button>
                                </div>
                            </div>

                            {/* Offers */}
                            <div className="bg-white border border-gray-200 rounded-sm mt-4 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Tag size={16} className="text-gray-600" />
                                    <h3 className="font-semibold text-sm text-gray-700">Coupons</h3>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <button className="px-4 py-2 text-blue-600 font-semibold text-sm hover:bg-blue-50 rounded-sm">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-sm p-12 text-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your cart is empty!</h2>
                        <p className="text-gray-600 mb-6">Add items to it now.</p>
                        <Link
                            to="/shop"
                            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Shop Now
                        </Link>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
