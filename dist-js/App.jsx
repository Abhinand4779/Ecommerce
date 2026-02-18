import React from 'react';
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
const PublicLayout = () => (<div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
            <Outlet />
        </main>
        {/* Footer is inside some pages, but optimally should be here if all pages have it.
        However, some pages like Login/Register might not need it or have it inside.
        The current Home page handles its own Footer.
        Let's check if we should include Footer here globally.
        Most pages seemed to include <Footer /> manually.
        For now, I'll rely on pages rendering Footer themselves to match previous structure,
        or I can refactor later.
    */}
    </div>);
function App() {
    return (<Router>
            <AuthWrapper>
                <CartProvider>
                    <Routes>
                        {/* Public Routes with Navbar */}
                        <Route path="/" element={<PublicLayout />}>
                            <Route index element={<Home />}/>
                            <Route path="shop" element={<ShopPage />}/>
                            <Route path="shop/:slug" element={<ProductDetail />}/>
                            <Route path="cart" element={<CartPage />}/>
                            <Route path="checkout" element={<CheckoutPage />}/>
                            <Route path="checkout/success" element={<CheckoutSuccessPage />}/>
                            <Route path="profile" element={<ProfilePage />}/>
                            <Route path="about" element={<AboutPage />}/>
                            <Route path="contact" element={<ContactPage />}/>
                        </Route>

                        {/* Auth Routes (can be separate layout or same) */}
                        <Route path="/login" element={<LoginPage />}/>
                        <Route path="/register" element={<RegisterPage />}/>

                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />}/>
                            <Route path="*" element={<div className="p-8">Page under construction</div>}/>
                        </Route>

                        {/* Fallback */}
                        <Route path="*" element={<div className="p-20 text-center">404 - Page Not Found</div>}/>
                    </Routes>
                </CartProvider>
            </AuthWrapper>
        </Router>);
}
export default App;
