import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart, ShoppingBag, Truck, Shield, ArrowLeft, Star, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('description');
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/products/${id}`);
                setProduct(res.data);
                console.log("Full Product Data received from server:", res.data);
                if (res.data.specifications) {
                    console.log("Product Specifications:", res.data.specifications);
                    console.log("Type of specifications:", typeof res.data.specifications);
                }
                if (res.data.images && res.data.images.length > 0) {
                    setSelectedImage(res.data.images[0]);
                } else {
                    setSelectedImage(res.data.image);
                }
            } catch (err) {
                console.error("Failed to fetch product", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleWishlistClick = () => {
        if (!product) return;
        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
    );

    if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

    const inWishlist = isInWishlist(product._id);
    const images = product.images && product.images.length > 0 ? product.images : [product.image];

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Breadcrumb / Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center text-gray-500 hover:text-primary transition-colors font-medium group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    Back to Shop
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Column: Image Gallery */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex items-center justify-center relative overflow-hidden group h-[500px]">
                            <div className="absolute top-4 right-4 z-10">
                                <button className="p-3 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition-colors text-gray-400 hover:text-primary">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                            <img
                                src={selectedImage || product.image}
                                alt={product.name}
                                className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {images.map((img, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedImage(img)}
                                        className={`bg-white rounded-xl p-2 border-2 cursor-pointer transition-all ${selectedImage === img ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}
                                    >
                                        <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-20 object-contain" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-2 flex items-center space-x-2">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {product.category}
                            </span>
                            <div className="flex items-center text-yellow-400 text-sm">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="ml-1 text-gray-600 font-bold">4.8</span>
                                <span className="ml-1 text-gray-400">(124 reviews)</span>
                            </div>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-extrabold text-dark tracking-tight mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-end gap-4 mb-8">
                            <span className="text-4xl font-bold text-primary">₹{product.sellPrice || product.price}</span>
                            {product.regularPrice && product.sellPrice && product.regularPrice > product.sellPrice && (
                                <>
                                    <span className="text-xl text-gray-400 line-through mb-1">₹{product.regularPrice}</span>
                                    <span className="mb-2 text-green-500 text-sm font-bold bg-green-50 px-2 py-0.5 rounded">
                                        {Math.round(((product.regularPrice - product.sellPrice) / product.regularPrice) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Variants (Mock) */}


                        {/* Actions */}
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={() => {
                                    addToCart(product);
                                    toast.success(`${product.name} added to cart!`);
                                }}
                                disabled={product.stock === 0}
                                className="flex-1 bg-primary text-white py-4 px-8 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-primary/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                <ShoppingBag className="w-6 h-6" />
                                {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                            </button>
                            <button
                                onClick={handleWishlistClick}
                                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${inWishlist
                                    ? 'border-red-500 bg-red-50 text-red-500'
                                    : 'border-gray-200 hover:border-red-500 hover:text-red-500 text-gray-400'
                                    }`}
                            >
                                <Heart className={`w-7 h-7 ${inWishlist ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-50 shadow-sm">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-dark text-sm">Free Delivery</p>
                                    <p className="text-xs text-gray-500">Orders over ₹999</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-50 shadow-sm">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-dark text-sm">2 Year Warranty</p>
                                    <p className="text-xs text-gray-500">Full coverage</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Tabs */}
                <div className="mt-20">
                    <div className="flex border-b border-gray-200 mb-8">
                        {['description', 'specifications', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 px-8 font-bold text-lg capitalize transition-colors relative ${activeTab === tab
                                    ? 'text-primary'
                                    : 'text-gray-400 hover:text-dark'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 min-h-[300px]">
                        {activeTab === 'description' && (
                            <div className="prose max-w-none text-gray-600">
                                <h3 className="text-2xl font-bold text-dark mb-4">Product Description</h3>
                                <p className="mb-4">{product.description}</p>
                            </div>
                        )}
                        {activeTab === 'specifications' && (
                            <div>
                                <h3 className="text-2xl font-bold text-dark mb-6">Specifications</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {product.specifications && (typeof product.specifications === 'object') ? (
                                        Object.keys(product.specifications).length > 0 ? (
                                            Object.entries(product.specifications).map(([key, value], i) => (
                                                <div key={i} className="flex justify-between py-3 border-b border-gray-100">
                                                    <span className="font-medium text-gray-500">{key}</span>
                                                    <span className="font-bold text-dark">{String(value)}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-2 text-center py-8 text-gray-400">
                                                <p>No specifications available for this product.</p>
                                            </div>
                                        )
                                    ) : (
                                        <div className="col-span-2 text-center py-8 text-gray-400">
                                            <p>No specifications data found. Please try adding them in the Admin Panel.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div>
                                <h3 className="text-2xl font-bold text-dark mb-6">Customer Reviews</h3>
                                <div className="space-y-6">
                                    {[1, 2].map((review) => (
                                        <div key={review} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                                </div>
                                                <span className="font-bold text-dark">Amazing Product!</span>
                                            </div>
                                            <p className="text-gray-600 mb-2">"Absolutely love this! The quality is outstanding and it arrived much faster than expected."</p>
                                            <p className="text-xs text-gray-400">- Verified Buyer, 2 days ago</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
