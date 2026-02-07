import React from 'react';
import { Shield, Book, Gavel, AlertTriangle } from 'lucide-react';

const TermsConditions = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="bg-dark text-white p-8 md:p-12 relative overflow-hidden">
                        <div className="relative z-10">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms & Conditions</h1>
                            <p className="text-gray-400">
                                Last Updated: January 1, 2026 <br />
                                Please read these terms carefully before using our service.
                            </p>
                        </div>
                        <Shield className="absolute right-[-20px] top-[-20px] w-64 h-64 text-gray-800 opacity-50 rotate-12" />
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 space-y-8">
                        <div className="prose max-w-none text-gray-600">
                            <p className="text-lg leading-relaxed mb-8">
                                Welcome to mitul's Market. By accessing or using our website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use our services.
                            </p>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Book className="w-5 h-5 text-primary" />
                                1. Use of Service
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                You must be at least 18 years old to use this service. You agree to use the website for lawful purposes only and not to engage in any conduct that restricts or inhibits anyone else's use or enjoyment of the website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Gavel className="w-5 h-5 text-primary" />
                                2. Product Information
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We strive to be as accurate as possible with product descriptions and pricing. However, we do not warrant that product descriptions or other content are accurate, complete, reliable, current, or error-free.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
                                <li>Prices are subject to change without notice.</li>
                                <li>We reserve the right to limit quantities purchased per person.</li>
                                <li>Colors may vary slightly depending on your monitor display.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-primary" />
                                3. User Accounts
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                All content included on this site, such as text, graphics, logos, images, and software, is the property of mitul's Market or its content suppliers and protected by copyright laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                mitul's Market shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Changes to Terms</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We reserve the right to modify these terms at any time. Your continued use of the site following any changes indicates your acceptance of the new terms.
                            </p>
                        </section>

                        <div className="bg-gray-50 border-1 border-gray-200 p-6 rounded-lg mt-8">
                            <p className="text-gray-700 font-medium mb-2">Contact Us</p>
                            <p className="text-gray-600 text-sm">
                                For any questions regarding these Terms & Conditions, please contact us at <span className="font-semibold">legal@mitulmarket.com</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
