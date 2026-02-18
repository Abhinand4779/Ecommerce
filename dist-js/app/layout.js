import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./globals.css";
import AuthWrapper from '@/components/AuthWrapper';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
export const metadata = {
    title: "Aurelia Jewels | Exquisite Luxury Jewellery",
    description: "Discover the finest collection of handcrafted jewellery. From elegant gold rings to diamond necklaces, Aurelia Jewels offers timeless pieces for every occasion.",
    keywords: "jewellery, luxury, gold, diamonds, rings, necklaces, bracelets, premium jewellery shop",
};
export default function RootLayout({ children, }) {
    return (_jsxs("html", { lang: "en", children: [_jsx("head", { children: _jsx("link", { rel: "icon", href: "/favicon.ico" }) }), _jsx("body", { children: _jsx(AuthWrapper, { children: _jsxs(CartProvider, { children: [_jsx(Navbar, {}), children] }) }) })] }));
}
