import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AuthWrapper from '@/components/AuthWrapper';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
// Pages
import Home from '@/app/page';
import ShopPage from '@/app/shop/page';
import ProductDetail from '@/app/shop/ProductDetail';
import CartPage from '@/app/cart/page';
import CheckoutPage from '@/app/checkout/page';
import CheckoutSuccessPage from '@/app/checkout/success/page';
import LoginPage from '@/app/login/page';
import RegisterPage from '@/app/register/page';
import ProfilePage from '@/app/profile/page';
import AboutPage from '@/app/about/page';
import ContactPage from '@/app/contact/page';
// Admin
import AdminLayout from '@/app/admin/layout';
import AdminDashboard from '@/app/admin/page';
// Layout Shell for public pages
const PublicLayout = () => (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-grow", children: _jsx(Outlet, {}) })] }));
function App() {
    return (_jsx(Router, { children: _jsx(AuthWrapper, { children: _jsx(CartProvider, { children: _jsxs(Routes, { children: [_jsxs(Route, { path: "/", element: _jsx(PublicLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "shop", element: _jsx(ShopPage, {}) }), _jsx(Route, { path: "shop/:slug", element: _jsx(ProductDetail, {}) }), _jsx(Route, { path: "cart", element: _jsx(CartPage, {}) }), _jsx(Route, { path: "checkout", element: _jsx(CheckoutPage, {}) }), _jsx(Route, { path: "checkout/success", element: _jsx(CheckoutSuccessPage, {}) }), _jsx(Route, { path: "profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "contact", element: _jsx(ContactPage, {}) })] }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsxs(Route, { path: "/admin", element: _jsx(AdminLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(AdminDashboard, {}) }), _jsx(Route, { path: "*", element: _jsx("div", { className: "p-8", children: "Page under construction" }) })] }), _jsx(Route, { path: "*", element: _jsx("div", { className: "p-20 text-center", children: "404 - Page Not Found" }) })] }) }) }) }));
}
export default App;
