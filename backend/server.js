const express = require('express');
const productService = require('./productService');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the CORS package

dotenv.config();

const app = express();
const port = 3000;

// MySQL connection setup
let pool;

// Initialize MySQL pool connection
const initDbConnection = async () => {
  try {
    pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log('MySQL connection established');
  } catch (err) {
    console.error('Error initializing MySQL connection:', err.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Use CORS middleware to allow cross-origin requests
app.use(cors()); // This will allow all origins by default

// Endpoint to get all products
app.get('/products', async (req, res) => {
  try {
    const products = await productService.getAllProducts(pool);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Endpoint to get a product by ID
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getProductById(id, pool);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
});

// Start the server after MySQL connection is initialized
initDbConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
