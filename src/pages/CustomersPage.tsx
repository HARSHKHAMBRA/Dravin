import React from 'react';
import { Users, Mail, Phone, Star } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  leadScore: number;
  lastContact: Date;
}

const sampleCustomers: Customer[] = [
  {
    id: 'CUS-001',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    leadScore: 85,
    lastContact: new Date()
  },
  {
    id: 'CUS-002',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 987-6543',
    status: 'active',
    leadScore: 92,
    lastContact: new Date()
  }
];

export function CustomersPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="mr-2" />
          Customers
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{customer.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {customer.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2" />
                {customer.email}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2" />
                {customer.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <Star size={16} className="mr-2" />
                Lead Score: {customer.leadScore}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Last Contact</span>
                <span>{customer.lastContact.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}