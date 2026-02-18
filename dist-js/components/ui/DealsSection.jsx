import React from 'react';
import { Link } from 'react-router-dom';
const deals = [
    {
        title: 'Best of Gold Jewellery',
        discount: 'Up to 40% Off',
        image: '/images/rings.jpg',
        href: '/shop?category=gold'
    },
    {
        title: 'Diamond Collection',
        discount: 'Min. 30% Off',
        image: '/images/necklaces.jpg',
        href: '/shop?category=diamond'
    },
    {
        title: 'Wedding Specials',
        discount: 'Starting ₹15,999',
        image: '/images/bracelets.jpg',
        href: '/shop?category=wedding'
    },
    {
        title: 'Trending Earrings',
        discount: 'From ₹2,499',
        image: '/images/earrings.jpg',
        href: '/shop?category=earrings'
    },
];
const DealsSection = () => {
    return (<section className="bg-white py-6">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Best Deals on Jewellery</h2>
                    <Link to="/shop" className="text-blue-600 text-sm font-medium hover:underline">
                        See All
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    {deals.map((deal, index) => (<Link key={index} to={deal.href} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                            <div className="aspect-square bg-gray-50 overflow-hidden">
                                <img src={deal.image} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                            </div>
                            <div className="p-3 sm:p-4">
                                <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-1 line-clamp-1">
                                    {deal.title}
                                </h3>
                                <p className="text-green-600 font-bold text-xs sm:text-sm">{deal.discount}</p>
                            </div>
                        </Link>))}
                </div>
            </div>
        </section>);
};
export default DealsSection;
