import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, User, Search, LogOut, UserCircle, Package, X, LayoutDashboard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import UserAvatar from './UserAvatar';
import axios from 'axios';

const Navbar = () => {
    const { cart } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    // Safety check for cart
    const safeCart = Array.isArray(cart) ? cart : [];
    const itemCount = safeCart.reduce((acc, item) => acc + (item?.quantity || 0), 0);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/products');
            if (Array.isArray(res.data)) {
                setAllProducts(res.data);
            }
        } catch (err) {
            console.error("Failed to fetch products for search", err);
        }
    };

    useEffect(() => {
        if (searchQuery.trim() && allProducts.length > 0) {
            const filtered = allProducts.filter(product =>
                (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.category || '').toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filtered);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, allProducts]);

    const handleSearchSelect = (productId) => {
        setSearchQuery('');
        setShowSearch(false);
        setSearchResults([]);
        navigate('/shop');
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 glass-nav bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button
                            className="lg:hidden text-dark"
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <Link to="/" className="text-2xl font-bold text-primary flex items-center">
                            <span className="text-dark">Perfume</span>Store
                        </Link>
                    </div>

                    {/* Desktop Search */}
                    <div className="hidden md:flex items-center relative">
                        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 w-64 lg:w-80">
                            <Search className="text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setShowSearch(true)}
                                className="bg-transparent outline-none text-sm flex-1"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-dark">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Search Results */}
                        {showSearch && searchResults.length > 0 && (
                            <div className="absolute top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-96 overflow-y-auto z-50">
                                <div className="p-2">
                                    <p className="text-xs text-gray-500 px-3 py-2">Found {searchResults.length} results</p>
                                    {searchResults.map((product) => (
                                        <button
                                            key={product._id}
                                            onClick={() => handleSearchSelect(product._id)}
                                            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition text-left"
                                        >
                                            <img
                                                src={product.image || 'https://via.placeholder.com/50'}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <p className="font-semibold text-dark text-sm line-clamp-1">{product.name}</p>
                                                <p className="text-xs text-gray-500">{product.category}</p>
                                            </div>
                                            <span className="font-bold text-primary">₹{product.price}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-3 md:space-x-6">
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="md:hidden text-gray-600 hover:text-primary transition"
                        >
                            <Search className="w-6 h-6" />
                        </button>

                        <Link to="/" className="hidden lg:block text-gray-600 hover:text-primary font-medium transition">Home</Link>
                        <Link to="/shop" className="hidden lg:block text-gray-600 hover:text-primary font-medium transition">Shop</Link>
                        <Link to="/orders" className="hidden lg:block text-gray-600 hover:text-primary font-medium transition">Orders</Link>

                        <Link to="/cart" className="relative text-gray-600 hover:text-primary transition">
                            <ShoppingCart className="w-6 h-6" />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-primary transition"
                                >
                                    {user?.avatar && !user.avatar.includes('ui-avatars.com') ? (
                                        <img
                                            src={user.avatar}
                                            alt={user?.name}
                                            className="w-8 h-8 rounded-full border-2 border-primary object-cover"
                                        />
                                    ) : (
                                        <UserAvatar name={user?.name} className="w-8 h-8 border-2 border-primary text-xs" />
                                    )}
                                    <span className="font-medium hidden lg:block">{user?.name?.split(' ')[0]}</span>
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                        <Link
                                            to="/profile"
                                            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <UserCircle className="w-4 h-4" />
                                            <span>My Profile</span>
                                        </Link>
                                        <Link
                                            to="/orders"
                                            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <Package className="w-4 h-4" />
                                            <span>My Orders</span>
                                        </Link>
                                        {user?.role === 'admin' && (
                                            <Link
                                                to="/admin"
                                                className="flex items-center space-x-2 px-4 py-2 hover:bg-indigo-50 text-primary font-bold"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                <span>Admin Panel</span>
                                            </Link>
                                        )}
                                        <hr className="my-2" />
                                        <button
                                            onClick={() => { logout(); setShowUserMenu(false); }}
                                            className="flex items-center space-x-2 px-4 py-2 hover:bg-red-50 text-red-600 w-full"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
                            >
                                <User className="w-5 h-5" />
                                <span className="hidden lg:block">Login</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 animate-slideInUp shadow-xl z-40">
                        <div className="flex flex-col p-4 space-y-4">
                            <Link to="/" onClick={() => setShowMobileMenu(false)} className="text-gray-700 font-medium hover:text-primary">Home</Link>
                            <Link to="/shop" onClick={() => setShowMobileMenu(false)} className="text-gray-700 font-medium hover:text-primary">Shop</Link>
                            <Link to="/orders" onClick={() => setShowMobileMenu(false)} className="text-gray-700 font-medium hover:text-primary">Orders</Link>
                            {isAuthenticated && (
                                <>
                                    <Link to="/profile" onClick={() => setShowMobileMenu(false)} className="text-gray-700 font-medium hover:text-primary">My Profile</Link>
                                    {user?.role === 'admin' && (
                                        <Link to="/admin" onClick={() => setShowMobileMenu(false)} className="text-primary font-bold flex items-center gap-2">
                                            <LayoutDashboard className="w-5 h-5" /> Admin Panel
                                        </Link>
                                    )}
                                    <button onClick={() => { logout(); setShowMobileMenu(false); }} className="text-red-500 font-medium text-left">Logout</button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    );
};

export default Navbar;
