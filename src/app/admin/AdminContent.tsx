import React, { useState } from 'react';
import {
    Image as ImageIcon,
    Layout,
    Type,
    Save,
    RefreshCcw,
    Plus,
    Trash2,
    MoveUp,
    MoveDown
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminContent() {
    const [activeTab, setActiveTab] = useState<'banners' | 'categories' | 'promotions'>('banners');

    // Mock initial data - in real app, fetch from backend/config
    const [banners, setBanners] = useState([
        { id: 1, title: 'Luxury Redefined', subtitle: 'New Wedding Collection Out Now', image: '/images/hero-1.jpg', link: '/shop?cat=wedding' },
        { id: 2, title: 'Golden Elegance', subtitle: 'Pure 22K Gold Collections', image: '/images/hero-2.jpg', link: '/shop?cat=gold' },
    ]);

    const handleSave = () => {
        // Here you would send the data to a backend endpoint like /admin/config
        alert("Content settings saved locally! In a production app, this would update the database.");
    };

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-serif mb-2 text-white">Content Management</h1>
                    <p className="text-gray-400">Design the royal experience for your visitors.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="gold-button flex items-center gap-2 px-6 py-3"
                >
                    <Save size={18} /> Save All Changes
                </button>
            </div>

            {/* Content Tabs */}
            <div className="flex gap-4 mb-8 border-b border-white/5">
                {(['banners', 'categories', 'promotions'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-[#D4AF37]' : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Banners Manager */}
            {activeTab === 'banners' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-[#141414] p-4 rounded-xl border border-white/5">
                        <span className="text-sm text-gray-400">Manage Homepage Hero Banners</span>
                        <button className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] hover:underline flex items-center gap-2">
                            <Plus size={14} /> Add Slide
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {banners.map((banner, index) => (
                            <motion.div
                                key={banner.id}
                                layout
                                className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row"
                            >
                                <div className="w-full md:w-64 h-48 bg-white/5 relative">
                                    <img src={banner.image} alt={banner.title} className="w-full h-full object-cover opacity-50" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button className="p-3 bg-black/50 rounded-full hover:bg-black/80 transition-all">
                                            <ImageIcon size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-grow p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Main Title</label>
                                        <input
                                            className="w-full bg-black border border-white/5 rounded-lg px-4 py-3 text-sm focus:border-[#D4AF37]/50 outline-none"
                                            value={banner.title}
                                            onChange={(e) => {
                                                const newBanners = [...banners];
                                                newBanners[index].title = e.target.value;
                                                setBanners(newBanners);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Subtitle</label>
                                        <input
                                            className="w-full bg-black border border-white/5 rounded-lg px-4 py-3 text-sm focus:border-[#D4AF37]/50 outline-none"
                                            value={banner.subtitle}
                                            onChange={(e) => {
                                                const newBanners = [...banners];
                                                newBanners[index].subtitle = e.target.value;
                                                setBanners(newBanners);
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-2 flex justify-between items-center pt-4 border-t border-white/5">
                                        <div className="flex gap-2">
                                            <button className="p-2 bg-white/5 rounded hover:text-[#D4AF37]"><MoveUp size={16} /></button>
                                            <button className="p-2 bg-white/5 rounded hover:text-[#D4AF37]"><MoveDown size={16} /></button>
                                        </div>
                                        <button className="text-red-500 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all">
                                            <Trash2 size={14} /> Remove Slide
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Categories & Promotions Placeholders */}
            {(activeTab === 'categories' || activeTab === 'promotions') && (
                <div className="bg-[#141414] border border-white/5 rounded-2xl p-20 text-center">
                    <Layout size={48} className="mx-auto mb-4 text-gray-800" />
                    <h3 className="text-xl font-serif mb-2">Section Customizer</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">This module allows you to reorder and highlight seasonal collections on the user interface.</p>
                </div>
            )}
        </div>
    );
}
