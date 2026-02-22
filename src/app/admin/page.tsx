import React, { useEffect, useState } from 'react';
import {
    TrendingUp,
    ShoppingBag,
    Users,
    ArrowUpRight,
    ArrowDownRight,
    Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("auth_token");
            if (!token || !user?.is_admin) {
                setLoading(false);
                return;
            }
            try {
                const data = await api.orders.listAdmin(token);
                setOrders(data);
            } catch (error) {
                console.error("Error fetching admin orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (!user?.is_admin) {
        return (
            <div className="flex items-center justify-center p-20 text-center">
                <h2 className="text-2xl font-serif text-gray-500">Access Denied. Admins Only.</h2>
            </div>
        );
    }

    const totalSales = orders.reduce((acc, order) => acc + (order.total_amount || 0), 0);
    const recentOrders = orders.slice(0, 5).map(o => ({
        id: `#${o.id}`,
        customer: o.user_email || 'Unknown',
        product: o.items?.[0]?.product_name || 'Multiple Items',
        amount: `₹${(o.total_amount || 0).toLocaleString()}`,
        status: o.status || 'Pending'
    }));

    const stats = [
        { label: 'Total Sales', value: `₹${totalSales.toLocaleString()}`, icon: <TrendingUp size={24} />, trend: '+0%', isUp: true },
        { label: 'Total Orders', value: orders.length.toString(), icon: <ShoppingBag size={24} />, trend: '+0%', isUp: true },
        { label: 'Customers', value: new Set(orders.map(o => o.user_id)).size.toString(), icon: <Users size={24} />, trend: '+0%', isUp: true },
    ];

    return (
        <div className="flex flex-col gap-8 text-white">
            {/* Welcome Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif mb-2">Dashboard</h1>
                    <p className="text-gray-400">Manage your luxury empire with ease.</p>
                </div>
                <button
                    onClick={() => navigate('/admin/products')}
                    className="gold-button flex items-center gap-2 text-sm px-6 py-2"
                >
                    <Plus size={18} /> New Product
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#141414] border border-white/5 p-6 rounded-xl hover:border-[#D4AF37]/30 transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-lg text-[#D4AF37]">
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${stat.isUp ? 'text-green-400' : 'text-red-400'}`}>
                                {stat.trend} {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Orders */}
                <div className="lg:col-span-3 bg-[#141414] border border-white/5 p-8 rounded-xl">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-serif text-white">Recent Orders</h3>
                        <button
                            onClick={() => navigate('/admin/orders')}
                            className="text-[#D4AF37] text-sm hover:underline"
                        >
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-500 text-sm border-b border-white/5">
                                    <th className="pb-4 font-medium">Order ID</th>
                                    <th className="pb-4 font-medium">Customer</th>
                                    <th className="pb-4 font-medium">Product</th>
                                    <th className="pb-4 font-medium">Amount</th>
                                    <th className="pb-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="text-sm group text-gray-300">
                                        <td className="py-4 font-medium">{order.id}</td>
                                        <td className="py-4 font-medium">{order.customer}</td>
                                        <td className="py-4">{order.product}</td>
                                        <td className="py-4 text-[#D4AF37]">{order.amount}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                                                order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    'bg-blue-500/10 text-blue-500'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {loading && <p className="text-center py-4 text-gray-500">Loading orders...</p>}
                    {!loading && recentOrders.length === 0 && <p className="text-center py-4 text-gray-500">No orders found.</p>}
                </div>
            </div>
        </div>
    );
}
