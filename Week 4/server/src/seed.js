import 'dotenv/config';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'High-fidelity Bluetooth wireless headphones with active noise cancellation and 30-hour battery life.',
    price: 2499,
    category: 'Electronics',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Mechanical Gaming Keyboard',
    description: 'Tactile mechanical switches with customizable RGB backlighting and durable aluminum frame.',
    price: 1499,
    category: 'Electronics',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Ergonomic Optical Mouse',
    description: 'Precision wireless ergonomic mouse designed for comfort and extended productivity.',
    price: 799,
    category: 'Electronics',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Classic Cotton Crewneck T-Shirt',
    description: '100% combed organic cotton regular fit t-shirt, soft and breathable for everyday wear.',
    price: 699,
    category: 'Clothing',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Denim Trucker Jacket',
    description: 'Timeless vintage denim jacket with durable stitching and multiple chest pockets.',
    price: 2199,
    category: 'Clothing',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Clean Code: A Handbook of Agile Craftsmanship',
    description: 'Legendary programming book by Robert C. Martin on software craftsmanship and writing clean code.',
    price: 1299,
    category: 'Books',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'The Pragmatic Programmer',
    description: 'Essential wisdom and best practices for modern developers by David Thomas and Andrew Hunt.',
    price: 1450,
    category: 'Books',
    stock: 18,
    image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Aluminum Laptop Stand',
    description: 'Adjustable ergonomic laptop riser that supports proper posture and heat dissipation.',
    price: 1199,
    category: 'Electronics',
    stock: 0,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80'
  }
];

async function seed() {
  try {
    await connectDB();
    console.log('Clearing existing products and users...');
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log('Creating sample users...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const admin = await User.create({
      name: 'Store Admin',
      email: 'admin@store.com',
      password: adminPassword,
      role: 'admin'
    });

    const user = await User.create({
      name: 'John Doe',
      email: 'user@store.com',
      password: userPassword,
      role: 'user'
    });

    console.log('Inserting sample products...');
    await Product.insertMany(sampleProducts);

    console.log('--------------------------------------------------');
    console.log('Database seeded successfully!');
    console.log('Admin Account: admin@store.com / admin123 (Role: admin)');
    console.log('Customer Account: user@store.com / user123 (Role: user)');
    console.log(`Inserted ${sampleProducts.length} sample products.`);
    console.log('--------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
