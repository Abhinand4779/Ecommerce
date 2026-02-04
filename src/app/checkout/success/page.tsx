"use client";

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white border border-gray-200 rounded-sm p-10 text-center">
          <h1 className="text-2xl font-semibold mb-4">Thank you! Your order has been placed.</h1>
          {orderId && <p className="text-sm text-gray-600 mb-6">Order ID: <span className="font-mono">{orderId}</span></p>}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/orders" className="px-5 py-3 bg-blue-600 text-white rounded-sm">View Orders</Link>
            <button className="px-5 py-3 border rounded-sm" onClick={() => router.push('/shop')}>Continue Shopping</button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
