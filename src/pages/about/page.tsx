import Footer from "@/components/layout/Footer";
import { Award, Users, Globe, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 text-center text-white">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">About Aurelia Jewels</h1>
                    <p className="text-lg sm:text-xl max-w-3xl mx-auto opacity-90">
                        Crafting timeless elegance since 1995. Your trusted destination for premium jewellery.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="bg-white py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Founded in 1995, Aurelia Jewels has been at the forefront of luxury jewellery design and craftsmanship.
                                What started as a small family business has grown into one of India&apos;s most trusted jewellery brands.
                            </p>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                We believe that every piece of jewellery tells a story. Our master craftsmen combine traditional
                                techniques with modern design to create pieces that are not just accessories, but heirlooms to be
                                cherished for generations.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                With over 50 stores across India and a strong online presence, we continue to serve millions of
                                customers who trust us for their special moments.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <img src="/images/rings.jpg" alt="Craftsmanship" className="w-full h-48 object-cover rounded-lg" />
                            <img src="/images/necklaces.jpg" alt="Design" className="w-full h-48 object-cover rounded-lg" />
                            <img src="/images/earrings.jpg" alt="Quality" className="w-full h-48 object-cover rounded-lg" />
                            <img src="/images/bracelets.jpg" alt="Elegance" className="w-full h-48 object-cover rounded-lg" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="bg-gray-50 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <Award size={40} />, title: 'Quality', desc: '100% certified and hallmarked jewellery' },
                            { icon: <Users size={40} />, title: 'Trust', desc: 'Serving 1M+ happy customers' },
                            { icon: <Globe size={40} />, title: 'Sustainability', desc: 'Ethically sourced materials' },
                            { icon: <Heart size={40} />, title: 'Passion', desc: 'Crafted with love and care' },
                        ].map((value, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                                <div className="flex justify-center text-blue-600 mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="font-bold text-lg text-gray-800 mb-2">{value.title}</h3>
                                <p className="text-sm text-gray-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { number: '30+', label: 'Years of Excellence' },
                            { number: '50+', label: 'Stores Nationwide' },
                            { number: '1M+', label: 'Happy Customers' },
                            { number: '10K+', label: 'Unique Designs' },
                        ].map((stat, i) => (
                            <div key={i} className="p-6">
                                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
