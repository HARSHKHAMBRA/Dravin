const connection = require('./db');

// Fetch all products
const getAllProducts = async () => {
  try {
    const [rows] = await connection.query('SELECT * FROM Products');
    return rows;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw new Error('Error fetching products');
  }
};

// Fetch a product by ID
const getProductById = async (id) => {
  try {
    const [rows] = await connection.query('SELECT * FROM Products WHERE id = ?', [id]);
    return rows[0] || null;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error.message);
    throw new Error(`Error fetching product with ID ${id}`);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
