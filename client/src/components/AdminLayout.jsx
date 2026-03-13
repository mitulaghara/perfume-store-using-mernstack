import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Menu, X, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-dark text-white p-4 flex justify-between items-center z-50">
                <h2 className="text-xl font-bold">Krisha's<span className="text-primary">Market</span></h2>
                <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {showMobileMenu && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setShowMobileMenu(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`w-64 bg-dark text-white fixed h-full z-50 transition-transform duration-300 ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 flex flex-col`}>
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-white">Krisha's<span className="text-primary">Market</span></h2>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Admin Dashboard</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavLink
                        to="/admin"
                        end
                        onClick={() => setShowMobileMenu(false)}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`
                        }
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/admin/products"
                        onClick={() => setShowMobileMenu(false)}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`
                        }
                    >
                        <Package className="w-5 h-5" />
                        <span>Products</span>
                    </NavLink>
                    <NavLink
                        to="/admin/orders"
                        onClick={() => setShowMobileMenu(false)}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`
                        }
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Orders</span>
                    </NavLink>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 text-red-400 hover:text-red-300 w-full px-4 py-2 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-3 text-gray-400 hover:text-white w-full px-4 py-2 mt-2 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Shop</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
                <Outlet />
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-3 z-40">
                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `flex flex-col items-center space-y-1 px-4 py-2 ${isActive ? 'text-primary' : 'text-gray-400'}`
                    }
                >
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="text-xs font-medium">Dashboard</span>
                </NavLink>
                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        `flex flex-col items-center space-y-1 px-4 py-2 ${isActive ? 'text-primary' : 'text-gray-400'}`
                    }
                >
                    <Package className="w-5 h-5" />
                    <span className="text-xs font-medium">Products</span>
                </NavLink>
                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        `flex flex-col items-center space-y-1 px-4 py-2 ${isActive ? 'text-primary' : 'text-gray-400'}`
                    }
                >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="text-xs font-medium">Orders</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default AdminLayout;
