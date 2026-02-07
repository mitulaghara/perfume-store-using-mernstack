import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingUp, Users, DollarSign, ShoppingBag } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { io } from 'socket.io-client';
import LoadingSpinner from '../../components/LoadingSpinner';

const socket = io('http://localhost:5001');

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalProducts: 0,
        recentOrders: [],
        recentProducts: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productsRes, ordersRes] = await Promise.all([
                    axios.get('http://localhost:5001/api/products'),
                    axios.get('http://localhost:5001/api/admin/orders')
                ]);

                const totalSales = ordersRes.data.reduce((acc, order) => acc + order.totalAmount, 0);

                setStats({
                    totalSales,
                    totalOrders: ordersRes.data.length,
                    totalProducts: productsRes.data.length,
                    recentOrders: ordersRes.data.slice(0, 5),
                    recentProducts: productsRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
                });
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        // Socket Listeners for Real-time Updates
        socket.on('newProduct', (newProduct) => {
            setStats(prev => ({
                ...prev,
                totalProducts: prev.totalProducts + 1,
                recentProducts: [newProduct, ...prev.recentProducts].slice(0, 5)
            }));
        });

        socket.on('orderUpdate', (updatedOrder) => {
            // Re-fetch everything for complexity or update specifically
            fetchData();
        });

        return () => {
            socket.off('newProduct');
            socket.off('orderUpdate');
        };
    }, []);

    const data = [
        { name: 'Jan', sales: 4000 },
        { name: 'Feb', sales: 3000 },
        { name: 'Mar', sales: 2000 },
        { name: 'Apr', sales: stats.totalSales }, // Dynamic
        { name: 'May', sales: 1890 },
        { name: 'Jun', sales: 2390 },
    ];

    if (loading) {
        return (
            <div className="pt-20">
                <LoadingSpinner message="Loading dashboard..." />
            </div>
        );
    }

    return (
        <div className="pb-20 md:pb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6 md:mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3 md:space-x-4">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs md:text-sm">Total Revenue</p>
                        <h3 className="text-xl md:text-2xl font-bold text-dark">₹{stats.totalSales.toLocaleString()}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Orders</p>
                        <h3 className="text-2xl font-bold text-dark">{stats.totalOrders}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="p-4 bg-green-50 text-green-600 rounded-xl">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Products</p>
                        <h3 className="text-2xl font-bold text-dark">{stats.totalProducts}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="p-4 bg-orange-50 text-orange-600 rounded-xl">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Active Users</p>
                        <h3 className="text-2xl font-bold text-dark">126</h3>
                    </div>
                </div>
            </div>



            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                {/* Sales Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg md:text-xl font-bold text-dark mb-4 md:mb-6">Sales Analytics</h3>
                    <div className="h-64 md:h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Products */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg md:text-xl font-bold text-dark mb-4 md:mb-6">Recently Added Products</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Product</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3 rounded-r-lg">Stock</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {stats.recentProducts && stats.recentProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-3">
                                                <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                                <div className="font-medium text-dark text-sm truncate max-w-[150px]">{product.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-bold text-gray-700">₹{product.price}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {(!stats.recentProducts || stats.recentProducts.length === 0) && (
                                    <tr>
                                        <td colSpan="3" className="text-center py-6 text-gray-400 text-sm">No products added yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AdminDashboard;
