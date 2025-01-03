import React from 'react';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { TopProducts } from '../components/dashboard/TopProducts';
import { RecentOrders } from '../components/dashboard/RecentOrders';
import type { DashboardStats, RevenueData, TopProduct, RecentOrder } from '../types/dashboard';

// Sample data - Replace with real data from your backend
const sampleStats: DashboardStats = {
  totalOrders: 1234,
  totalRevenue: 87650,
  averageOrderValue: 71,
  conversionRate: 3.2
};

const sampleRevenueData: RevenueData[] = [
  { date: '2024-03-01', revenue: 12500 },
  { date: '2024-03-02', revenue: 14200 },
  { date: '2024-03-03', revenue: 11800 },
  { date: '2024-03-04', revenue: 13900 },
  { date: '2024-03-05', revenue: 15600 },
  { date: '2024-03-06', revenue: 13200 },
  { date: '2024-03-07', revenue: 16400 }
];

const sampleTopProducts: TopProduct[] = [
  { id: '1', name: 'Premium Widget', sales: 234, revenue: 23400, growth: 12.5 },
  { id: '2', name: 'Super Gadget', sales: 187, revenue: 18700, growth: -5.2 },
  { id: '3', name: 'Mega Tool', sales: 156, revenue: 15600, growth: 8.7 },
  { id: '4', name: 'Power Device', sales: 132, revenue: 13200, growth: 3.4 }
];

const sampleRecentOrders: RecentOrder[] = [
  {
    id: '1',
    customerName: 'John Smith',
    amount: 299,
    status: 'completed',
    date: new Date('2024-03-15T10:30:00')
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    amount: 549,
    status: 'processing',
    date: new Date('2024-03-15T09:45:00')
  },
  {
    id: '3',
    customerName: 'Michael Brown',
    amount: 199,
    status: 'pending',
    date: new Date('2024-03-15T09:15:00')
  },
  {
    id: '4',
    customerName: 'Emma Wilson',
    amount: 799,
    status: 'cancelled',
    date: new Date('2024-03-15T08:30:00')
  }
];

export function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      <div className="space-y-6">
        <StatsGrid stats={sampleStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart data={sampleRevenueData} />
          <TopProducts products={sampleTopProducts} />
        </div>
        
        <RecentOrders orders={sampleRecentOrders} />
      </div>
    </div>
  );
}