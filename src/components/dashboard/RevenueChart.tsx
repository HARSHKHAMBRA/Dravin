import React from 'react';
import type { RevenueData } from '../../types/dashboard';

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
      <div className="h-64 flex items-end space-x-2">
        {data.map((item) => {
          const height = `${(item.revenue / Math.max(...data.map(d => d.revenue))) * 100}%`;
          return (
            <div key={item.date} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors"
                style={{ height }}
              />
              <p className="text-xs text-gray-500 mt-2 rotate-45 origin-left">
                {item.date}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}