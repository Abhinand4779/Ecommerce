"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Footer from '@/components/layout/Footer';
import ProductCardFlipkart from '@/components/ui/ProductCardFlipkart';
import { Star, ChevronRight, ShoppingCart, Zap, TruckIcon, ShieldCheck, RotateCcw, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products as allProducts } from '@/data/products';
function isProductId(slug) {
    return allProducts.some(p => String(p.id) === slug || p.id === Number(slug));
}
export default function ShopSlugPage({ params }) {
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
            originalPrice: found.originalPrice ?? found.price,
            discount: found.discount ?? 0,
            rating: found.rating ?? 4.5,
            reviews: found.reviews ?? 0,
            category: found.category ?? 'Jewellery',
            images: found.images ?? [found.image],
            description: found.description ?? 'Beautiful handcrafted piece.',
            highlights: found.highlights ?? [],
            specifications: found.specifications ?? {},
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
            }
            catch (e) {
                console.error('Add to cart failed', e);
            }
        };
        const favorite = isFavorite(Number(product.id));
        return (_jsxs("div", { className: "min-h-screen bg-white", children: [_jsx("div", { className: "bg-white border-b border-gray-200", children: _jsx("div", { className: "container mx-auto px-4 sm:px-6 py-3", children: _jsxs("div", { className: "flex items-center gap-2 text-xs sm:text-sm text-gray-600", children: [_jsx("span", { className: "hover:text-blue-600 cursor-pointer", children: "Home" }), _jsx(ChevronRight, { size: 14 }), _jsx("span", { className: "hover:text-blue-600 cursor-pointer", children: "Jewellery" }), _jsx(ChevronRight, { size: 14 }), _jsx("span", { className: "hover:text-blue-600 cursor-pointer", children: product.category }), _jsx(ChevronRight, { size: 14 }), _jsx("span", { className: "text-gray-900 line-clamp-1", children: product.name })] }) }) }), _jsxs("div", { className: "container mx-auto px-4 sm:px-6 py-4 sm:py-6", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8", children: [_jsxs("div", { className: "flex flex-col-reverse sm:flex-row gap-4", children: [_jsx("div", { className: "flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible", children: product.images.map((img, index) => (_jsx("button", { onClick: () => setSelectedImage(index), className: `flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-sm overflow-hidden ${selectedImage === index ? 'border-blue-600' : 'border-gray-200'}`, children: _jsx("img", { src: img, alt: `View ${index + 1}`, className: "w-full h-full object-cover" }) }, index))) }), _jsx("div", { className: "flex-1 bg-gray-50 rounded-sm overflow-hidden sticky top-20 h-fit", children: _jsx("img", { src: product.images[selectedImage], alt: product.name, className: "w-full aspect-square object-cover" }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("h1", { className: "text-xl sm:text-2xl text-gray-800", children: product.name }), _jsx("button", { onClick: () => toggleFavorite(Number(product.id)), "aria-label": "Add to wishlist", className: `p-2 rounded-full ${favorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`, children: _jsx(Heart, { size: 18 }) })] }), _jsxs("div", { className: "flex items-center gap-3 mb-4 pb-4 border-b border-gray-200", children: [_jsxs("div", { className: "flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-sm text-sm font-semibold", children: [product.rating, _jsx(Star, { size: 12, fill: "white" })] }), _jsxs("span", { className: "text-sm text-gray-600", children: [product.reviews.toLocaleString(), " Ratings & Reviews"] })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-baseline gap-3 mb-2", children: [_jsxs("span", { className: "text-3xl font-medium text-gray-900", children: ["\u20B9", product.price.toLocaleString()] }), _jsxs("span", { className: "text-lg text-gray-500 line-through", children: ["\u20B9", product.originalPrice.toLocaleString()] }), _jsxs("span", { className: "text-lg text-green-600 font-semibold", children: [product.discount, "% off"] })] }), _jsx("p", { className: "text-sm text-green-600 font-medium", children: "+ \u20B9500 Secured Packaging Fee" })] }), _jsxs("div", { className: "mb-6 pb-6 border-b border-gray-200", children: [_jsx("h3", { className: "font-semibold text-sm mb-3", children: "Available Offers" }), _jsx("div", { className: "space-y-2", children: [
                                                        'Bank Offer: 10% instant discount on HDFC Bank Credit Cards',
                                                        'Special Price: Get extra 5% off (price inclusive of discount)',
                                                        'No Cost EMI: Available on orders above ₹10,000',
                                                    ].map((offer, i) => (_jsxs("div", { className: "flex items-start gap-2 text-sm", children: [_jsx("span", { className: "text-green-600 font-bold mt-0.5", children: "\u2022" }), _jsx("span", { className: "text-gray-700", children: offer })] }, i))) })] }), _jsxs("div", { className: "mb-6 pb-6 border-b border-gray-200", children: [_jsx("h3", { className: "font-semibold text-sm mb-3", children: "Delivery" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", placeholder: "Enter Delivery Pincode", value: pincode, onChange: (e) => setPincode(e.target.value), className: "flex-1 px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" }), _jsx("button", { className: "px-4 py-2 text-blue-600 font-semibold text-sm hover:bg-blue-50 rounded-sm", children: "Check" })] }), _jsx("p", { className: "text-sm text-gray-600 mt-2", children: "Usually delivered in 5-7 business days" })] }), _jsxs("div", { className: "mb-6 pb-6 border-b border-gray-200", children: [_jsx("h3", { className: "font-semibold text-sm mb-3", children: "Highlights" }), _jsx("ul", { className: "space-y-2", children: product.highlights.map((highlight, i) => (_jsxs("li", { className: "flex items-start gap-2 text-sm text-gray-700", children: [_jsx("span", { className: "text-gray-400 mt-1", children: "\u2022" }), highlight] }, i))) })] }), _jsxs("div", { className: "mb-6 pb-6 border-b border-gray-200", children: [_jsx("h3", { className: "font-semibold text-sm mb-3", children: "Services" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: [{ icon: _jsx(TruckIcon, { size: 20 }), text: 'Free Delivery' }, { icon: _jsx(ShieldCheck, { size: 20 }), text: '5 Year Warranty' }, { icon: _jsx(RotateCcw, { size: 20 }), text: '7 Days Return' }, { icon: _jsx(Star, { size: 20 }), text: 'Certified Quality' }].map((service, i) => (_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-700", children: [_jsx("span", { className: "text-gray-400", children: service.icon }), service.text] }, i))) })] }), _jsxs("div", { className: "flex gap-3 sticky bottom-0 bg-white py-4 border-t border-gray-200 lg:border-0", children: [_jsxs("button", { onClick: handleAdd, className: "flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-sm flex items-center justify-center gap-2 transition-colors", children: [_jsx(ShoppingCart, { size: 20 }), "ADD TO CART"] }), added && _jsx("div", { className: "fixed right-4 bottom-6 bg-amber-600 text-white px-4 py-2 rounded shadow-lg", children: "Added to cart" }), _jsxs("button", { className: "flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-sm flex items-center justify-center gap-2 transition-colors", children: [_jsx(Zap, { size: 20 }), "BUY NOW"] })] })] })] }), _jsxs("div", { className: "mt-8 bg-white border border-gray-200 rounded-sm p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Specifications" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: Object.entries(product.specifications).map(([key, value]) => (_jsxs("div", { className: "flex py-3 border-b border-gray-200", children: [_jsx("span", { className: "w-1/3 text-sm text-gray-600", children: key }), _jsx("span", { className: "w-2/3 text-sm text-gray-900 font-medium", children: value })] }, key))) })] }), _jsxs("div", { className: "mt-8 bg-white border border-gray-200 rounded-sm p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Product Description" }), _jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: product.description })] })] }), _jsx(Footer, {})] }));
    }
    // Category page (single segment categories like /shop/rings)
    const category = slug;
    const title = category.charAt(0).toUpperCase() + category.slice(1);
    const products = allProducts.filter(p => p.category === category);
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "bg-white border-b border-gray-200", children: _jsx("div", { className: "container mx-auto px-4 sm:px-6 py-3", children: _jsxs("div", { className: "flex items-center gap-2 text-xs sm:text-sm text-gray-600", children: [_jsx("span", { className: "hover:text-blue-600 cursor-pointer", children: "Home" }), _jsx(ChevronRight, { size: 14 }), _jsx("span", { className: "text-gray-900 font-medium", children: title })] }) }) }), _jsxs("div", { className: "container mx-auto px-4 sm:px-6 py-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: title }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: products.length > 0 ? products.map(p => _jsx(ProductCardFlipkart, { product: p }, p.id)) : _jsx("div", { className: "col-span-full bg-white p-6 rounded border border-gray-200 text-center", children: "No products found for this category yet." }) })] }), _jsx(Footer, {})] }));
}
