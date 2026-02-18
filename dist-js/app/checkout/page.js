import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
export default function CheckoutPage() {
    const navigate = useNavigate();
    const { items, clearCart } = useCart();
    const { user } = useAuth();
    const [paymentMethod, setPaymentMethod] = useState('gpay');
    const [processing, setProcessing] = useState(false);
    const subtotal = useMemo(() => items.reduce((acc, it) => acc + it.price * it.quantity, 0), [items]);
    const deliveryCharges = subtotal > 50000 ? 0 : (subtotal > 0 ? 500 : 0);
    const total = subtotal + deliveryCharges;
    const handlePlaceOrder = async () => {
        if (!user) {
            // redirect to profile/sign-in first
            navigate('/profile');
            return;
        }
        if (items.length === 0) {
            alert('Your cart is empty. Add items before placing an order.');
            return;
        }
        setProcessing(true);
        // Simulate order creation
        const orderId = 'ORD-' + Math.random().toString(36).slice(2, 9).toUpperCase();
        // In a real app, send order + payment info to backend here.
        // For now, clear cart and redirect to success page with orderId
        clearCart();
        setTimeout(() => {
            navigate(`/checkout/success?orderId=${orderId}`);
        }, 600);
    };
    return (_jsxs("main", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "container mx-auto px-4 sm:px-6 py-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsxs("div", { className: "bg-white border border-gray-200 rounded-sm p-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Order Summary" }), items.length === 0 ? (_jsxs("div", { className: "py-20 text-center", children: [_jsx("p", { className: "text-gray-600 mb-4", children: "Your cart is empty." }), _jsx(Link, { to: "/shop", className: "inline-block px-5 py-3 bg-blue-600 text-white rounded-sm", children: "Start Shopping" })] })) : (_jsx("div", { className: "space-y-4", children: items.map((it) => (_jsxs("div", { className: "flex items-center gap-4 border-b border-gray-100 pb-3", children: [_jsx("img", { src: it.image, alt: it.name, className: "w-20 h-20 object-cover rounded-sm border" }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-medium text-sm text-gray-800", children: it.name }), _jsxs("p", { className: "text-xs text-gray-500", children: ["Qty: ", it.quantity] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-gray-900 font-semibold", children: ["\u20B9", (it.price * it.quantity).toLocaleString()] }), (it.originalPrice) && (_jsxs("div", { className: "text-xs text-gray-500 line-through", children: ["\u20B9", (it.originalPrice).toLocaleString()] }))] })] }, it.id))) }))] }), _jsxs("div", { className: "mt-6 bg-white border border-gray-200 rounded-sm p-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Payment Method" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "radio", name: "payment", value: "gpay", checked: paymentMethod === 'gpay', onChange: () => setPaymentMethod('gpay') }), _jsx("span", { className: "text-sm", children: "Google Pay" })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "radio", name: "payment", value: "phonepe", checked: paymentMethod === 'phonepe', onChange: () => setPaymentMethod('phonepe') }), _jsx("span", { className: "text-sm", children: "PhonePe" })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "radio", name: "payment", value: "card", checked: paymentMethod === 'card', onChange: () => setPaymentMethod('card') }), _jsx("span", { className: "text-sm", children: "Credit / Debit Card" })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "radio", name: "payment", value: "cod", checked: paymentMethod === 'cod', onChange: () => setPaymentMethod('cod') }), _jsx("span", { className: "text-sm", children: "Cash on Delivery" })] })] }), _jsx("div", { className: "mt-6 border-t pt-4", children: _jsx("button", { onClick: handlePlaceOrder, disabled: processing, className: "w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-sm disabled:opacity-60", children: processing ? 'Processing...' : `Pay ₹${total.toLocaleString()}` }) })] })] }), _jsx("aside", { className: "lg:col-span-1", children: _jsxs("div", { className: "bg-white border border-gray-200 rounded-sm p-6 sticky top-20", children: [_jsx("h3", { className: "font-semibold text-gray-700 uppercase text-sm mb-4", children: "Price Details" }), _jsxs("div", { className: "space-y-3 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { children: ["Price (", items.length, " items)"] }), _jsxs("span", { children: ["\u20B9", subtotal.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Delivery Charges" }), _jsx("span", { children: deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}` })] }), _jsxs("div", { className: "border-t pt-3 flex justify-between font-semibold text-base", children: [_jsx("span", { children: "Total Amount" }), _jsxs("span", { children: ["\u20B9", total.toLocaleString()] })] })] })] }) })] }) }), _jsx(Footer, {})] }));
}
