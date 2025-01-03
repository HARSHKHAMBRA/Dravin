import React from 'react';
import { Product } from '../pages/Products';

interface ProductListProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

// Sample best products for "Best of Shows" category
const bestOfShows: number[] = [1, 2]; // Example product IDs that are considered "Best of Shows"

const ProductList: React.FC<ProductListProps> = ({ products, onSelect }) => {
  // Filter products to get only the "Best of Shows"
  const bestProducts = products.filter((product) => bestOfShows.includes(product.id));

  return (
    <div className="space-y-8">
      {/* Best of Shows Section */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">Best of Shows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bestProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center p-4 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => onSelect(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-center">{product.name}</h3>
              <p className="text-gray-500 text-sm text-center">{product.details.slice(0, 30)}...</p>
              <p className="text-green-500 font-bold">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* All Products Section */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">All Products</h2>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center p-4 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => onSelect(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.details.slice(0, 30)}...</p>
                <p className="text-green-500 font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// A sample function to filter products by price range
export function filterProductsByPrice(products: Product[], maxPrice: number): Product[] {
  return products.filter((product) => parseFloat(product.price.replace('₹', '')) <= maxPrice);
}

export default ProductList;
