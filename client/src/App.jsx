import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/ProductManager';
import AdminOrders from './pages/admin/OrderManager';
import HelpCenter from './pages/HelpCenter';
import ShippingReturns from './pages/ShippingReturns';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext'; // Import WishlistProvider

import AuthPage from './pages/AuthPage';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-light font-sans text-dark">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/shop" element={<><Navbar /><Shop /></>} />

        <Route path="/product/:id" element={<><Navbar /><ProductDetail /></>} />
        <Route path="/help-center" element={<><Navbar /><HelpCenter /></>} />
        <Route path="/shipping-returns" element={<><Navbar /><ShippingReturns /></>} />
        <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicy /></>} />
        <Route path="/terms-conditions" element={<><Navbar /><TermsConditions /></>} />

        {/* Protected Routes */}
        <Route path="/cart" element={
          <ProtectedRoute>
            <Navbar /><Cart />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Navbar /><Checkout />
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <Navbar /><Orders />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Navbar /><Profile />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = React.useState(() => {
    // Only show splash if not already shown in this session
    return !sessionStorage.getItem('splashShown');
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
