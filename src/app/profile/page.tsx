"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  if (!user) {
    if (typeof window !== "undefined") router.push("/login");
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
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
            <button
              className="btn-primary"
              onClick={() => router.push("/")}
            >
              Continue Shopping
            </button>

            <button
              className="btn-secondary"
              onClick={() => {
                signOut();
                router.push("/");
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
