

import React, { createContext, useContext, useEffect, useState } from 'react';

type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

type CartContextValue = {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    decreaseQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    // Favorites / Wishlist
    favorites: number[];
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const stored = localStorage.getItem('cart');
        if (stored) setItems(JSON.parse(stored));
        const fav = localStorage.getItem('favorites');
        if (fav) setFavorites(JSON.parse(fav));
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('cart', JSON.stringify(items));
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [items, favorites]);

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setItems((prev) => {
            const found = prev.find(p => p.id === item.id);
            if (found) {
                return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const decreaseQuantity = (id: number) => {
        setItems((prev) => {
            const found = prev.find(p => p.id === id);
            if (!found) return prev;
            if (found.quantity <= 1) return prev.filter(p => p.id !== id);
            return prev.map(p => p.id === id ? { ...p, quantity: p.quantity - 1 } : p);
        });
    };

    const removeFromCart = (id: number) => setItems((prev) => prev.filter(p => p.id !== id));

    const clearCart = () => setItems([]);

    // Favorites handlers
    const toggleFavorite = (id: number) => {
        setFavorites((prev) => {
            if (prev.includes(id)) return prev.filter(i => i !== id);
            return [...prev, id];
        });
    };

    const isFavorite = (id: number) => favorites.includes(id);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, decreaseQuantity, favorites, toggleFavorite, isFavorite }}>
            {children}
        </CartContext.Provider>
    );
};
