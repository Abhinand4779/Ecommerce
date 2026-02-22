import React, { useState } from 'react';
import {
    Gem,
    Plus,
    Edit2,
    Trash2,
    X,
    Save,
    Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminCategories() {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Rings', count: 12, image: '/images/rings.jpg' },
        { id: 2, name: 'Necklaces', count: 8, image: '/images/necklaces.jpg' },
        { id: 3, name: 'Earrings', count: 15, image: '/images/earrings.jpg' },
        { id: 4, name: 'Bangles', count: 6, image: '/images/bangles.jpg' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', image: '' });

    const handleOpenModal = (cat: any = null) => {
        if (cat) {
            setEditingCategory(cat);
            setFormData({ name: cat.name, image: cat.image });
        } else {
            setEditingCategory(null);
            setFormData({ name: '', image: '' });
        }
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Delete this category? Products won't be deleted but will lose their category tag.")) {
            setCategories(categories.filter(c => c.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            setCategories(categories.map(c =>
                c.id === editingCategory.id ? { ...c, ...formData } : c
            ));
        } else {
            const newCat = {
                id: Date.now(),
                ...formData,
                count: 0
            };
            setCategories([...categories, newCat]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-serif mb-2 text-white">Categories</h1>
                    <p className="text-gray-400">Define the luxury segments of your store.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="gold-button flex items-center gap-2 px-6 py-3"
                >
                    <Plus size={18} /> New Category
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <motion.div
                        layout
                        key={cat.id}
                        className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#D4AF37]/30 transition-all shadow-xl"
                    >
                        <div className="h-40 bg-zinc-900 relative overflow-hidden">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                            <div className="absolute bottom-4 left-6 z-20">
                                <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">{cat.name}</h3>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">{cat.count} Products</p>
                            </div>
                        </div>
                        <div className="p-4 flex justify-between items-center bg-[#0D0D0D]">
                            <button
                                onClick={() => handleOpenModal(cat)}
                                className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-blue-400 transition-all flex items-center gap-2 text-xs uppercase font-bold tracking-widest"
                            >
                                <Edit2 size={14} /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(cat.id)}
                                className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-red-500 transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Category Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#1A1A1A]">
                                <h3 className="text-xl font-serif text-[#D4AF37]">{editingCategory ? 'Edit Category' : 'New Category'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Category Name</label>
                                    <input
                                        required
                                        autoFocus
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37]/50 transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Diamond Collection"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Image URL / Cover</label>
                                    <input
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-[#D4AF37]/50 transition-all text-sm"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="URL to your collection image"
                                    />
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button
                                        type="submit"
                                        className="flex-grow gold-button text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <Save size={18} /> {editingCategory ? 'Update Collection' : 'Create Category'}
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
