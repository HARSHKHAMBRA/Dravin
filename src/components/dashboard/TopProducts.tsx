import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { TopProduct } from '../../types/dashboard';

interface TopProductsProps {
  products: TopProduct[];
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Top Products</h3>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">
                {product.sales} sales | ${product.revenue.toLocaleString()}
              </p>
            </div>
            <div className={`flex items-center ${
              product.growth >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {product.growth >= 0 ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              <span>{Math.abs(product.growth)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}