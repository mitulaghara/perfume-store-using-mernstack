import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, ShoppingBag, Plus, Minus, CreditCard, MapPin, User as UserIcon } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [checkoutData, setCheckoutData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });
    const navigate = useNavigate();

    const handleQuantityChange = (productId, currentQuantity, change) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (cart.length === 0) {
        return (
            <div className="pt-32 pb-12 flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
                <div className="bg-gray-100 p-8 rounded-full mb-6">
                    <ShoppingBag className="w-24 h-24 text-gray-300" />
                </div>
                <h2 className="text-3xl font-bold text-gray-400 mb-2">Your Cart is Empty</h2>
                <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
                <a href="/" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 transition">
                    Start Shopping
                </a>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-12 container mx-auto px-6 max-w-7xl">
            <h1 className="text-4xl font-bold text-dark mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-xl"
                                />
                                <div className="flex-1 w-full">
                                    <h3 className="text-lg font-bold text-dark mb-1">{item.name}</h3>
                                    <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                                    <p className="text-primary font-bold text-xl">₹{item.price}</p>
                                </div>
                                <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 w-full sm:w-auto">
                                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                                            className="p-2 hover:bg-gray-100 transition"
                                        >
                                            <Minus className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <span className="px-4 font-bold text-dark">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                                            className="p-2 hover:bg-gray-100 transition"
                                        >
                                            <Plus className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="font-bold text-xl text-dark">₹{((typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : Number(item.price)) * item.quantity).toLocaleString('en-IN')}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-red-500 hover:bg-red-50 p-3 rounded-xl transition"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-28">
                        <h3 className="text-2xl font-bold text-dark mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                <span className="font-semibold">₹{cartTotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="font-semibold text-green-600">FREE</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (GST 18%)</span>
                                <span className="font-semibold">₹{Math.round(cartTotal * 0.18).toLocaleString('en-IN')}</span>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between text-xl font-bold text-dark">
                                <span>Total</span>
                                <span>₹{(cartTotal + Math.round(cartTotal * 0.18)).toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all mb-4"
                        >
                            Proceed to Checkout
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
