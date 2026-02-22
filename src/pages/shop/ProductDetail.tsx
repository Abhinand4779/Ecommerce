import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import ProductCardFlipkart from '@/components/ui/ProductCardFlipkart';
import { Star, ChevronRight, ShoppingCart, Zap, TruckIcon, ShieldCheck, RotateCcw, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { api, Product } from '@/services/api';

export default function ProductDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<any>(null);
    const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [pincode, setPincode] = useState('');
    const { addToCart, toggleFavorite, isFavorite } = useCart();
    const [added, setAdded] = useState(false);

    const isNumeric = (str: string) => /^\d+$/.test(str);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                if (isNumeric(slug)) {
                    // Fetch single product
                    const data = await api.products.get(Number(slug));
                    setProduct({
                        ...data,
                        originalPrice: data.original_price ?? data.price,
                        images: data.images?.length ? data.images : [data.image || '/images/placeholder.jpg'],
                        reviews: data.review_count || 0,
                        specifications: (data as any).specifications || {
                            "Metal": "18K Gold",
                            "Category": data.category || "Jewellery",
                            "In Stock": data.in_stock ? "Yes" : "No"
                        }
                    });
                } else {
                    // Fetch category products
                    const data = await api.products.list({ category: slug });
                    setCategoryProducts(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (isNumeric(slug || '')) {
        if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

        const handleAdd = () => {
            try {
                addToCart({
                    id: Number(product.id),
                    name: product.name,
                    price: product.price,
                    image: product.image || product.images?.[0] || ''
                });
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
                            <Link to="/" className="hover:text-blue-600 cursor-pointer">Home</Link>
                            <ChevronRight size={14} />
                            <Link to="/shop" className="hover:text-blue-600 cursor-pointer">Jewellery</Link>
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
                                {product.images.map((img: string, index: number) => (
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
                                    src={product.images[selectedImage]}
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
                                    {product.originalPrice > product.price && (
                                        <>
                                            <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                                            <span className="text-lg text-green-600 font-semibold">{product.discount}% off</span>
                                        </>
                                    )}
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
                            {Object.entries(product.specifications as Record<string, string>).map(([key, value]) => (
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

    // Category page
    const title = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Category';

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 py-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <Link to="/" className="hover:text-blue-600 cursor-pointer">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-900 font-medium">{title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-8">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categoryProducts.length > 0 ? categoryProducts.map(p => (
                        <ProductCardFlipkart key={p.id} product={{
                            ...p,
                            originalPrice: p.original_price ?? p.price,
                            image: p.image || (p.images && p.images[0]) || '/images/placeholder.jpg',
                            reviews: p.review_count
                        } as any} />
                    )) : (
                        <div className="col-span-full bg-white p-6 rounded border border-gray-200 text-center">
                            No products found for this category yet.
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
