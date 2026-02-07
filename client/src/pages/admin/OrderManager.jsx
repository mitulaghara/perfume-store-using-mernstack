import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, ChevronDown, Trash2 } from 'lucide-react';
import socket from '../../lib/socket';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
        socket.on('newResults', fetchOrders); // Refresh on new order
        socket.on('orderUpdate', (updated) => {
            setOrders(prev => prev.map(o => o._id === updated._id ? updated : o));
        });

        return () => {
            socket.off('newResults');
            socket.off('orderUpdate');
        };
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/admin/orders');
            setOrders(res.data);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        await axios.put(`http://localhost:5001/api/orders/${id}`, { status: newStatus });
    };

    const handleDeleteOrder = async (id) => {
        if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
            return;
        }
        try {
            await axios.delete(`http://localhost:5001/api/orders/${id}`);
            setOrders(prev => prev.filter(order => order._id !== id));
            alert('Order deleted successfully');
        } catch (err) {
            console.error('Failed to delete order:', err);
            alert('Failed to delete order');
        }
    };

    const toggleSelectOrder = (id) => {
        setSelectedOrders(prev =>
            prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedOrders(orders.map(o => o._id));
        } else {
            setSelectedOrders([]);
        }
    };

    const handleBulkDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete ${selectedOrders.length} selected orders? This action cannot be undone.`)) return;
        try {
            await axios.post('http://localhost:5001/api/admin/orders/bulk-delete', { orderIds: selectedOrders });
            setOrders(prev => prev.filter(o => !selectedOrders.includes(o._id)));
            setSelectedOrders([]);
            alert('Selected orders deleted successfully');
        } catch (err) {
            console.error('Failed to delete orders:', err);
            alert('Failed to delete selected orders');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-600';
            case 'Processing': return 'bg-blue-100 text-blue-600';
            case 'Shipped': return 'bg-purple-100 text-purple-600';
            case 'Delivered': return 'bg-green-100 text-green-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="pb-20 md:pb-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-dark">Order Management</h1>
                {selectedOrders.length > 0 && (
                    <button
                        onClick={handleBulkDelete}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm"
                    >
                        <Trash2 className="w-5 h-5" />
                        Delete {selectedOrders.length} Selected
                    </button>
                )}
            </div>

            {orders.length > 0 && (
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4 flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={selectedOrders.length === orders.length}
                        onChange={handleSelectAll}
                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="font-medium text-gray-600">Select All Orders</span>
                </div>
            )}

            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className={`bg-white p-4 md:p-6 rounded-xl border shadow-sm transition-all ${selectedOrders.includes(order._id) ? 'border-primary ring-1 ring-primary' : 'border-gray-100'}`}>
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 md:mb-6 border-b border-gray-100 pb-4">
                            <div className="flex items-start gap-4">
                                <input
                                    type="checkbox"
                                    checked={selectedOrders.includes(order._id)}
                                    onChange={() => toggleSelectOrder(order._id)}
                                    className="mt-1.5 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h3 className="font-bold text-base md:text-lg text-dark">Order #{order._id.slice(-6).toUpperCase()}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()} • {order.customerName}</p>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3 pl-9 md:pl-0">
                                <span className="font-bold text-lg md:text-xl text-dark">₹{order.totalAmount}</span>
                                <div className="relative group">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                        className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-3 pointer-events-none" />
                                </div>
                                <button
                                    onClick={() => handleDeleteOrder(order._id)}
                                    className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                                    title="Delete Order"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 pl-9">
                            {order.products?.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                    <img
                                        src={item.productId?.image || item.productId?.images?.[0]}
                                        alt=""
                                        className="w-12 h-12 rounded-lg object-cover bg-white border border-gray-200"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-dark text-sm">{item.productId?.name || 'Product'}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                                    </div>
                                    <span className="font-bold text-dark">₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-50 text-xs text-gray-400 pl-9">
                            Shipping Address: {order.address}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrders;
