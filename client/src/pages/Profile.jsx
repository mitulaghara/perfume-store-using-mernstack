import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserAvatar from '../components/UserAvatar';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const { wishlist } = useWishlist();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProfile(formData);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            phone: user?.phone || '',
            address: user?.address || ''
        });
        setIsEditing(false);
    };

    return (
        <div className="pt-28 pb-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 max-w-7xl">
                <h1 className="text-4xl font-bold text-dark mb-8">My Profile</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                            <div className="relative inline-block mb-4">
                                {user?.avatar && !user.avatar.includes('ui-avatars.com') ? (
                                    <img
                                        src={user.avatar}
                                        alt={user?.name}
                                        className="w-32 h-32 rounded-full border-4 border-primary object-cover"
                                    />
                                ) : (
                                    <UserAvatar name={user?.name} className="w-32 h-32 text-5xl border-4 border-primary" />
                                )}
                                <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                            </div>
                            <h2 className="text-2xl font-bold text-dark mb-1">{user?.name}</h2>
                            <p className="text-gray-500 mb-4">{user?.email}</p>
                            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold inline-block">
                                {user?.role === 'admin' ? 'Admin' : 'Customer'}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-primary to-indigo-600 rounded-2xl p-6 text-white">
                            <h3 className="font-bold mb-2">Member Since</h3>
                            <p className="text-sm opacity-90">
                                {new Date(user?.createdAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Profile Details & Wishlist */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-dark">Personal Information</h3>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center space-x-2 text-primary hover:text-indigo-700 font-medium"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        <span>Edit</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center space-x-2 text-red-500 hover:text-red-700 font-medium"
                                    >
                                        <X className="w-4 h-4" />
                                        <span>Cancel</span>
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                                        <User className="w-4 h-4" />
                                        <span>Full Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition disabled:bg-gray-50 disabled:text-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                                        <Mail className="w-4 h-4" />
                                        <span>Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        disabled
                                        value={user?.email}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                                </div>

                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                                        <Phone className="w-4 h-4" />
                                        <span>Phone Number</span>
                                    </label>
                                    <input
                                        type="tel"
                                        disabled={!isEditing}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="Enter your phone number"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition disabled:bg-gray-50 disabled:text-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>Address</span>
                                    </label>
                                    <textarea
                                        disabled={!isEditing}
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="Enter your full address"
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition disabled:bg-gray-50 disabled:text-gray-600"
                                    ></textarea>
                                </div>

                                {isEditing && (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center space-x-2"
                                    >
                                        <Save className="w-5 h-5" />
                                        <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                                    </button>
                                )}
                            </form>
                        </div>

                        {/* Wishlist Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-dark flex items-center gap-3">
                                    <Heart className="w-6 h-6 text-red-500 fill-current" />
                                    My Wishlist
                                </h3>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                                    {wishlist.length} items
                                </span>
                            </div>

                            {wishlist.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-400 mb-4">Your wishlist is empty</p>
                                    <Link to="/shop" className="text-primary hover:text-indigo-700 font-semibold">
                                        Browse Products →
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {wishlist.map((item) => (
                                        <Link
                                            key={item._id}
                                            to={`/product/${item._id}`}
                                            className="group flex gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md hover:border-primary/30 transition-all"
                                        >
                                            <img
                                                src={item.image || item.images?.[0]}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-dark group-hover:text-primary transition line-clamp-1">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs text-gray-400 mb-2">{item.category}</p>
                                                <p className="text-lg font-bold text-primary">₹{item.price}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
