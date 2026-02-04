"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInGuest } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      router.push("/profile");
    } catch (err) {
      setError("Sign in failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setLoading(true);
    await signInGuest();
    setLoading(false);
    router.push("/profile");
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button disabled={loading} className="btn-primary w-full">
            {loading ? "Signing in..." : "Sign In"}
          </button>
          {error && <div className="text-red-600 text-sm">{error}</div>}
        </form>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">Don't have an account? <a href="/register" className="text-amber-600">Register</a></div>
          <button onClick={handleGuest} disabled={loading} className="text-sm text-gray-700 underline">
            {loading ? "Starting..." : "Start as Guest"}
          </button>
        </div>
      </div>
    </main>
    </>
  );
}
