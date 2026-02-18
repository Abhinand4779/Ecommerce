

import React, { useState } from "react";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            // Placeholder: replace with API call
            await new Promise((res) => setTimeout(res, 800));
            setStatus('sent');
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">

            {/* Hero */}
            <section className="bg-blue-600 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 text-center text-white">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">Contact Us</h1>
                    <p className="text-lg opacity-90">We&apos;re here to help you find the perfect jewellery</p>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-lg border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        type="email"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    type="tel"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows={5}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Tell us more about your inquiry..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-sm transition-colors disabled:opacity-60"
                            >
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>

                            {status === 'sent' && <div className="text-sm text-green-600">Message sent — we&apos;ll get back to you shortly.</div>}
                            {status === 'error' && <div className="text-sm text-red-600">Failed to send message. Please try again.</div>}
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="font-bold text-lg text-gray-800 mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Phone className="text-blue-600 mt-1" size={20} />
                                    <div>
                                        <div className="font-medium text-gray-800">Phone</div>
                                        <div className="text-sm text-gray-600">+91 1800-123-4567</div>
                                        <div className="text-sm text-gray-600">+91 98765-43210</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Mail className="text-blue-600 mt-1" size={20} />
                                    <div>
                                        <div className="font-medium text-gray-800">Email</div>
                                        <div className="text-sm text-gray-600">support@aureliajewels.com</div>
                                        <div className="text-sm text-gray-600">sales@aureliajewels.com</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="text-blue-600 mt-1" size={20} />
                                    <div>
                                        <div className="font-medium text-gray-800">Address</div>
                                        <div className="text-sm text-gray-600">
                                            123 Jewellery Plaza,<br />
                                            MG Road, Bangalore - 560001<br />
                                            Karnataka, India
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Clock className="text-blue-600 mt-1" size={20} />
                                    <div>
                                        <div className="font-medium text-gray-800">Business Hours</div>
                                        <div className="text-sm text-gray-600">Mon - Sat: 10:00 AM - 8:00 PM</div>
                                        <div className="text-sm text-gray-600">Sunday: 11:00 AM - 6:00 PM</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-lg text-white">
                            <h3 className="font-bold text-lg mb-2">Need Immediate Help?</h3>
                            <p className="text-sm opacity-90 mb-4">
                                Our customer support team is available 24/7 to assist you
                            </p>
                            <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-sm hover:bg-gray-100 transition-colors">
                                Live Chat
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
