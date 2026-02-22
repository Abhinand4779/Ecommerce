import React, { useState } from 'react';
import {
    Users,
    Search,
    Mail,
    Calendar,
    ShoppingBag,
    Trash2,
    Edit2,
    Eye,
    X,
    Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminCustomers() {
    const [customers, setCustomers] = useState([
        { id: 1, name: 'Aditi Sharma', email: 'aditi@example.com', phone: '+91 98765 43210', joined: 'Oct 12, 2023', orders: 4, totalSpent: 125000 },
        { id: 2, name: 'Rahul Verma', email: 'rahul.v@gmail.com', phone: '+91 88822 11133', joined: 'Nov 05, 2023', orders: 2, totalSpent: 45000 },
        { id: 3, name: 'Priya Patel', email: 'priya.jewelry@live.in', phone: '+91 70011 22334', joined: 'Jan 20, 2024', orders: 1, totalSpent: 89000 },
    ]);

    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to remove this customer record? This cannot be undone.")) {
            setCustomers(customers.filter(c => c.id !== id));
        }
    };

    const handleEmail = (email: string) => {
        window.location.href = `mailto:${email}`;
    };

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-serif mb-2 text-white">Clientèle</h1>
                    <p className="text-gray-400">Manage your relationship with your loyal customers.</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-8 relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="w-full bg-[#141414] border border-white/5 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#D4AF37]/50 transition-all font-sans"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-[10px] font-bold uppercase tracking-widest border-b border-white/5 bg-white/[0.02]">
                                <th className="px-8 py-5">Customer Profile</th>
                                <th className="px-8 py-5">Joined</th>
                                <th className="px-8 py-5 text-center">Orders</th>
                                <th className="px-8 py-5">Total Investment</th>
                                <th className="px-8 py-5 text-right">Privacy & Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredCustomers.map((c) => (
                                <tr key={c.id} className="group hover:bg-white/[0.015] transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] font-bold border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all">
                                                {c.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">{c.name}</h4>
                                                <p className="text-[11px] text-gray-500 font-sans">{c.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-xs text-gray-400 font-sans">
                                            <Calendar size={14} className="opacity-50" />
                                            {c.joined}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-widest uppercase">
                                            <ShoppingBag size={12} />
                                            {c.orders} Orders
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-bold text-white tracking-tight">₹{c.totalSpent.toLocaleString()}</span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-3 translate-x-2 opacity-40 group-hover:opacity-100 transition-all">
                                            <button
                                                onClick={() => setSelectedCustomer(c)}
                                                className="p-2 hover:bg-[#D4AF37]/10 rounded-lg text-white hover:text-[#D4AF37] transition-all"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleEmail(c.email)}
                                                className="p-2 hover:bg-blue-500/10 rounded-lg text-white hover:text-blue-400 transition-all"
                                                title="Send Email"
                                            >
                                                <Mail size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(c.id)}
                                                className="p-2 hover:bg-red-500/10 rounded-lg text-white hover:text-red-500 transition-all"
                                                title="Delete Customer"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Customer Detail Modal */}
            <AnimatePresence>
                {selectedCustomer && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCustomer(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-8 pb-0 flex justify-end">
                                <button onClick={() => setSelectedCustomer(null)} className="text-gray-500 hover:text-white transition-colors p-2">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="px-10 pb-10 pt-4 text-center">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-[#D4AF37]/5 mx-auto mb-6 flex items-center justify-center text-[#D4AF37] text-3xl font-bold border border-[#D4AF37]/30 shadow-2xl">
                                    {selectedCustomer.name.split(' ').map((n: string) => n[0]).join('')}
                                </div>
                                <h3 className="text-2xl font-serif text-white mb-2">{selectedCustomer.name}</h3>
                                <div className="flex flex-col gap-3 mt-8">
                                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5 text-left flex items-center gap-4">
                                        <Mail className="text-gray-500" size={18} />
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Primary Email</p>
                                            <p className="text-sm text-gray-300 font-sans">{selectedCustomer.email}</p>
                                        </div>
                                    </div>
                                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5 text-left flex items-center gap-4">
                                        <Phone className="text-gray-500" size={18} />
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Contact Number</p>
                                            <p className="text-sm text-gray-300 font-sans">{selectedCustomer.phone}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-black/40 p-4 rounded-2xl border border-white/5 text-left">
                                            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Total Orders</p>
                                            <p className="text-lg font-bold text-white">{selectedCustomer.orders}</p>
                                        </div>
                                        <div className="bg-black/40 p-4 rounded-2xl border border-white/5 text-left">
                                            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Lifetime Value</p>
                                            <p className="text-lg font-bold text-white">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleEmail(selectedCustomer.email)}
                                    className="gold-button w-full mt-8 py-4 flex items-center justify-center gap-2 font-bold shadow-xl"
                                >
                                    <Mail size={18} /> Connect with Client
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
