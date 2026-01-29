const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./backend/models/User');
const connectDB = require('./backend/config/db');

dotenv.config({ path: './backend/.env' });

const checkAdmins = async () => {
    try {
        await connectDB();
        const admins = await User.find({ isAdmin: true }).select('name email');
        console.log('--- ADMIN LIST ---');
        if (admins.length === 0) {
            console.log('No admins found.');
        } else {
            admins.forEach(admin => {
                console.log(`Name: ${admin.name}, Email: ${admin.email}`);
            });
        }
        console.log('------------------');
        process.exit();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

checkAdmins();
