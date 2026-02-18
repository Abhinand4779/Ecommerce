import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';

export default function CheckoutSuccessClient() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId') ?? 'N/A';

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white border border-gray-200 rounded-sm p-8 max-w-md w-full text-center shadow-sm">
                <div className="flex justify-center mb-4">
                    <CheckCircle size={64} className="text-green-500" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
                <p className="text-gray-600 mb-4">
                    Thank you for your purchase. Your order has been confirmed.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 mb-6">
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="text-lg font-semibold text-gray-900">{orderId}</p>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                    You will receive a confirmation email shortly. Your order will be delivered in 5–7 business days.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        to="/shop"
                        className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-sm transition-colors"
                    >
                        <ShoppingBag size={18} />
                        Continue Shopping
                    </Link>
                    <Link
                        to="/"
                        className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-sm transition-colors"
                    >
                        <Home size={18} />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
