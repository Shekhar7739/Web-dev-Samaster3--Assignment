const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productData');

dotenv.config();

const sampleProducts = [
  {
    name: 'Study Table',
    sku: 'FURN-TB-012',
    category: 'Furniture',
    price: 3999,
    quantity: 2,
    reorderLevel: 4,
    supplier: 'IKEA India'
  },
  {
    name: 'Gel Pen Pack of 15',
    sku: 'STNY-PN-713',
    category: 'Stationery',
    price: 120,
    quantity: 40,
    reorderLevel: 20,
    supplier: 'Cello Pens'
  },
  {
    name: 'Ergonomic Office Chair',
    sku: 'FURN-CH-101',
    category: 'Furniture',
    price: 6500,
    quantity: 3,
    reorderLevel: 5,
    supplier: 'Godrej Interio'
  },
  {
    name: 'Wireless Mechanical Keyboard',
    sku: 'ELEC-KB-204',
    category: 'Electronics',
    price: 3499,
    quantity: 25,
    reorderLevel: 10,
    supplier: 'Logitech'
  },
  {
    name: 'Gaming Mouse RGB',
    sku: 'ELEC-MS-305',
    category: 'Electronics',
    price: 1499,
    quantity: 30,
    reorderLevel: 15,
    supplier: 'Razer'
  },
  {
    name: '27-inch 4K Monitor',
    sku: 'ELEC-MN-409',
    category: 'Electronics',
    price: 24999,
    quantity: 8,
    reorderLevel: 10, // low stock (8 <= 10)
    supplier: 'Samsung'
  },
  {
    name: 'Noise Cancelling Headphones',
    sku: 'ELEC-HP-512',
    category: 'Electronics',
    price: 8999,
    quantity: 33,
    reorderLevel: 12,
    supplier: 'Sony'
  },
  {
    name: 'Cotton Casual T-Shirt',
    sku: 'APPR-TS-001',
    category: 'Apparel',
    price: 599,
    quantity: 50,
    reorderLevel: 25,
    supplier: 'Puma India'
  },
  {
    name: 'Slim Fit Denim Jeans',
    sku: 'APPR-JN-002',
    category: 'Apparel',
    price: 2199,
    quantity: 28,
    reorderLevel: 15,
    supplier: 'Levis'
  },
  {
    name: 'A4 Spiral Notebook',
    sku: 'STNY-NB-101',
    category: 'Stationery',
    price: 85,
    quantity: 120,
    reorderLevel: 30,
    supplier: 'Classmate'
  },
  {
    name: 'Permanent Marker Set',
    sku: 'STNY-MK-102',
    category: 'Stationery',
    price: 150,
    quantity: 5,
    reorderLevel: 10, // low stock (5 <= 10)
    supplier: 'Camlin'
  },
  {
    name: 'Desk Organizer Metal Mesh',
    sku: 'FURN-DO-808',
    category: 'Furniture',
    price: 499,
    quantity: 1,
    reorderLevel: 5, // low stock (1 <= 5)
    supplier: 'AmazonBasics'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared.');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${createdProducts.length} sample products!`);

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();

