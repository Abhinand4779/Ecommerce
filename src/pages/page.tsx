import React, { useEffect, useState } from 'react';
import HeroBanner from "@/components/ui/HeroBanner";
import CategoryBanner from "@/components/ui/CategoryBanner";
import DealsSection from "@/components/ui/DealsSection";
import ProductCarousel from "@/components/ui/ProductCarousel";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { TruckIcon, ShieldCheck, RotateCcw, Headphones } from "lucide-react";
import { api, Product } from '@/services/api';

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [trending, best] = await Promise.all([
          api.products.list({ limit: 8, featured: true }),
          api.products.list({ limit: 8 })
        ]);
        setTrendingProducts(trending);
        setBestSellers(best);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Map backend product to component's expected format (if needed)
  const mapProduct = (p: Product) => ({
    ...p,
    originalPrice: p.original_price ?? p.price,
    image: p.image || (p.images && p.images[0]) || '/images/placeholder.jpg'
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Deployment ID: FIX_404_V3 */}
      <div id="deployment-check" style={{ display: 'none' }}>FIX_404_V3</div>
      {/* Hero Banner Carousel */}
      <HeroBanner />

      {/* Category Banner */}
      <CategoryBanner />

      {/* Deals Section */}
      <DealsSection />

      {/* Trending Products Carousel */}
      {!loading && trendingProducts.length > 0 && (
        <ProductCarousel
          title="Trending Jewellery"
          products={trendingProducts.map(mapProduct)}
        />
      )}

      {/* Promotional Banner 1 */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-8 sm:py-12 border-y border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                Wedding Season Special
              </h2>
              <p className="text-base sm:text-lg mb-4 opacity-90">
                Get up to 50% OFF on bridal jewellery collections
              </p>
              <Link
                to="/shop?category=wedding"
                className="inline-block bg-white text-purple-600 px-6 py-3 rounded-sm font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Explore Collection
              </Link>
            </div>
            <div className="hidden md:block">
              <img
                src="/images/necklaces.jpg"
                alt="Wedding Collection"
                className="w-full h-48 object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Carousel */}
      {!loading && bestSellers.length > 0 && (
        <ProductCarousel
          title="Best Sellers"
          products={bestSellers.map(mapProduct)}
        />
      )}

      {/* Promotional Banner 2 */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-500 py-8 sm:py-12 border-y border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Gold Jewellery Starting at ₹15,999
          </h2>
          <p className="text-base sm:text-lg text-gray-800 mb-6">
            Exclusive designs with hallmark certification
          </p>
          <Link
            to="/shop?category=gold"
            className="inline-block bg-gray-900 text-white px-6 sm:px-8 py-3 rounded-sm font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base"
          >
            Shop Gold Collection
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-8 sm:py-12 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: <TruckIcon size={32} />, title: 'Free Delivery', desc: 'On orders above ₹10,000' },
              { icon: <ShieldCheck size={32} />, title: '100% Certified', desc: 'Hallmarked jewellery' },
              { icon: <RotateCcw size={32} />, title: 'Easy Returns', desc: '7-day return policy' },
              { icon: <Headphones size={32} />, title: '24/7 Support', desc: 'Dedicated customer care' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex justify-center text-blue-600 mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="bg-white py-6 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Shop by Occasion</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {[
              { name: 'Wedding', image: '/images/necklaces.jpg' },
              { name: 'Engagement', image: '/images/rings.jpg' },
              { name: 'Anniversary', image: '/images/bracelets.jpg' },
              { name: 'Birthday', image: '/images/earrings.jpg' },
              { name: 'Festival', image: '/images/necklaces.jpg' },
              { name: 'Gifting', image: '/images/rings.jpg' },
            ].map((occasion) => (
              <Link
                key={occasion.name}
                to={`/shop?occasion=${occasion.name.toLowerCase()}`}
                className="group"
              >
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <img
                    src={occasion.image}
                    alt={occasion.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs sm:text-sm font-medium text-center text-gray-700 group-hover:text-blue-600">
                  {occasion.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Get Exclusive Offers & Updates
          </h2>
          <p className="text-white/90 mb-6 text-sm sm:text-base">
            Subscribe to our newsletter and never miss a deal
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-sm text-sm focus:outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-sm font-semibold transition-colors text-sm sm:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
