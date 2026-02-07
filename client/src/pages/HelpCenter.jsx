import React, { useState } from 'react';
import { Search, Package, CreditCard, RefreshCw, Mail, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

const HelpCenter = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I track my order?",
            answer: "Once your order is shipped, you will receive a confirmation email with a tracking number. You can also track your order in the 'Orders' section of your profile."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and UPI payments for your convenience."
        },
        {
            question: "How can I return an item?",
            answer: "You can initiate a return from your 'Orders' page within 30 days of delivery. Please ensure the item is unused and in its original packaging."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Currently, we ship within India. We are working on expanding our shipping to international locations soon."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            {/* Hero Section */}
            <div className="bg-dark text-white py-16 mb-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
                    <p className="text-gray-400 mb-8">Search for answers or browse our help topics.</p>
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6">
                {/* Topic Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group text-center">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Orders & Delivery</h3>
                        <p className="text-gray-500 text-sm">Track packages, edit orders, shipping info</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group text-center">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
                            <CreditCard className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Payments & Refunds</h3>
                        <p className="text-gray-500 text-sm">Payment methods, status, refund processing</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group text-center">
                        <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-100 transition-colors">
                            <RefreshCw className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Returns & Exchanges</h3>
                        <p className="text-gray-500 text-sm">Return policies, exchange process</p>
                    </div>
                </div>

                {/* FAQs */}
                <div className="max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-medium text-gray-900">{faq.question}</span>
                                    {openFaq === index ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-2">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Support */}
                <div className="bg-primary/5 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
                    <p className="text-gray-600 mb-8">Our support team is available 24/7 to assist you.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm text-gray-900">
                            <Mail className="w-5 h-5" />
                            Email Support
                        </button>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
                            <MessageCircle className="w-5 h-5" />
                            Chat with Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
