import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/services/api";
import { ShoppingBag, LogOut, ArrowRight } from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      try {
        const data = await api.orders.list(token);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* User Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {user.full_name?.[0] || user.email[0].toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.full_name || 'Jewellery Lover'}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
                {user.is_admin && (
                  <span className="mt-2 px-3 py-1 bg-amber-600 text-white text-[10px] rounded-full uppercase font-bold tracking-wider">Admin</span>
                )}
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => navigate('/shop')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <span className="flex items-center gap-3"><ShoppingBag size={18} /> Shop More</span>
                  <ArrowRight size={16} />
                </button>
                {user.is_admin && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-amber-700 font-medium"
                  >
                    <span className="flex items-center gap-3">Admin Dashboard</span>
                    <ArrowRight size={16} />
                  </button>
                )}
                <button
                  onClick={() => { signOut(); navigate('/'); }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Order History</h3>
                <span className="text-sm text-gray-500">{orders.length} orders total</span>
              </div>

              <div className="p-0">
                {loading ? (
                  <div className="p-10 text-center text-gray-400">Loading your luxury purchases...</div>
                ) : orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                          <th className="px-6 py-4">Order ID</th>
                          <th className="px-6 py-4">Total</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 font-bold">₹{order.total?.toLocaleString()}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-blue-100 text-blue-700'
                                }`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                      <ShoppingBag size={24} />
                    </div>
                    <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                    <button
                      onClick={() => navigate('/shop')}
                      className="gold-button px-6 py-2 text-sm"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
