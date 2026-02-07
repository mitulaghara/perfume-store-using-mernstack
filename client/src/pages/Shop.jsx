import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Plus, Filter, SlidersHorizontal, Heart } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductSkeleton from '../components/ProductSkeleton';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
    const [sortBy, setSortBy] = useState('default');
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterAndSort();
    }, [selectedCategory, sortBy, products]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5001/api/products');
            setProducts(res.data);
            setFilteredProducts(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filterAndSort = () => {
        let filtered = selectedCategory === 'All'
            ? products
            : products.filter(p => p.category === selectedCategory);

        if (sortBy === 'price-low') {
            filtered = [...filtered].sort((a, b) => {
                const priceA = a.sellPrice || Number(a.price) || 0;
                const priceB = b.sellPrice || Number(b.price) || 0;
                return priceA - priceB;
            });
        } else if (sortBy === 'price-high') {
            filtered = [...filtered].sort((a, b) => {
                const priceA = a.sellPrice || Number(a.price) || 0;
                const priceB = b.sellPrice || Number(b.price) || 0;
                return priceB - priceA;
            });
        } else if (sortBy === 'name') {
            filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredProducts(filtered);
    };

    return (
        <div className="pt-28 pb-12 container mx-auto px-6">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-dark mb-2">Shop All Products</h1>
                <p className="text-gray-500">Browse our complete collection</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full font-medium transition ${selectedCategory === cat
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <SlidersHorizontal className="w-5 h-5 text-gray-400" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                        >
                            <option value="default">Sort By</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name">Name: A to Z</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            {!loading && (
                <div className="mb-6 text-gray-600">
                    Showing <span className="font-bold text-dark">{filteredProducts.length}</span> products
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {loading ? (
                    <ProductSkeleton count={8} />
                ) : (
                    filteredProducts.map((product) => {
                        const inWishlist = isInWishlist(product._id);
                        return (
                            <div key={product._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl product-card border border-gray-100 group relative">
                                <Link to={`/product/${product._id}`} className="block relative h-64 overflow-hidden">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold">
                                        {product.stock} in stock
                                    </div>
                                </Link>

                                <div className="absolute bottom-32 right-4 flex flex-col space-y-2 z-20">
                                    <button
                                        onClick={() => inWishlist ? removeFromWishlist(product._id) : addToWishlist(product)}
                                        className={`p-3 rounded-full shadow-lg transition-colors ${inWishlist ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'}`}
                                        title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                                    >
                                        <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                                    </button>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-white p-3 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-colors"
                                        title="Add to Cart"
                                    >
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="p-6">
                                    <span className="text-xs text-secondary font-bold uppercase tracking-wider">{product.category}</span>
                                    <Link to={`/product/${product._id}`}>
                                        <h3 className="text-lg font-bold text-dark mt-2 mb-1 hover:text-primary transition-colors">{product.name}</h3>
                                    </Link>
                                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <div>
                                            {product.regularPrice && product.sellPrice && product.regularPrice > product.sellPrice ? (
                                                <>
                                                    <span className="text-xs text-gray-400 line-through block">₹{product.regularPrice}</span>
                                                    <span className="text-xl font-extrabold text-dark">₹{product.sellPrice}</span>
                                                </>
                                            ) : (
                                                <span className="text-xl font-extrabold text-dark">₹{product.sellPrice || product.price}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-gray-400 text-lg">No products found in this category</p>
                </div>
            )}
        </div>
    );
};

export default Shop;
