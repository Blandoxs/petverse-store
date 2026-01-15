'use client';

import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Search, Menu, X, ChevronRight, Truck, Shield, Headphones } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  img: string;
  badge: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Premium Organic Dog Food",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviews: 234,
    category: "Food",
    img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Luxury Cat House Tower",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.9,
    reviews: 189,
    category: "Furniture",
    img: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600&q=80",
    badge: "Premium"
  },
  {
    id: 3,
    name: "Interactive Smart Ball",
    price: 34.99,
    rating: 4.7,
    reviews: 456,
    category: "Toys",
    img: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=600&q=80",
    badge: "New"
  },
  {
    id: 4,
    name: "Deluxe Pet Carrier",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviews: 312,
    category: "Travel",
    img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80",
    badge: "Sale"
  },
  {
    id: 5,
    name: "Gourmet Cat Treats",
    price: 24.99,
    rating: 4.9,
    reviews: 567,
    category: "Food",
    img: "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=600&q=80",
    badge: "Top Rated"
  },
  {
    id: 6,
    name: "Orthopedic Pet Bed",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviews: 423,
    category: "Beds",
    img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80",
    badge: "Comfort+"
  },
  {
    id: 7,
    name: "GPS Pet Tracker",
    price: 59.99,
    rating: 4.7,
    reviews: 298,
    category: "Tech",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    badge: "Tech"
  },
  {
    id: 8,
    name: "Natural Grooming Kit",
    price: 44.99,
    rating: 4.6,
    reviews: 178,
    category: "Grooming",
    img: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=600&q=80",
    badge: "Eco"
  }
];

const categories = ["All", "Food", "Toys", "Furniture", "Travel", "Tech", "Grooming", "Beds"];

export default function PetVerse() {
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      "Best Seller": "bg-amber-500",
      "Premium": "bg-purple-500",
      "New": "bg-emerald-500",
      "Sale": "bg-rose-500",
      "Top Rated": "bg-blue-500",
      "Comfort+": "bg-indigo-500",
      "Tech": "bg-cyan-500",
      "Eco": "bg-green-600"
    };
    return colors[badge] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 to-cyan-500 p-3 rounded-2xl">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  PetVerse
                </h1>
                <p className="text-xs text-slate-500 font-medium">Premium Pet Care</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-slate-700 hover:text-emerald-600 font-semibold transition">Shop</a>
              <a href="#" className="text-slate-700 hover:text-emerald-600 font-semibold transition">Dogs</a>
              <a href="#" className="text-slate-700 hover:text-emerald-600 font-semibold transition">Cats</a>
              <a href="#" className="text-slate-700 hover:text-emerald-600 font-semibold transition">About</a>
              <a href="#" className="text-slate-700 hover:text-emerald-600 font-semibold transition">Contact</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-slate-100 rounded-xl transition"
              >
                <Search className="w-5 h-5 text-slate-600" />
              </button>
              
              <button className="relative p-2 hover:bg-slate-100 rounded-xl transition">
                <Heart className="w-5 h-5 text-slate-600" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button className="relative p-2 hover:bg-slate-100 rounded-xl transition">
                <ShoppingCart className="w-5 h-5 text-slate-600" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-6 py-3 rounded-2xl bg-slate-100 border-2 border-transparent focus:border-emerald-400 focus:bg-white outline-none transition"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 animate-in slide-in-from-top duration-300">
            <nav className="px-4 py-6 flex flex-col gap-4">
              <a href="#" className="px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 font-semibold rounded-xl transition">Shop</a>
              <a href="#" className="px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 font-semibold rounded-xl transition">Dogs</a>
              <a href="#" className="px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 font-semibold rounded-xl transition">Cats</a>
              <a href="#" className="px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 font-semibold rounded-xl transition">About</a>
              <a href="#" className="px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 font-semibold rounded-xl transition">Contact</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-cyan-600/10 to-blue-600/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  ✨ New Collection 2024
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                Everything Your
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Furry Friend
                </span>
                <br />
                Deserves
              </h1>

              <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                Premium quality products crafted with love for your pets. From nutrition to comfort, we've got everything covered.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <span className="flex items-center gap-2">
                    Shop Now
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </span>
                </button>
                
                <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:border-emerald-500 hover:text-emerald-600 hover:shadow-lg transition-all duration-300">
                  Learn More
                </button>
              </div>

              <div className="flex items-center gap-8 pt-8">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 border-4 border-white"></div>
                  ))}
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">10,000+</p>
                  <p className="text-sm text-slate-500">Happy Customers</p>
                </div>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right duration-700">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-[3rem] blur-3xl opacity-30 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&q=80"
                alt="Happy pets"
                className="relative rounded-[3rem] shadow-2xl w-full h-auto"
              />
              
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Limited Offer</p>
                    <p className="text-2xl font-black text-slate-800">30% OFF</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">First Purchase</p>
                    <p className="text-lg font-bold text-emerald-600">Use: FIRST30</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 rounded-2xl hover:bg-slate-50 transition">
              <div className="p-4 bg-emerald-100 rounded-2xl">
                <Truck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Free Shipping</h3>
                <p className="text-sm text-slate-600">On orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-2xl hover:bg-slate-50 transition">
              <div className="p-4 bg-cyan-100 rounded-2xl">
                <Shield className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Safe Products</h3>
                <p className="text-sm text-slate-600">100% pet-safe guaranteed</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-2xl hover:bg-slate-50 transition">
              <div className="p-4 bg-blue-100 rounded-2xl">
                <Headphones className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">24/7 Support</h3>
                <p className="text-sm text-slate-600">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black text-slate-800">
              Featured Products
            </h2>
            <p className="text-slate-600 font-medium">
              {filteredProducts.length} items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`${getBadgeColor(product.badge)} text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg`}>
                    {product.badge}
                  </span>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(product.id)
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-slate-400'
                    }`}
                  />
                </button>

                {/* Image */}
                <div className="relative overflow-hidden bg-slate-100 aspect-square">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-bold text-slate-800 mt-1 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600 font-medium">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-800">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            <div className="space-y-4">
              <h3 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                PetVerse
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Your trusted partner in premium pet care. Quality products for pets who deserve the best.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition">Dogs</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Cats</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Accessories</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Sale</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Contact</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-slate-400 mb-4">Get special offers and updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 focus:border-emerald-500 outline-none transition"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-bold hover:shadow-lg transition">
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2024 PetVerse. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition">Terms</a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Notification */}
      {cart.length > 0 && (
        <div className="fixed bottom-8 right-8 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom duration-300 z-50">
          <p className="font-bold">✓ Item added to cart!</p>
          <p className="text-sm opacity-90">{cart.length} item(s) in cart</p>
        </div>
      )}
    </div>
  );
}