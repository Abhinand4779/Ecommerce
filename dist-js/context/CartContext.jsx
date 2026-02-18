import React, { createContext, useContext, useEffect, useState } from 'react';
const CartContext = createContext(undefined);
export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx)
        throw new Error('useCart must be used within CartProvider');
    return ctx;
};
export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const stored = localStorage.getItem('cart');
        if (stored)
            setItems(JSON.parse(stored));
        const fav = localStorage.getItem('favorites');
        if (fav)
            setFavorites(JSON.parse(fav));
    }, []);
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        localStorage.setItem('cart', JSON.stringify(items));
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [items, favorites]);
    const addToCart = (item) => {
        setItems((prev) => {
            const found = prev.find(p => p.id === item.id);
            if (found) {
                return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };
    const decreaseQuantity = (id) => {
        setItems((prev) => {
            const found = prev.find(p => p.id === id);
            if (!found)
                return prev;
            if (found.quantity <= 1)
                return prev.filter(p => p.id !== id);
            return prev.map(p => p.id === id ? { ...p, quantity: p.quantity - 1 } : p);
        });
    };
    const removeFromCart = (id) => setItems((prev) => prev.filter(p => p.id !== id));
    const clearCart = () => setItems([]);
    // Favorites handlers
    const toggleFavorite = (id) => {
        setFavorites((prev) => {
            if (prev.includes(id))
                return prev.filter(i => i !== id);
            return [...prev, id];
        });
    };
    const isFavorite = (id) => favorites.includes(id);
    return (<CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, decreaseQuantity, favorites, toggleFavorite, isFavorite }}>
            {children}
        </CartContext.Provider>);
};
