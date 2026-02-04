"use client";

import React, { useEffect, useState } from 'react';
import AdminSidebar from "@/components/admin/AdminSidebar";
import dynamic from 'next/dynamic';

const AdminLogin = dynamic(() => import('@/components/admin/AdminLogin'), { ssr: false });

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        // read admin session from localStorage on client
        setIsAdmin(!!localStorage.getItem('isAdmin'));

        // listen to storage changes from other tabs
        const onStorage = (e: StorageEvent) => {
            if (e.key === 'isAdmin') setIsAdmin(!!e.newValue);
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    if (!isAdmin) {
        return <AdminLogin />;
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
            <AdminSidebar />
            <main className="pl-64 min-h-screen">
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-10 sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-md z-40">
                    <h2 className="text-gray-400 font-medium">Overview</h2>
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-gray-400">Welcome back,</p>
                            <p className="text-sm font-semibold text-[#D4AF37]">Admin Master</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold">
                            AM
                        </div>
                    </div>
                </header>
                <div className="p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
