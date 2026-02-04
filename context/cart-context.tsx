"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
    id: string; // Product ID
    slug: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size: string) => void;
    updateQuantity: (id: string, size: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedCart = localStorage.getItem("dion_cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("dion_cart", JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addItem = (newItem: CartItem) => {
        setItems((currentItems) => {
            const existingItemIndex = currentItems.findIndex(
                (item) => item.id === newItem.id && item.size === newItem.size
            );

            if (existingItemIndex > -1) {
                const updatedItems = [...currentItems];
                updatedItems[existingItemIndex].quantity += newItem.quantity;
                return updatedItems;
            }

            return [...currentItems, newItem];
        });
        setIsCartOpen(true);
    };

    const removeItem = (id: string, size: string) => {
        setItems((current) => current.filter((item) => !(item.id === id && item.size === size)));
    };

    const updateQuantity = (id: string, size: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((current) =>
            current.map((item) =>
                item.id === id && item.size === size ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
