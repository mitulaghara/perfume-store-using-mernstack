const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce_project');
        console.log('MongoDB Connected');

        const existingAdmin = await User.findOne({ email: 'admin@test.com' });
        if (existingAdmin) {
            console.log('Admin already exists');
        } else {
            const admin = new User({
                name: 'Admin User',
                email: 'admin@test.com',
                password: 'password123',
                role: 'admin'
            });
            await admin.save();
            console.log('Admin user created successfully');
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
