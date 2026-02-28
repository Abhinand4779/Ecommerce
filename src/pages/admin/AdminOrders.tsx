import React, { useEffect, useState } from 'react';
import {
    ShoppingBag,
    Search,
    Filter,
    Eye,
    CheckCircle2,
    Clock,
    Truck,
    ChevronRight,
    X
} from 'lucide-react';
import { api, API_BASE_URL } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            if (!token) return;
            const data = await api.orders.listAdmin(token);
            setOrders(data);
        } catch (error) {
            console.error("Error fetching admin orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: number, status: string) => {
        try {
            const token = localStorage.getItem("auth_token");
            if (!token) return;

            await fetch(`${API_BASE_URL}/orders/admin/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            fetchOrders();
            if (selectedOrder?.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status });
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return <Clock size={14} className="text-amber-500" />;
            case 'processing': return <Clock size={14} className="text-blue-500" />;
            case 'shipped': return <Truck size={14} className="text-purple-500" />;
            case 'delivered': return <CheckCircle2 size={14} className="text-green-500" />;
            default: return <Clock size={14} className="text-gray-500" />;
        }
    };

    const filteredOrders = orders.filter(o =>
        o.id.toString().includes(searchTerm) ||
        o.user_email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-serif mb-2 text-white">Customer Orders</h1>
                    <p className="text-gray-400">Track and fulfill luxury dreams.</p>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex-grow max-w-md relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search orders (ID or Email)..."
                        className="w-full bg-[#141414] border border-white/5 rounded-lg pl-12 pr-4 py-3 focus:border-[#D4AF37]/50 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-white/5 bg-white/[0.02]">
                                <th className="px-8 py-5">Order ID</th>
                                <th className="px-8 py-5">Customer</th>
                                <th className="px-8 py-5">Amount</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredOrders.map((o) => (
                                <tr key={o.id} className="group hover:bg-white/[0.01] transition-colors">
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-medium text-[#D4AF37]">#{o.id}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-white">{o.user_name || 'Guest'}</span>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-tighter">{o.user_email}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-bold text-white">₹{o.total?.toLocaleString()}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${o.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                                            o.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                                                'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            {getStatusIcon(o.status)}
                                            {o.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            onClick={() => setSelectedOrder(o)}
                                            className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#D4AF37] transition-all flex items-center gap-2 ml-auto"
                                        >
                                            <span className="text-xs uppercase font-bold tracking-widest">Detail</span>
                                            <ChevronRight size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {loading && <div className="p-20 text-center text-gray-500">Retrieving luxury records...</div>}
                {!loading && filteredOrders.length === 0 && (
                    <div className="p-20 text-center">
                        <ShoppingBag size={48} className="mx-auto mb-4 text-gray-800" />
                        <p className="text-gray-500">Wait for your first royal customer.</p>
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-3xl bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.1)]"
                        >
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#141414]">
                                <div>
                                    <h3 className="text-2xl font-serif text-[#D4AF37]">Order Details</h3>
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-[0.2em]">Transaction #{selectedOrder.id}</p>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <X size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Order Summary */}
                                <div className="space-y-8">
                                    <section>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">Items</h4>
                                        <div className="space-y-4">
                                            {selectedOrder.items?.map((item: any) => (
                                                <div key={item.id} className="flex justify-between items-center p-3 bg-white/[0.012] border border-white/5 rounded-lg">
                                                    <div>
                                                        <p className="text-sm font-medium">{item.product_name || 'Product'}</p>
                                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="text-sm font-bold">₹{item.price.toLocaleString()}</p>
                                                </div>
                                            ))}
                                            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                                <span className="text-sm text-gray-400">Grand Total</span>
                                                <span className="text-xl font-serif text-[#D4AF37]">₹{selectedOrder.total?.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">Status Update</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(status => (
                                                <button
                                                    key={status}
                                                    onClick={() => updateStatus(selectedOrder.id, status)}
                                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all capitalize ${selectedOrder.status === status
                                                        ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                                        }`}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                {/* Shipping Info */}
                                <div className="space-y-8">
                                    <section className="bg-white/[0.012] p-6 border border-white/5 rounded-xl">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-6 border-b border-white/5 pb-2">Customer Information</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Customer Name</p>
                                                <p className="text-sm">{selectedOrder.user_name || 'Guest'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Email</p>
                                                <p className="text-sm font-mono">{selectedOrder.user_email}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Shipping Address</p>
                                                <p className="text-sm leading-relaxed text-gray-300">
                                                    {selectedOrder.shipping_address || 'No address provided'}
                                                </p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
