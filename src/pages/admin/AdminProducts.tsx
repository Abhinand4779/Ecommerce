import React, { useEffect, useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    MoreVertical,
    X,
    Upload,
    Package
} from 'lucide-react';
import { api, Product, API_BASE_URL } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'rings',
        description: '',
        image: '',
        in_stock: true,
        is_featured: false
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await api.products.list();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching admin products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const token = localStorage.getItem("auth_token");
            if (!token) return;
            // Note: api.products.delete should be added if not exists
            await fetch(`${API_BASE_URL}/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleOpenModal = (product: Product | null = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                price: product.price.toString(),
                category: product.category || 'rings',
                description: product.description || '',
                image: product.image || '',
                in_stock: product.in_stock,
                is_featured: product.is_featured
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                price: '',
                category: 'rings',
                description: '',
                image: '',
                in_stock: true,
                is_featured: false
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("auth_token");
        if (!token) return;

        const payload = {
            ...formData,
            price: parseFloat(formData.price),
            original_price: parseFloat(formData.price), // Simplified
            discount: 0,
            rating: 5,
            review_count: 0,
            stock_quantity: 10
        };

        try {
            if (editingProduct) {
                await fetch(`${API_BASE_URL}/products/${editingProduct.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });
            } else {
                await fetch(`${API_BASE_URL}/products/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });
            }
            setIsModalOpen(false);
            fetchProducts();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-serif mb-2 text-white">Product Inventory</h1>
                    <p className="text-gray-400">Manage your exquisite collection.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="gold-button flex items-center gap-2 px-6 py-3"
                >
                    <Plus size={18} /> Add New Product
                </button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex-grow max-w-md relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full bg-[#141414] border border-white/5 rounded-lg pl-12 pr-4 py-3 focus:border-[#D4AF37]/50 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="bg-[#141414] border border-white/5 p-3 rounded-lg hover:border-[#D4AF37]/30 transition-all">
                    <Filter size={20} className="text-gray-400" />
                </button>
            </div>

            {/* Products Table */}
            <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-white/5">
                                <th className="px-8 py-5">Product Info</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5">Price</th>
                                <th className="px-8 py-5">Stock</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredProducts.map((p) => (
                                <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded bg-white/5 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={p.image || (p.images && p.images[0]) || '/images/placeholder.jpg'}
                                                    alt={p.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-sm text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">{p.name}</h4>
                                                <span className="text-[10px] uppercase tracking-widest text-gray-500">ID: #{p.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-sm text-gray-400 capitalize">{p.category}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-sm font-bold text-[#D4AF37]">₹{p.price.toLocaleString()}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`flex items-center gap-2 text-xs ${p.in_stock ? 'text-green-400' : 'text-red-400'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${p.in_stock ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-red-400'}`} />
                                            {p.in_stock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenModal(p)}
                                                className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#D4AF37] transition-all"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-red-400 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {loading && <div className="p-20 text-center text-gray-500">Loading products...</div>}
                {!loading && filteredProducts.length === 0 && (
                    <div className="p-20 text-center">
                        <Package size={48} className="mx-auto mb-4 text-gray-700" />
                        <p className="text-gray-500">No products found.</p>
                    </div>
                )}
            </div>

            {/* Product Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                <h3 className="text-xl font-serif">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="block text-sm text-gray-500 mb-2">Product Name</label>
                                        <input
                                            required
                                            className="w-full bg-[#0A0A0A] border border-white/5 rounded-lg px-4 py-3 outline-none focus:border-[#D4AF37]/50"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-2">Price (₹)</label>
                                        <input
                                            required
                                            type="number"
                                            className="w-full bg-[#0A0A0A] border border-white/5 rounded-lg px-4 py-3 outline-none focus:border-[#D4AF37]/50"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-2">Category</label>
                                        <select
                                            className="w-full bg-[#0A0A0A] border border-white/5 rounded-lg px-4 py-3 outline-none focus:border-[#D4AF37]/50 text-white"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="rings">Rings</option>
                                            <option value="necklaces">Necklaces</option>
                                            <option value="earrings">Earrings</option>
                                            <option value="bangles">Bangles</option>
                                            <option value="chains">Chains</option>
                                            <option value="anklets">Anklets</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm text-gray-500 mb-2">Description</label>
                                        <textarea
                                            rows={4}
                                            className="w-full bg-[#0A0A0A] border border-white/5 rounded-lg px-4 py-3 outline-none focus:border-[#D4AF37]/50 resize-none"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm text-gray-500 mb-2">Image URL</label>
                                        <div className="flex gap-4">
                                            <input
                                                className="flex-grow bg-[#0A0A0A] border border-white/5 rounded-lg px-4 py-3 outline-none focus:border-[#D4AF37]/50"
                                                value={formData.image}
                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                placeholder="/images/rings.jpg"
                                            />
                                            <button type="button" className="p-3 bg-white/5 rounded-lg text-gray-400 hover:text-white">
                                                <Upload size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 py-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 accent-[#D4AF37]"
                                                checked={formData.in_stock}
                                                onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                                            />
                                            <span className="text-sm">In Stock</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 accent-[#D4AF37]"
                                                checked={formData.is_featured}
                                                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                            />
                                            <span className="text-sm">Featured</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-grow py-4 border border-white/5 rounded-xl hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-grow gold-button text-black font-bold py-4 rounded-xl"
                                    >
                                        {editingProduct ? 'Save Changes' : 'Create Product'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
