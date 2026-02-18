import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
export default function ProfilePage() {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
    if (!user) {
        return null;
    }
    return (<main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">My Account</h1>
          <div className="mb-4">
            <div className="text-sm text-gray-600">Name</div>
            <div className="font-medium text-gray-800">{user.name}</div>
            {user.email && <div className="text-sm text-gray-600">{user.email}</div>}
            {user.guest && <div className="text-sm text-amber-600">Signed in as Guest</div>}
          </div>

          <div className="flex gap-3">
            <button className="btn-primary" onClick={() => navigate("/")}>
              Continue Shopping
            </button>

            <button className="btn-secondary" onClick={() => {
            signOut();
            navigate("/");
        }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </main>);
}
