import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
export default function CheckoutSuccessPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get('orderId');
    return (_jsxs("main", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "container mx-auto px-4 sm:px-6 py-12", children: _jsxs("div", { className: "bg-white border border-gray-200 rounded-sm p-10 text-center", children: [_jsx("h1", { className: "text-2xl font-semibold mb-4", children: "Thank you! Your order has been placed." }), orderId && _jsxs("p", { className: "text-sm text-gray-600 mb-6", children: ["Order ID: ", _jsx("span", { className: "font-mono", children: orderId })] }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [_jsx(Link, { to: "/orders", className: "px-5 py-3 bg-blue-600 text-white rounded-sm", children: "View Orders" }), _jsx("button", { className: "px-5 py-3 border rounded-sm", onClick: () => navigate('/shop'), children: "Continue Shopping" })] })] }) }), _jsx(Footer, {})] }));
}
