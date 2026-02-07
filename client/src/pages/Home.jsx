import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import {
    Plus, Sparkles, TrendingUp, Star, ShoppingBag, Zap, Award, Truck,
    ArrowRight, Heart, Smartphone, Watch, Headphones, Monitor, CheckCircle,
    Timer, ShieldCheck, CreditCard, Send
} from 'lucide-react';
import socket from '../lib/socket';
import ProductSkeleton from '../components/ProductSkeleton';

const Home = () => {
    const [products, setProducts] = useState([]);
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
                await axios.get('http://localhost:5001/api/seed');
                const retry = await axios.get('http://localhost:5001/api/products');
                setProducts(retry.data);
            } else {
                setProducts(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { name: 'Electronics', icon: Smartphone, color: 'from-blue-500 to-cyan-400', light: 'bg-blue-50' },
        { name: 'Accessories', icon: Watch, color: 'from-purple-500 to-indigo-400', light: 'bg-purple-50' },
        { name: 'Audio', icon: Headphones, color: 'from-pink-500 to-rose-400', light: 'bg-pink-50' },
        { name: 'Computers', icon: Monitor, color: 'from-orange-500 to-amber-400', light: 'bg-orange-50' },
    ];

    return (
        <div className="bg-white min-h-screen overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
                {/* Dynamic Background Elements */}
                <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-blob anim-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-100 rounded-full opacity-50 animate-rotate-slow"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 animate-slideInUp">
                            <div className="inline-flex items-center space-x-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                                <span className="font-bold text-xs uppercase tracking-wider text-primary">Limited Edition 2026</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-dark leading-[1.1] tracking-tight">
                                Future of <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-purple-600">
                                    Shopping.
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-500 max-w-lg leading-relaxed font-medium">
                                Step into a world of curated excellence. Mitul's Market brings you the finest selection of premium tech and lifestyle products.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5">
                                <a href="#products" className="group relative bg-dark text-white px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Explore Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </a>
                                <a href="#categories" className="bg-white text-dark px-10 py-5 rounded-2xl font-bold text-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center">
                                    Categories
                                </a>
                            </div>

                            <div className="flex items-center gap-8 pt-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-12 h-12 rounded-full border-4 border-white shadow-sm" alt="User" />
                                    ))}
                                    <div className="w-12 h-12 rounded-full border-4 border-white bg-primary text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                        10k+
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-gray-500">
                                    Joined by <span className="text-dark">10,000+</span> happy shoppers this month
                                </p>
                            </div>
                        </div>

                        <div className="relative animate-float">
                            <div className="relative z-10 p-4">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-400/20 rounded-[40px] blur-2xl transform rotate-6"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                                    alt="Hero"
                                    className="relative z-10 w-full rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform duration-700"
                                />
                            </div>

                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-6 -left-6 md:-left-12 glass-morphism p-6 rounded-3xl z-20 animate-bounce-slow">
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/30">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-dark">₹4.5Cr+</p>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Sales 2026</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -top-6 -right-6 glass-morphism p-5 rounded-3xl z-20 flex items-center gap-3">
                                <div className="bg-yellow-100 p-2 rounded-xl">
                                    <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                                </div>
                                <span className="font-bold text-dark italic">Premium Quality</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Strip */}
            <section className="py-24 bg-dark relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { icon: Truck, title: "Free Express Shipping", desc: "On all orders above ₹999" },
                            { icon: ShieldCheck, title: "Secure Payments", desc: "100% Protected transactions" },
                            { icon: Award, title: "Authentic Products", desc: "Directly from top brands" },
                            { icon: Timer, title: "24/7 Support", desc: "Dedicated help anytime" },
                        ].map((item, idx) => (
                            <div key={idx} className="group space-y-4">
                                <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Flash Sale Section */}
            <section className="py-24 bg-primary/5">
                <div className="container mx-auto px-6">
                    <div className="bg-primary rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-primary/20">
                        {/* Abstract Background */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 skew-x-12 translate-x-1/2"></div>

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-white space-y-6">
                                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                                    <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                                    <span className="font-bold text-sm uppercase tracking-tighter">Flash Sale is Live</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black">Up to 60% OFF on <br /> Premium Tech</h2>
                                <p className="text-primary-foreground/80 text-lg opacity-90 max-w-md">
                                    Limited time offer. Grabs your favorite electronics at prices you'll love.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="bg-white text-primary px-6 py-4 rounded-2xl font-black text-2xl flex flex-col items-center">
                                        <span>24</span>
                                        <span className="text-[10px] uppercase font-bold tracking-widest">Hrs</span>
                                    </div>
                                    <span className="text-3xl font-black text-white/50">:</span>
                                    <div className="bg-white text-primary px-6 py-4 rounded-2xl font-black text-2xl flex flex-col items-center">
                                        <span>59</span>
                                        <span className="text-[10px] uppercase font-bold tracking-widest">Min</span>
                                    </div>
                                    <span className="text-3xl font-black text-white/50">:</span>
                                    <div className="bg-white text-primary px-6 py-4 rounded-2xl font-black text-2xl flex flex-col items-center">
                                        <span>45</span>
                                        <span className="text-[10px] uppercase font-bold tracking-widest">Sec</span>
                                    </div>
                                </div>
                                <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all shadow-xl shadow-black/20">
                                    Shop the Sale
                                </button>
                            </div>
                            <div className="hidden lg:block">
                                <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80" className="w-full rounded-3xl shadow-2xl rotate-3" alt="Sale Product" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* categories with new Look */}
            <section id="categories" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center text-center mb-16 space-y-4">
                        <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Browse Hierarchy</span>
                        <h2 className="text-4xl md:text-5xl font-black text-dark">Top Categories</h2>
                        <div className="w-24 h-1.5 bg-primary rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, idx) => (
                            <Link key={idx} to={`/shop?category=${cat.name}`} className="group relative h-80 rounded-[35px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90 group-hover:scale-110 transition-transform duration-700`}></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white z-10">
                                    <div className="bg-white/20 p-6 rounded-[25px] backdrop-blur-md mb-6 group-hover:scale-110 transition-transform">
                                        <cat.icon className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-2">{cat.name}</h3>
                                    <p className="text-white/70 font-semibold text-sm">Explore Collection</p>
                                </div>
                                <div className="absolute bottom-0 right-0 p-8 transform translate-x-4 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                                    <div className="bg-white text-dark p-3 rounded-full">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section id="products" className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="space-y-4">
                            <span className="text-primary font-black uppercase tracking-widest text-sm">Curated Styles</span>
                            <h2 className="text-4xl md:text-5xl font-black text-dark">Trending Showcase</h2>
                        </div>
                        <Link to="/shop" className="bg-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-primary transition-all shadow-xl active:scale-95">
                            Shop All Products <ShoppingBag className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {loading ? (
                            <ProductSkeleton count={4} />
                        ) : (
                            products.slice(0, 8).map((product) => (
                                <div key={product._id} className="group flex flex-col h-full bg-white rounded-[40px] border border-gray-100 p-3 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500">
                                    <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-gray-50 mb-6">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-black text-dark shadow-sm uppercase tracking-tighter">
                                                {product.category}
                                            </div>
                                            {product.regularPrice > product.sellPrice && (
                                                <div className="bg-red-500 text-white px-4 py-1.5 rounded-2xl text-[10px] font-black shadow-sm uppercase tracking-tighter w-fit">
                                                    Sale -{Math.round((1 - product.sellPrice / product.regularPrice) * 100)}%
                                                </div>
                                            )}
                                        </div>

                                        <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="bg-white text-dark p-4 rounded-2xl hover:bg-primary hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0 duration-500 shadow-xl"
                                            >
                                                <ShoppingBag className="w-6 h-6" />
                                            </button>
                                            <Link
                                                to={`/product/${product._id}`}
                                                className="bg-primary text-white p-4 rounded-2xl hover:bg-dark transition-all transform translate-y-8 group-hover:translate-y-0 duration-500 delay-75 shadow-xl"
                                            >
                                                <Plus className="w-6 h-6" />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="px-3 pb-4 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <Link to={`/product/${product._id}`} className="hover:text-primary transition-colors flex-1">
                                                <h3 className="font-extrabold text-xl text-dark line-clamp-1">{product.name}</h3>
                                            </Link>
                                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs font-black text-dark">4.9</span>
                                            </div>
                                        </div>

                                        <div className="mt-auto flex items-end justify-between">
                                            <div className="space-y-0.5">
                                                {product.regularPrice > product.sellPrice ? (
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-gray-400 line-through font-bold">₹{product.regularPrice}</span>
                                                        <p className="text-2xl font-black text-primary">₹{product.sellPrice}</p>
                                                    </div>
                                                ) : (
                                                    <p className="text-2xl font-black text-primary">₹{product.sellPrice || product.price}</p>
                                                )}
                                            </div>
                                            <button className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                                                <Heart className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="bg-dark rounded-[50px] p-8 md:p-20 relative overflow-hidden text-center space-y-8">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

                        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Join our Circle</span>
                            <h2 className="text-4xl md:text-6xl font-black text-white italic">Never miss a drop.</h2>
                            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
                                Join 50k+ fashion & tech enthusiasts. Get exclusive access to secret sales and limited collection drops.
                            </p>

                            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-gray-600 focus:bg-white/10 focus:border-primary transition-all outline-none"
                                />
                                <button className="bg-primary text-white p-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-xl shadow-primary/20 active:scale-95">
                                    Subscribe <Send className="w-5 h-5" />
                                </button>
                            </form>
                            <p className="text-gray-500 text-xs font-bold">
                                By subscribing, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
