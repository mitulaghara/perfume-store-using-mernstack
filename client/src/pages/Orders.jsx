import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import socket from '../lib/socket';
import { Package } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

import { useAuth } from '../context/AuthContext';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { token } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) fetchOrders();

        socket.on('newResults', (data) => {
            // Notification sound or alert could go here
            console.log(data.message);
        });

        socket.on('orderUpdate', (updatedOrder) => {
            setOrders(prevOrders => {
                const index = prevOrders.findIndex(o => o._id === updatedOrder._id);
                if (index > -1) {
                    const newOrders = [...prevOrders];
                    newOrders[index] = updatedOrder;
                    return newOrders;
                } else {
                    return [updatedOrder, ...prevOrders];
                }
            });
        });

        return () => {
            socket.off('newResults');
            socket.off('orderUpdate');
        };
    }, [token]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5001/api/orders', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(res.data);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        try {
            await axios.put(`http://localhost:5001/api/orders/${orderId}/cancel`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Order Cancelled Successfully");
            fetchOrders();
        } catch (err) {
            console.error(err);
            alert("Failed to cancel order");
        }
    };

    return (
        <div className="pt-28 pb-12 container mx-auto px-6 max-w-5xl">
            <h1 className="text-3xl font-bold text-dark mb-8">My Orders</h1>
            {loading ? (
                <LoadingSpinner message="Loading your orders..." />
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between md:items-center">
                            <div className="mb-4 md:mb-0">
                                <div className="flex items-center space-x-3 mb-2">
                                    <Package className="text-primary w-5 h-5" />
                                    <span className="font-bold text-dark">Order #{order._id.slice(-6).toUpperCase()}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                                            order.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleString()} • {order.products ? order.products.length : 0} Items</p>

                                {/* Product Thumbnails */}
                                <div className="flex -space-x-3 mt-4 overflow-hidden">
                                    {order.products?.map((item, idx) => (
                                        <div key={idx} className="inline-block h-10 w-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm" title={item.productId?.name}>
                                            <img
                                                src={item.productId?.image || item.productId?.images?.[0]}
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                {order.products?.length === 1 && (
                                    <p className="text-xs text-gray-400 mt-2 font-medium">{order.products[0].productId?.name}</p>
                                )}
                            </div>
                            <div className="text-right flex flex-col items-end justify-between py-1">
                                <div>
                                    <span className="block text-2xl font-bold text-primary">₹{order.totalAmount}</span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}</span>
                                </div>
                                {order.status === 'Pending' && (
                                    <button
                                        onClick={() => handleCancelOrder(order._id)}
                                        className="px-4 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition-colors mt-4"
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {orders.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">No orders found yet.</p>
                            <button
                                onClick={() => navigate('/shop')}
                                className="mt-4 text-primary font-bold hover:underline text-sm"
                            >
                                Start Shopping
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Orders;
