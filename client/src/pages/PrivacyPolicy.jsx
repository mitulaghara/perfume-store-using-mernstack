import React from 'react';
import { Lock, Eye, FileText, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="bg-dark text-white p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-8 h-8 text-primary" />
                            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
                        </div>
                        <p className="text-gray-400">
                            Effective Date: January 1, 2026 <br />
                            Your privacy is important to us. This policy outlines how we handle your data.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Eye className="w-5 h-5 text-primary" />
                                1. Information We Collect
                            </h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                We collect information you provide directly to us when you register an account, make a purchase, or contact customer support. This may include:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Personal identification (Name, Email, Phone Number)</li>
                                <li>Shipping and billing addresses</li>
                                <li>Payment information (processed securely by third-party providers)</li>
                                <li>Order history and preferences</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-primary" />
                                2. How We Use Your Information
                            </h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                We use the collected data to provide, maintain, and improve our services, including:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Processing and fulfilling your orders</li>
                                <li>Sending order updates and tracking information</li>
                                <li>Providing customer support and responding to inquiries</li>
                                <li>Sending promotional emails (only if you opt-in)</li>
                                <li>Preventing fraud and ensuring security</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-primary" />
                                3. Information Sharing
                            </h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                We do not sell your personal data. We may share information with:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Logistics partners for order delivery</li>
                                <li>Payment processors for secure transactions</li>
                                <li>Legal authorities when required by law</li>
                            </ul>
                        </section>

                        <section className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Cookies and Tracking</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Your Rights</h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                You have the right to access, correct, or delete your personal information. You can manage your account details in the "Profile" section or contact us for assistance.
                            </p>
                        </section>

                        <div className="border-t border-gray-200 pt-8 mt-8">
                            <p className="text-gray-500 italic text-sm">
                                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@perfumestore.com" className="text-primary hover:underline">support@perfumestore.com</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
