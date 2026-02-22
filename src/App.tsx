
// Last updated: 2026-02-22 23:05
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AuthWrapper from '@/components/AuthWrapper';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Pages
import Home from '@/pages/page';
import ShopPage from '@/pages/shop/page';
import ProductDetail from '@/pages/shop/ProductDetail';
import CartPage from '@/pages/cart/page';
import CheckoutPage from '@/pages/checkout/page';
import CheckoutSuccessPage from '@/pages/checkout/success/CheckoutSuccessClient';
import LoginPage from '@/pages/login/page';
import RegisterPage from '@/pages/register/page';
import ProfilePage from '@/pages/profile/page';
import AboutPage from '@/pages/about/page';
import ContactPage from '@/pages/contact/page';

// Admin
import AdminLayout from '@/pages/admin/layout';
import AdminDashboard from '@/pages/admin/page';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminContent from '@/pages/admin/AdminContent';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminCustomers from '@/pages/admin/AdminCustomers';
import AdminSettings from '@/pages/admin/AdminSettings';

// Layout Shell for public pages — each page renders its own <Footer />
const PublicLayout = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
            <Outlet />
        </main>
    </div>
);

function App() {
    return (
        <Router>
            <AuthWrapper>
                <CartProvider>
                    <Routes>
                        {/* Public Routes with Navbar */}
                        <Route path="/" element={<PublicLayout />}>
                            <Route index element={<Home />} />
                            <Route path="shop" element={<ShopPage />} />
                            <Route path="shop/:slug" element={<ProductDetail />} />
                            <Route path="cart" element={<CartPage />} />
                            <Route path="checkout" element={<CheckoutPage />} />
                            <Route path="checkout/success" element={<CheckoutSuccessPage />} />
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="about" element={<AboutPage />} />
                            <Route path="contact" element={<ContactPage />} />
                        </Route>

                        {/* Auth Routes (can be separate layout or same) */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="products" element={<AdminProducts />} />
                            <Route path="orders" element={<AdminOrders />} />
                            <Route path="content" element={<AdminContent />} />
                            <Route path="categories" element={<AdminCategories />} />
                            <Route path="customers" element={<AdminCustomers />} />
                            <Route path="settings" element={<AdminSettings />} />
                        </Route>

                        {/* Fallback */}
                        <Route path="*" element={<div className="p-20 text-center">404 - Page Not Found</div>} />
                    </Routes>
                </CartProvider>
            </AuthWrapper>
        </Router>
    );
}

export default App;
