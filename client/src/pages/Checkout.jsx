import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, ShoppingBag, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [address, setAddress] = useState(user?.address || '');
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'online'

    // Helper to safely parse currency strings
    const parseCurrency = (value) => {
        if (typeof value === 'string') {
            return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
        }
        return Number(value) || 0;
    };

    // Calculate GST and totals safely
    const GST_RATE = 0.18; // 18% GST
    const subtotal = cart.reduce((total, item) => total + (parseCurrency(item.price) * item.quantity), 0);
    const gstAmount = Math.round(subtotal * GST_RATE);
    const grandTotal = subtotal + gstAmount;

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const orderData = {
                user: user.id || user._id,
                customerName: user.name,
                email: user.email,
                address: address,
                products: cart.map(item => ({
                    productId: item._id,
                    quantity: item.quantity,
                    price: parseCurrency(item.price)
                })),
                subtotal: subtotal,
                gst: gstAmount,
                totalAmount: grandTotal,
                paymentMethod: paymentMethod,
                status: 'Pending'
            };

            await axios.post('http://localhost:5001/api/orders', orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            await clearCart();
            toast.success("Order placed successfully!", {
                duration: 4000,
                icon: '🎉',
            });
            navigate('/orders');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.error || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto mt-28 text-center px-6 py-12">
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 max-w-lg mx-auto">
                    <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                    <h2 className="text-3xl font-bold text-dark mb-4">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8">Add some amazing products to get started!</p>
                    <button
                        onClick={() => navigate('/shop')}
                        className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-dark mb-2">Checkout</h1>
                    <p className="text-gray-500">Review your order and complete payment</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Shipping & Payment */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Information */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-3">
                                <Truck className="w-6 h-6 text-primary" />
                                Shipping Information
                            </h2>
                            <form onSubmit={handlePlaceOrder} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={user?.name}
                                            disabled
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={user?.email}
                                            disabled
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address *</label>
                                    <textarea
                                        required
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        rows="4"
                                        placeholder="Enter your complete shipping address with pin code"
                                    ></textarea>
                                </div>
                            </form>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-primary" />
                                Payment Method
                            </h2>
                            <div className="space-y-4">
                                <div
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod'
                                        ? 'border-primary bg-primary/5'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-primary' : 'border-gray-300'
                                            }`}>
                                            {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                                        </div>
                                        <Banknote className="w-8 h-8 text-green-600" />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-dark">Cash on Delivery</h3>
                                            <p className="text-sm text-gray-500">Pay when you receive your order</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    onClick={() => {
                                        toast("Payment Gateway Coming Soon!", {
                                            icon: '🚀',
                                            style: {
                                                borderRadius: '10px',
                                                background: '#333',
                                                color: '#fff',
                                            },
                                        });
                                        toast.error("Online payment is temporarily unavailable. Please select Cash on Delivery to proceed with your order.", {
                                            duration: 5000,
                                        });
                                    }}
                                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all border-gray-200 opacity-60 hover:bg-gray-50 bg-gray-50 group`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center border-gray-300`}>
                                            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                                        </div>
                                        <CreditCard className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-gray-500">Online Payment</h3>
                                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Coming Soon</span>
                                            </div>
                                            <p className="text-sm text-gray-400">Pay with UPI, Card, or Net Banking</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                            <h2 className="text-2xl font-bold text-dark mb-6">Order Summary</h2>

                            {/* Cart Items */}
                            <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                                {cart.map(item => (
                                    <div key={item._id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-dark text-sm line-clamp-1">{item.name}</h3>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            <p className="font-bold text-primary text-sm mt-1">₹{parseCurrency(item.price) * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 py-4 border-y border-gray-200">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>GST (18%)</span>
                                    <span className="font-semibold">₹{gstAmount}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
                                    <span className="font-semibold text-green-600">FREE</span>
                                </div>
                            </div>

                            {/* Grand Total */}
                            <div className="flex justify-between items-center mt-6 mb-6">
                                <span className="text-xl font-bold text-dark">Grand Total</span>
                                <span className="text-2xl font-bold text-primary">₹{grandTotal}</span>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading || !address.trim()}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : `Place Order - ₹${grandTotal}`}
                            </button>

                            <p className="text-xs text-gray-400 text-center mt-4">
                                By placing this order, you agree to our Terms & Conditions
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
