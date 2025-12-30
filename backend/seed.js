require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const config = require('./src/config');

const seedAdmin = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');

    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      process.exit(0);
    }

    const admin = await User.create({
      email: 'admin@example.com',
      password: 'Admin@1234',
      fullName: 'System Admin',
      role: 'admin',
      status: 'active'
    });

    console.log('Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Password: Admin@1234');
    console.log('');
    console.log('Please change this password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
