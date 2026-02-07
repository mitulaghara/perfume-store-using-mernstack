import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null); // Track editing ID
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: '', images: '', stock: 10, specifications: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/products');
            const sortedProducts = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setProducts(sortedProducts);
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5001/api/products/${id}`);
                fetchProducts();
            } catch (err) {
                console.error("Error deleting product", err);
                alert("Failed to delete product");
            }
        }
    };

    const handleEdit = (product) => {
        let specsString = '';
        if (product.specifications) {
            // Check if it's already an object or a Mongoose map
            const specs = product.specifications instanceof Map
                ? Object.fromEntries(product.specifications)
                : product.specifications;

            specsString = Object.entries(specs)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n');
        }

        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            images: product.images ? product.images.join(', ') : product.image,
            stock: product.stock,
            specifications: specsString
        });
        setEditingId(product._id);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imageArray = formData.images.split(',').map(url => url.trim()).filter(url => url);

            // Parse specifications from textarea
            const specsObj = {};
            if (formData.specifications && typeof formData.specifications === 'string') {
                formData.specifications.split(/\r?\n/).forEach(line => {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) return; // Skip empty lines

                    const colonIndex = trimmedLine.indexOf(':');
                    if (colonIndex > 0) {
                        const key = trimmedLine.substring(0, colonIndex).trim();
                        const value = trimmedLine.substring(colonIndex + 1).trim();
                        if (key) {
                            specsObj[key] = value;
                        }
                    }
                });
            }

            const { name, description, price, category, stock } = formData;

            const productData = {
                name,
                description,
                price,
                category,
                stock,
                images: imageArray,
                image: imageArray[0] || '', // Set main image as first one
                specifications: Object.keys(specsObj).length > 0 ? specsObj : {}
            };

            console.log("Sending product data to server:", productData);

            if (editingId) {
                await axios.put(`http://localhost:5001/api/products/${editingId}`, productData);
            } else {
                await axios.post('http://localhost:5001/api/products', productData);
            }
            setShowModal(false);
            setEditingId(null);
            setFormData({ name: '', description: '', price: '', category: '', images: '', stock: 10, specifications: '' });
            fetchProducts();
        } catch (err) {
            console.error("Error saving product", err);
            alert("Failed to save product");
        }
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({ name: '', description: '', price: '', category: '', images: '', stock: 10, specifications: '' });
        setShowModal(true);
    }

    return (
        <div className="pb-20 md:pb-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-dark">Product Management</h1>
                <button
                    onClick={openAddModal}
                    className="bg-primary text-white px-4 md:px-6 py-2 md:py-3 rounded-xl flex items-center space-x-2 hover:bg-indigo-700 transition w-full sm:w-auto justify-center"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-6 text-sm font-semibold text-gray-500">Product Info</th>
                            <th className="p-6 text-sm font-semibold text-gray-500">Category</th>
                            <th className="p-6 text-sm font-semibold text-gray-500">Price</th>
                            <th className="p-6 text-sm font-semibold text-gray-500">Stock</th>
                            <th className="p-6 text-sm font-semibold text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                        <div>
                                            <p className="font-bold text-dark">{product.name}</p>
                                            <p className="text-xs text-gray-400 truncate max-w-[200px]">{product.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 text-sm text-gray-600">
                                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500 uppercase">{product.category}</span>
                                </td>
                                <td className="p-6 font-bold text-dark">₹{product.price}</td>
                                <td className="p-6 text-sm text-gray-600">{product.stock}</td>
                                <td className="p-6 text-right space-x-2">
                                    <button onClick={() => handleEdit(product)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="flex gap-4 mb-4">
                            <img src={product.image} alt="" className="w-20 h-20 rounded-lg object-cover" />
                            <div className="flex-1">
                                <h3 className="font-bold text-dark mb-1">{product.name}</h3>
                                <p className="text-xs text-gray-400 line-clamp-2 mb-2">{product.description}</p>
                                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-bold text-gray-500 uppercase">{product.category}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                            <div>
                                <p className="text-xs text-gray-500">Price</p>
                                <p className="font-bold text-dark">₹{product.price}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Stock</p>
                                <p className="font-bold text-dark">{product.stock}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(product)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex items-start sm:items-center justify-center p-2 sm:p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-2xl p-4 sm:p-6 md:p-8 relative my-4 sm:my-8 max-h-[95vh] overflow-y-auto">
                        <button onClick={() => setShowModal(false)} className="sticky top-0 float-right text-gray-400 hover:text-dark bg-white rounded-full p-1 z-10">
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-dark pr-8">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                <input required type="text" className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                    <input required type="text" className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-xl outline-none" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Stock</label>
                                    <input type="number" className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-xl outline-none" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input required type="text" className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-xl outline-none" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Image URLs <span className="text-xs text-gray-400">(Comma separated)</span></label>
                                <textarea required className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-xl outline-none" rows="2" value={formData.images} onChange={e => setFormData({ ...formData, images: e.target.value })} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"></textarea>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea required className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-xl outline-none" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Specifications <span className="text-xs text-gray-400">(One per line, format: Key: Value)</span></label>
                                <textarea className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-xl outline-none" rows="4" value={formData.specifications} onChange={e => setFormData({ ...formData, specifications: e.target.value })} placeholder="Brand: Nike&#10;Material: Leather&#10;Weight: 1.2 kg&#10;Dimensions: 24 x 12 x 5 cm"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-primary text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-indigo-700 transition sticky bottom-0">{editingId ? 'Update Product' : 'Save Product'}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
