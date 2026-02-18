import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Footer from '@/components/layout/Footer';
import SubcategoryGrid from '@/components/ui/SubcategoryGrid';
import { ChevronRight } from 'lucide-react';
export default function SilverAnkletsPage() {
    return (_jsxs("main", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "bg-white border-b border-gray-200", children: _jsx("div", { className: "container mx-auto px-4 sm:px-6 py-3", children: _jsxs("div", { className: "flex items-center gap-2 text-xs sm:text-sm text-gray-600", children: [_jsx("span", { className: "hover:text-blue-600 cursor-pointer", children: "Home" }), _jsx(ChevronRight, { size: 14 }), _jsx("span", { className: "hover:text-blue-600 cursor-pointer", children: "Anklets" }), _jsx(ChevronRight, { size: 14 }), _jsx("span", { className: "text-gray-900 font-medium", children: "Silver Anklets" })] }) }) }), _jsx(SubcategoryGrid, { category: "anklets", sub: "silver" }), _jsx(Footer, {})] }));
}
