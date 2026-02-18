import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const adminUser = import.meta.env.VITE_ADMIN_USERNAME ?? 'admin';
  const adminPass = import.meta.env.VITE_ADMIN_PASSWORD ?? 'password';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Very small delay to emulate checking credentials
    await new Promise((r) => setTimeout(r, 500));

    if (username === adminUser && password === adminPass) {
      // mark admin session (client-side only; for production use server-side session)
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAdmin', 'true');
      }
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
      <div className="w-full max-w-md bg-[#111111] border border-white/5 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Admin Sign In</h2>
        <p className="text-sm text-gray-400 mb-6">Enter admin credentials to access the dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 w-full px-3 py-2 rounded bg-black/40 outline-none" />
          </div>

          <div>
            <label className="text-xs text-gray-400">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-3 py-2 rounded bg-black/40 outline-none" />
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <div className="flex items-center justify-between gap-3">
            <button type="submit" disabled={loading} className="bg-[#D4AF37] text-black px-4 py-2 rounded font-semibold w-full">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">Note: This is a client-side admin gate for development. For production use a secure server-side login and proper authentication/authorization.</p>
        </form>
      </div>
    </div>
  );
}
