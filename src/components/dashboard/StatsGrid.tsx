import React from 'react';
import { TrendingUp, DollarSign, ShoppingBag, BarChart2 } from 'lucide-react';
import type { DashboardStats } from '../../types/dashboard';

interface StatsGridProps {
  stats: DashboardStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const items = [
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      label: 'Average Order Value',
      value: `$${stats.averageOrderValue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      label: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: BarChart2,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div key={item.label} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold mt-1">{item.value}</p>
            </div>
            <div className={`${item.color} p-3 rounded-lg text-white`}>
              <item.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}