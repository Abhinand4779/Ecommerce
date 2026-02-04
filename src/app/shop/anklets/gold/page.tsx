import React from 'react';
import Footer from '@/components/layout/Footer';
import SubcategoryGrid from '@/components/ui/SubcategoryGrid';
import { ChevronRight } from 'lucide-react';

export default function GoldAnkletsPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <ChevronRight size={14} />
            <span className="hover:text-blue-600 cursor-pointer">Anklets</span>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Gold Anklets</span>
          </div>
        </div>
      </div>

      <SubcategoryGrid category="anklets" sub="gold" />

      <Footer />
    </main>
  );
}
