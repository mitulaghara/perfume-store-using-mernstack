import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import {
    Plus, Sparkles, TrendingUp, Star, ShoppingBag, Zap, Award, Truck,
    ArrowRight, Heart, Smartphone, Watch, Headphones, Monitor, CheckCircle
} from 'lucide-react';
import socket from '../lib/socket';
import ProductSkeleton from '../components/ProductSkeleton';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();

        socket.on('newProduct', (product) => {
            setProducts(prev => [...prev, product]);
        });

        return () => socket.off('newProduct');
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5001/api/products');
            if (res.data && res.data.length === 0) {
                // If no products, try to seed or handle empty state
                await axios.get('http://localhost:5001/api/seed');
                const retry = await axios.get('http://localhost:5001/api/products');
                setProducts(retry.data);
                setFeaturedProducts(retry.data.slice(0, 4)); // Show top 4 as featured
            } else {
                setProducts(res.data);
                setFeaturedProducts(res.data.slice(0, 4));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { name: 'Luxury Perfumes', icon: Sparkles, color: 'bg-gold-100 text-yellow-600' },
        { name: "Men's Perfumes", icon: Zap, color: 'bg-blue-100 text-blue-600' },
        { name: "Women's Perfumes", icon: Heart, color: 'bg-pink-100 text-pink-600' },
        { name: 'Gift Sets', icon: ShoppingBag, color: 'bg-purple-100 text-purple-600' },
    ];

    return (
        <div className="bg-light min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-slideInUp">
                            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
                                <Sparkles className="w-5 h-5 text-yellow-500" />
                                <span className="font-semibold text-sm text-dark">New Collection 2026</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-dark leading-tight">
                                Discover the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                                    Essence of Luxury
                                </span>
                            </h1>

                            <p className="text-base md:text-xl text-gray-500 max-w-lg leading-relaxed">
                                Experience elegance at your fingertips. Shop the latest designer fragrances and exclusive scents with lightning-fast delivery.
                            </p>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                                <a href="#products" className="bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                                    Start Shopping <ArrowRight className="w-5 h-5" />
                                </a>
                                <a href="#categories" className="bg-white text-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-gray-50 transition-all border border-gray-200 shadow-sm text-center">
                                    Browse Categories
                                </a>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-4 text-xs md:text-sm font-medium text-gray-500">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" /> Free Shipping
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" /> 30-Day Returns
                                </div>
                            </div>
                        </div>

                        <div className="relative lg:h-[600px] flex items-center justify-center animate-float">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-purple-100 rounded-full blur-3xl opacity-60 transform scale-90"></div>
                            <img
                                src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80"
                                alt="Hero Perfume"
                                className="relative z-10 w-full max-w-lg object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                            />
                            {/* Floating Card */}
                            <div className="absolute bottom-10 -left-4 lg:left-0 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 animate-bounce-slow hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-dark">Best Seller</p>
                                        <p className="text-xs text-gray-500">Over 10k sold this week</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Strip */}
            <section className="py-10 bg-white border-y border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: Truck, title: "Free Delivery", desc: "Orders over ₹999" },
                            { icon: Zap, title: "Fast Shipping", desc: "2-3 Day Delivery" },
                            { icon: Award, title: "Top Quality", desc: "100% Original" },
                            { icon: ShoppingBag, title: "Easy Returns", desc: "7-Day Policy" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="bg-primary/10 p-3 rounded-full text-primary">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-dark">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section id="categories" className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Shop by Category</h2>
                        <p className="text-gray-500">Explore our wide range of premium products</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((cat, idx) => (
                            <Link key={idx} to={`/shop?category=${cat.name}`} className="group cursor-pointer bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center block">
                                <div className={`inline-block p-4 rounded-2xl mb-4 ${cat.color} group-hover:scale-110 transition-transform`}>
                                    <cat.icon className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-lg text-dark">{cat.name}</h3>
                                <p className="text-sm text-gray-400 mt-2">View Collection</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section id="products" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">Trending Now</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2">Featured Products</h2>
                        </div>
                        <a href="/shop" className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                            View All <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loading ? (
                            <ProductSkeleton count={4} />
                        ) : (
                            products.map((product) => (
                                <div key={product._id} className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col">
                                    <Link to={`/product/${product._id}`} className="block relative h-64 bg-gray-100 rounded-2xl overflow-hidden mb-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-dark shadow-sm">
                                            {product.category}
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="absolute bottom-4 right-4 bg-white text-dark p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white z-20"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>

                                    <div className="flex-1 flex flex-col">
                                        <Link to={`/product/${product._id}`}>
                                            <h3 className="font-bold text-lg text-dark mb-1 line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
                                        </Link>
                                        <div className="flex items-center gap-1 mb-3">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium text-dark">4.8</span>
                                            <span className="text-xs text-gray-400">(120 reviews)</span>
                                        </div>
                                        <div className="mt-auto flex items-center justify-between">
                                            <div>
                                                {product.regularPrice && product.sellPrice && product.regularPrice > product.sellPrice ? (
                                                    <>
                                                        <span className="text-xs text-gray-400 line-through">₹{product.regularPrice}</span>
                                                        <p className="text-xl font-bold text-primary">₹{product.sellPrice}</p>
                                                    </>
                                                ) : (
                                                    <p className="text-xl font-bold text-primary">₹{product.sellPrice || product.price}</p>
                                                )}
                                            </div>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                                                <Heart className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <a href="/shop" className="inline-flex items-center gap-2 bg-white text-dark px-6 py-3 rounded-full font-bold border border-gray-200 shadow-sm">
                            View All Products <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
