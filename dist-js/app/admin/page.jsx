import React from 'react';
import { TrendingUp, ShoppingBag, Users, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
const stats = [
    { label: 'Total Sales', value: '$124,500', icon: <TrendingUp size={24}/>, trend: '+12.5%', isUp: true },
    { label: 'New Orders', value: '48', icon: <ShoppingBag size={24}/>, trend: '+8.2%', isUp: true },
    { label: 'Total Customers', value: '1,240', icon: <Users size={24}/>, trend: '-2.4%', isUp: false },
];
const recentOrders = [
    { id: '#1289', customer: 'Sophia Anderson', product: 'Royal Emerald Necklace', amount: '$4,500', status: 'Delivered' },
    { id: '#1290', customer: 'James Wilson', product: 'Solitaire Diamond Ring', amount: '$2,800', status: 'Pending' },
    { id: '#1291', customer: 'Emma Thompson', product: 'Intricate Gold Bangle', amount: '$3,200', status: 'Processing' },
    { id: '#1292', customer: 'Oliver Davis', product: 'Classic Pearl Earrings', amount: '$1,200', status: 'Delivered' },
];
export default function AdminDashboard() {
    return (<div className="flex flex-col gap-8">
            {/* Welcome Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif mb-2">Dashboard</h1>
                    <p className="text-gray-400">Manage your luxury empire with ease.</p>
                </div>
                <button className="gold-button flex items-center gap-2 text-sm px-6 py-2">
                    <Plus size={18}/> New Product
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (<motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-[#141414] border border-white/5 p-6 rounded-xl hover:border-[#D4AF37]/30 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-lg text-[#D4AF37]">
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${stat.isUp ? 'text-green-400' : 'text-red-400'}`}>
                                {stat.trend} {stat.isUp ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </motion.div>))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-[#141414] border border-white/5 p-8 rounded-xl">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-serif">Recent Orders</h3>
                        <button className="text-[#D4AF37] text-sm hover:underline">View All</button>
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
                                {recentOrders.map((order) => (<tr key={order.id} className="text-sm group">
                                        <td className="py-4 font-medium">{order.id}</td>
                                        <td className="py-4 text-gray-400">{order.customer}</td>
                                        <td className="py-4">{order.product}</td>
                                        <td className="py-4 text-[#D4AF37]">{order.amount}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-blue-500/10 text-blue-500'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-[#141414] border border-white/5 p-8 rounded-xl">
                    <h3 className="text-xl font-serif mb-8">Top Selling</h3>
                    <div className="flex flex-col gap-6">
                        {[
            { name: 'Solitaire Diamond Ring', sales: 42, image: '/images/rings.jpg' },
            { name: 'Classic Pearl Earrings', sales: 38, image: '/images/earrings.jpg' },
            { name: 'Royal Emerald Necklace', sales: 31, image: '/images/necklaces.jpg' },
        ].map((item, i) => (<div key={i} className="flex gap-4 items-center">
                                <div className="w-12 h-12 rounded bg-white/5 overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                                    <p className="text-xs text-gray-500">{item.sales} sold</p>
                                </div>
                                <div className="text-[#D4AF37] font-bold text-sm">
                                    #{i + 1}
                                </div>
                            </div>))}
                    </div>
                    <button className="w-full mt-10 py-3 border border-white/10 text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                        Inventory Report
                    </button>
                </div>
            </div>
        </div>);
}
