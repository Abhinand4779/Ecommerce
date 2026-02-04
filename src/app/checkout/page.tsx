"use client";

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<string>('gpay');
  const [processing, setProcessing] = useState(false);

  const subtotal = useMemo(() => items.reduce((acc, it) => acc + it.price * it.quantity, 0), [items]);
  const deliveryCharges = subtotal > 50000 ? 0 : (subtotal > 0 ? 500 : 0);
  const total = subtotal + deliveryCharges;

  const handlePlaceOrder = async () => {
    if (!user) {
      // redirect to profile/sign-in first
      router.push('/profile');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty. Add items before placing an order.');
      return;
    }

    setProcessing(true);

    // Simulate order creation
    const orderId = 'ORD-' + Math.random().toString(36).slice(2, 9).toUpperCase();

    // In a real app, send order + payment info to backend here.
    // For now, clear cart and redirect to success page with orderId
    clearCart();

    setTimeout(() => {
      router.push(`/checkout/success?orderId=${orderId}`);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              {items.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-gray-600 mb-4">Your cart is empty.</p>
                  <Link href="/shop" className="inline-block px-5 py-3 bg-blue-600 text-white rounded-sm">Start Shopping</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((it) => (
                    <div key={it.id} className="flex items-center gap-4 border-b border-gray-100 pb-3">
                      <img src={it.image} alt={it.name} className="w-20 h-20 object-cover rounded-sm border" />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-gray-800">{it.name}</h3>
                        <p className="text-xs text-gray-500">Qty: {it.quantity}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-900 font-semibold">₹{(it.price * it.quantity).toLocaleString()}</div>
                        {((it as { originalPrice?: number }).originalPrice) && (
                          <div className="text-xs text-gray-500 line-through">₹{((it as { originalPrice?: number }).originalPrice)!.toLocaleString()}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment selection */}
            <div className="mt-6 bg-white border border-gray-200 rounded-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="radio" name="payment" value="gpay" checked={paymentMethod === 'gpay'} onChange={() => setPaymentMethod('gpay')} />
                  <span className="text-sm">Google Pay</span>
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="payment" value="phonepe" checked={paymentMethod === 'phonepe'} onChange={() => setPaymentMethod('phonepe')} />
                  <span className="text-sm">PhonePe</span>
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                  <span className="text-sm">Credit / Debit Card</span>
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                  <span className="text-sm">Cash on Delivery</span>
                </label>
              </div>

              <div className="mt-6 border-t pt-4">
                <button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-sm disabled:opacity-60"
                >
                  {processing ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
                </button>
              </div>
            </div>
          </div>

          {/* Price details */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-sm p-6 sticky top-20">
              <h3 className="font-semibold text-gray-700 uppercase text-sm mb-4">Price Details</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span>Price ({items.length} items)</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Delivery Charges</span><span>{deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}</span></div>
                <div className="border-t pt-3 flex justify-between font-semibold text-base"><span>Total Amount</span><span>₹{total.toLocaleString()}</span></div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
