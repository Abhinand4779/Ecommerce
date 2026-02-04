"use client";
import React, { useState } from 'react';
import Footer from '@/components/layout/Footer';
import ProductCardFlipkart from '@/components/ui/ProductCardFlipkart';
import { Star, ChevronRight, ShoppingCart, Zap, TruckIcon, ShieldCheck, RotateCcw, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products as allProducts } from '@/data/products';

function isProductId(slug: string) {
  return allProducts.some(p => String(p.id) === slug || p.id === Number(slug));
}

export default function ShopSlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Product detail page
  if (isProductId(slug)) {
    // Reuse the existing product detail logic (copied from [id]/page.tsx)
    const id = slug;

    const [selectedImage, setSelectedImage] = useState(0);
    const [pincode, setPincode] = useState('');

    const found = allProducts.find(p => String(p.id) === id || p.id === Number(id));

    const product = found ? {
      ...found,
      name: found.name,
      price: found.price,
      originalPrice: (found as any).originalPrice ?? found.price,
      discount: (found as any).discount ?? 0,
      rating: (found as any).rating ?? 4.5,
      reviews: (found as any).reviews ?? 0,
      category: found.category ?? 'Jewellery',
      images: (found as any).images ?? [found.image],
      description: (found as any).description ?? 'Beautiful handcrafted piece.',
      highlights: (found as any).highlights ?? [],
      specifications: (found as any).specifications ?? {},
    } : {
      id,
      name: "Royal Emerald & Diamond Necklace Set with Matching Earrings",
      price: 45000,
      originalPrice: 75000,
      discount: 40,
      rating: 4.5,
      reviews: 1240,
      category: "Necklaces",
      images: [
        "/images/necklaces.jpg",
        "/images/necklaces.jpg",
        "/images/necklaces.jpg",
        "/images/necklaces.jpg",
      ],
      description: "Exquisite handcrafted necklace set featuring natural emeralds and diamonds set in 18k gold. Perfect for weddings and special occasions.",
      highlights: [
        "18k Solid Yellow Gold (Hallmarked)",
        "Natural Emerald - 5.2 Carat",
        "Diamond Total Weight - 1.5 Carat",
        "Clarity: VS1, Color: G",
        "Includes matching earrings",
        "Comes with authenticity certificate"
      ],
      specifications: {
        "Metal": "18K Yellow Gold",
        "Gemstone": "Emerald & Diamond",
        "Weight": "45.2 grams",
        "Length": "18 inches (adjustable)",
        "Occasion": "Wedding, Party",
        "Warranty": "5 Years Manufacturing Warranty"
      }
    };

    const { addToCart, toggleFavorite, isFavorite } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
      try {
        addToCart({ id: Number(product.id), name: product.name, price: product.price, image: product.images?.[selectedImage] ?? product.images?.[0] ?? '' });
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
      } catch (e) {
        console.error('Add to cart failed', e);
      }
    }

    const favorite = isFavorite(Number(product.id));

    return (
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <span className="hover:text-blue-600 cursor-pointer">Home</span>
              <ChevronRight size={14} />
              <span className="hover:text-blue-600 cursor-pointer">Jewellery</span>
              <ChevronRight size={14} />
              <span className="hover:text-blue-600 cursor-pointer">{product.category}</span>
              <ChevronRight size={14} />
              <span className="text-gray-900 line-clamp-1">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left: Images */}
            <div className="flex flex-col-reverse sm:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible">
                {(product.images as string[]).map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-sm overflow-hidden ${selectedImage === index ? 'border-blue-600' : 'border-gray-200'}`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 bg-gray-50 rounded-sm overflow-hidden sticky top-20 h-fit">
                <img
                    src={(product.images as string[])[selectedImage]}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>

            {/* Right: Product Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-xl sm:text-2xl text-gray-800">{product.name}</h1>
                <button onClick={() => toggleFavorite(Number(product.id))} aria-label="Add to wishlist" className={`p-2 rounded-full ${favorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                  <Heart size={18} />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-sm text-sm font-semibold">
                  {product.rating}
                  <Star size={12} fill="white" />
                </div>
                <span className="text-sm text-gray-600">
                  {product.reviews.toLocaleString()} Ratings & Reviews
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-medium text-gray-900">₹{product.price.toLocaleString()}</span>
                  <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-lg text-green-600 font-semibold">{product.discount}% off</span>
                </div>
                <p className="text-sm text-green-600 font-medium">+ ₹500 Secured Packaging Fee</p>
              </div>

              {/* Offers */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-sm mb-3">Available Offers</h3>
                <div className="space-y-2">
                  {[
                    'Bank Offer: 10% instant discount on HDFC Bank Credit Cards',
                    'Special Price: Get extra 5% off (price inclusive of discount)',
                    'No Cost EMI: Available on orders above ₹10,000',
                  ].map((offer, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-600 font-bold mt-0.5">•</span>
                      <span className="text-gray-700">{offer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Check */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-sm mb-3">Delivery</h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter Delivery Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  <button className="px-4 py-2 text-blue-600 font-semibold text-sm hover:bg-blue-50 rounded-sm">Check</button>
                </div>
                <p className="text-sm text-gray-600 mt-2">Usually delivered in 5-7 business days</p>
              </div>

              {/* Highlights */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-sm mb-3">Highlights</h3>
                <ul className="space-y-2">
                  {(product.highlights as string[]).map((highlight: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-gray-400 mt-1">•</span>{highlight}</li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-sm mb-3">Services</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[{ icon: <TruckIcon size={20} />, text: 'Free Delivery' }, { icon: <ShieldCheck size={20} />, text: '5 Year Warranty' }, { icon: <RotateCcw size={20} />, text: '7 Days Return' }, { icon: <Star size={20} />, text: 'Certified Quality' }].map((service, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700"><span className="text-gray-400">{service.icon}</span>{service.text}</div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 sticky bottom-0 bg-white py-4 border-t border-gray-200 lg:border-0">
                <button onClick={handleAdd} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-sm flex items-center justify-center gap-2 transition-colors">
                  <ShoppingCart size={20} />
                  ADD TO CART
                </button>

                {added && <div className="fixed right-4 bottom-6 bg-amber-600 text-white px-4 py-2 rounded shadow-lg">Added to cart</div>}
                <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-sm flex items-center justify-center gap-2 transition-colors"><Zap size={20} />BUY NOW</button>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-8 bg-white border border-gray-200 rounded-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications as Record<string,string>).map(([key, value]) => (
                <div key={key} className="flex py-3 border-b border-gray-200"><span className="w-1/3 text-sm text-gray-600">{key}</span><span className="w-2/3 text-sm text-gray-900 font-medium">{value}</span></div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 bg-white border border-gray-200 rounded-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Product Description</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Category page (single segment categories like /shop/rings)
  const category = slug;
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  const products = allProducts.filter(p => p.category === category);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">{title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? products.map(p => <ProductCardFlipkart key={p.id} product={p} />) : <div className="col-span-full bg-white p-6 rounded border border-gray-200 text-center">No products found for this category yet.</div>}
        </div>
      </div>

      <Footer />
    </div>
  );
}
