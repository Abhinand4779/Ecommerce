import React, { useState } from 'react';
import {
    Settings as SettingsIcon,
    Bell,
    Shield,
    CreditCard,
    Globe,
    Store,
    ChevronRight,
    ArrowLeft,
    Save,
    Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSettings() {
    const [selectedSection, setSelectedSection] = useState<string | null>(null);

    const sections = [
        { id: 'profile', title: 'Store Profile', icon: <Store size={20} />, description: 'Store name, logo, and business contact info.' },
        { id: 'security', title: 'Security', icon: <Shield size={20} />, description: 'Admin passwords and 2FA settings.' },
        { id: 'payments', title: 'Payments', icon: <CreditCard size={20} />, description: 'Razorpay, UPI, and Bank Transfer setup.' },
        { id: 'shipping', title: 'Shipping & Delivery', icon: <Globe size={20} />, description: 'Pincode coverage and delivery fees.' },
    ];

    const renderDetailView = () => {
        switch (selectedSection) {
            case 'profile':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="col-span-2 flex items-center gap-6 pb-6 border-b border-white/5">
                                <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-dashed border-[#D4AF37]/50 flex items-center justify-center text-gray-600 relative overflow-hidden group">
                                    <Store size={32} />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-bold transition-all">CHANGE</div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif text-white">Brand Identity</h3>
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Aurelia Jewels Official</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] mb-3">Store Name</label>
                                <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37]/50" defaultValue="Aurelia Jewels" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] mb-3">Support Email</label>
                                <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37]/50" defaultValue="support@aureliajewels.com" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] mb-3">Business Address</label>
                                <textarea className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37]/50 resize-none h-32" defaultValue="Level 4, Diamond Plaza, MG Road, Bangalore, India" />
                            </div>
                        </div>
                        <button className="gold-button w-full py-4 flex items-center justify-center gap-2 font-bold shadow-xl">
                            <Save size={18} /> Update Store Profile
                        </button>
                    </div>
                );
            case 'security':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 max-w-xl mx-auto">
                        <div className="p-8 bg-zinc-900/50 border border-[#D4AF37]/20 rounded-2xl flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                                <Lock size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold">Password Management</h3>
                                <p className="text-xs text-gray-500">Last changed 45 days ago</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <input type="password" placeholder="Current Password" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37]/50" />
                            <input type="password" placeholder="New Secure Password" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37]/50" />
                            <input type="password" placeholder="Confirm New Password" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37]/50" />
                        </div>
                        <button className="gold-button w-full py-4 flex items-center justify-center gap-2 font-bold">
                            Update Master Key
                        </button>
                    </div>
                );
            default:
                return (
                    <div className="py-20 text-center space-y-4">
                        <div className="w-20 h-20 bg-zinc-900 mx-auto rounded-full flex items-center justify-center text-gray-700">
                            <SettingsIcon size={40} className="animate-spin-slow" />
                        </div>
                        <h3 className="text-xl font-serif">Module Loading</h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto">Connecting to encryption services. Please wait while the secure settings module initializes.</p>
                    </div>
                );
        }
    };

    return (
        <div className="text-white max-w-5xl">
            <AnimatePresence mode="wait">
                {!selectedSection ? (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="mb-10">
                            <h1 className="text-3xl font-serif mb-2 text-white">System Settings</h1>
                            <p className="text-gray-400 font-medium">Configure your luxury empire parameters.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setSelectedSection(section.id)}
                                    className="w-full text-left bg-[#0F0F0F] border border-white/5 p-6 rounded-2xl hover:border-[#D4AF37]/40 hover:bg-[#141414] transition-all flex items-center gap-6 group shadow-lg"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/5 transition-all outline outline-0 group-hover:outline-1 outline-[#D4AF37]/20">
                                        {section.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white mb-1 tracking-tight group-hover:text-[#D4AF37] transition-colors">{section.title}</h3>
                                        <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold opacity-60 group-hover:opacity-100 transition-opacity">{section.id}</p>
                                    </div>
                                    <div className="text-gray-800 transition-all group-hover:translate-x-1 group-hover:text-[#D4AF37]">
                                        <ChevronRight size={20} />
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-12 p-10 border border-[#D4AF37]/10 rounded-3xl bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden group">
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#D4AF37]/5 blur-[60px] rounded-full group-hover:bg-[#D4AF37]/10 transition-all" />
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-3">Enterprise Status</h4>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-md">Running Aurelia Engine v2.4.0. Your database is synchronized across 3 nodes. Next maintenance: Sunday, 3:00 AM.</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-[#0D0D0D] border border-white/5 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="p-8 border-b border-white/5 bg-[#141414] flex justify-between items-center">
                            <button
                                onClick={() => setSelectedSection(null)}
                                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                                    <ArrowLeft size={16} />
                                </div>
                                Back to Settings
                            </button>
                            <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Settings Module</h2>
                        </div>
                        <div className="p-10">
                            {renderDetailView()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
