import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#0A0A0A] border-t border-white/5 pt-24 pb-12 px-6 md:px-12">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

                    {/* Brand */}
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="text-3xl font-bold tracking-widest text-white">
                            <span className="gold-gradient">AURELIA</span>
                        </Link>
                        <p className="text-gray-400 max-w-xs">
                            Defining luxury since 1995. Our commitment to quality and craftsmanship makes us the premier choice for fine jewellery.
                        </p>
                        <div className="flex gap-4">
                            <Link to="#" className="hover:text-[#D4AF37] transition-colors"><Facebook size={20} /></Link>
                            <Link to="#" className="hover:text-[#D4AF37] transition-colors"><Instagram size={20} /></Link>
                            <Link to="#" className="hover:text-[#D4AF37] transition-colors"><Twitter size={20} /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white text-lg font-serif mb-8">Navigation</h4>
                        <ul className="flex flex-col gap-4 text-gray-400">
                            <li><Link to="/shop?category=rings&type=solitaire" className="hover:text-[#D4AF37] transition-colors">Solitaire</Link></li>
                            <li><Link to="/shop?category=necklaces&type=pendant" className="hover:text-[#D4AF37] transition-colors">Pendant</Link></li>
                            <li><Link to="/shop?category=earrings&type=studs" className="hover:text-[#D4AF37] transition-colors">Studs</Link></li>
                            <li><Link to="/shop?category=anklets&type=gold" className="hover:text-[#D4AF37] transition-colors">Gold Anklets</Link></li>
                            <li><Link to="/shop?category=bangles&type=kada" className="hover:text-[#D4AF37] transition-colors">Kada</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white text-lg font-serif mb-8">Visit Us</h4>
                        <ul className="flex flex-col gap-6 text-gray-400">
                            <li className="flex gap-3">
                                <MapPin size={20} className="text-[#D4AF37] shrink-0" />
                                <span>123 Diamond Avenue, <br />Mayfair, London, UK</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone size={20} className="text-[#D4AF37] shrink-0" />
                                <span>+44 20 7123 4567</span>
                            </li>
                            <li className="flex gap-3">
                                <Mail size={20} className="text-[#D4AF37] shrink-0" />
                                <span>concierge@aurelia.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white text-lg font-serif mb-8">Newsletter</h4>
                        <p className="text-gray-400 mb-6">Join our elite circle for exclusive previews and offers.</p>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-none focus:outline-none focus:border-[#D4AF37] transition-colors"
                            />
                            <button className="absolute right-0 top-0 h-full px-4 text-[#D4AF37] hover:text-white transition-colors">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                    <p>© 2026 Aurelia Jewels. All Rights Reserved.</p>
                    <div className="flex gap-8 items-center">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/admin" className="opacity-0 hover:opacity-10 transition-opacity text-[8px] cursor-default">.</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
