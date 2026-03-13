import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, ArrowRight, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-20 pb-10 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="text-3xl font-bold flex items-center gap-2">
                            <span className="text-primary">Krisha's</span>Market
                        </Link>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Your premium destination for quality tech and lifestyle products. We believe in quality, style, and exceptional service.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://github.com/mitulaghara" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-all duration-300 group">
                                <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            </a>
                            <a href="https://www.instagram.com/mitul_aghara/" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-all duration-300 group">
                                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            </a>
                            <a href="https://www.linkedin.com/in/mitul-aghara-602a72332/" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-all duration-300 group">
                                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Quick Access</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                    Shop Now
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                    My Cart
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                    Order History
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Customer Care</h4>
                        <ul className="space-y-4">
                            <li><Link to="/help-center" className="text-gray-400 hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link to="/shipping-returns" className="text-gray-400 hover:text-primary transition-colors">Shipping & Returns</Link></li>
                            <li><Link to="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms-conditions" className="text-gray-400 hover:text-primary transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                                <span className="text-sm">Morbi, Gujarat</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-sm">+91 88668 77692</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-sm">support@krishamarket.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Krisha's Market. All rights reserved.
                        </p>
                        <p className="flex items-center gap-1 text-gray-500 text-sm">
                            Designed with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by Krisha's Market
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
