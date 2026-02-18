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
    return (<html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico"/>
      </head>
      <body>
        {/* Auth wrapper so components can access auth state */}
        <AuthWrapper>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </AuthWrapper>
      </body>
    </html>);
}
