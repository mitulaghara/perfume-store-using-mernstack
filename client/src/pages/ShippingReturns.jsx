import React from 'react';
import { Truck, RefreshCw, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

const ShippingReturns = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 mb-8">
                <div className="container mx-auto px-6 py-12">
                    <h1 className="text-3xl font-bold mb-2">Shipping & Returns</h1>
                    <p className="text-gray-500">Everything you need to know about delivery and returns.</p>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl">

                {/* Shipping Section */}
                <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Truck className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Shipping Policy</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="border-l-4 border-blue-500 pl-4 py-1 bg-blue-50 rounded-r-lg">
                            <h3 className="font-semibold text-blue-900 mb-1">Free Shipping</h3>
                            <p className="text-blue-700 text-sm">We offer free standard shipping on all orders over ₹999.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    Standard Delivery
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Delivery within 5-7 business days for most metro cities. Remote areas may take up to 10 days.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-gray-400" />
                                    Express Delivery
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Available for select pin codes using reliable courier partners. Delivery within 2-3 business days.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Order Tracking</h3>
                            <p className="text-gray-600 text-sm mb-2">
                                Once your order is dispatched, you will receive a tracking link via email and SMS.
                            </p>
                            <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                                <li>Orders are processed within 24 hours of confirmation.</li>
                                <li>We do not ship on Sundays and public holidays.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Returns Section */}
                <section className="bg-white rounded-xl shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <RefreshCw className="w-5 h-5 text-orange-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Return Policy</h2>
                    </div>

                    <div className="space-y-6">
                        <p className="text-gray-600 leading-relaxed">
                            We want you to love what you ordered. But if something isn't right, let us know.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <h3 className="font-bold text-2xl text-gray-900 mb-1">30</h3>
                                <p className="text-sm text-gray-500">Days to Return</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <h3 className="font-bold text-2xl text-gray-900 mb-1">FREE</h3>
                                <p className="text-sm text-gray-500">Return Shipping</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <h3 className="font-bold text-2xl text-gray-900 mb-1">100%</h3>
                                <p className="text-sm text-gray-500">Refund Guarantee</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Return Eligibility</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                    Item must be unused and in original condition
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                    Original tags and packaging must be intact
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                    Receipt or proof of purchase is required
                                </li>
                            </ul>
                        </div>

                        <div className="flex items-start gap-3 bg-red-50 p-4 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-red-900 text-sm mb-1">Non-Returnable Items</h4>
                                <p className="text-red-700 text-xs">
                                    Personal care items, digital products, and clearance items (marked as "Final Sale") are not eligible for return unless defective.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-2">How to Return</h3>
                            <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-2">
                                <li>Go to 'My Orders' and select the item you wish to return.</li>
                                <li>Choose a reason for return and select your preferred refund info.</li>
                                <li>Schedule a pickup time for our courier partner.</li>
                            </ol>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default ShippingReturns;
