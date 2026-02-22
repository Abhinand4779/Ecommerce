import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogin from '@/components/admin/AdminLogin';

import { useAuth } from '@/context/AuthContext';

export default function AdminLayout() {
    const { user, loading } = useAuth();

    if (loading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#D4AF37]">Loading Admin...</div>;

    if (!user?.is_admin) {
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
                    <div className="p-10">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
