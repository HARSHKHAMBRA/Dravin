import React from 'react';
import { Mail, Phone, Calendar, Tag } from 'lucide-react';
import type { Customer } from '../../types/call';

interface CustomerProfileProps {
  customer: Customer;
}

export function CustomerProfile({ customer }: CustomerProfileProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{customer.name}</h2>
        <div className="flex space-x-2">
          {customer.tags.map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center text-gray-600">
          <Mail size={18} className="mr-3" />
          {customer.email}
        </div>
        <div className="flex items-center text-gray-600">
          <Phone size={18} className="mr-3" />
          {customer.phone}
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar size={18} className="mr-3" />
          Last Interaction: {customer.lastInteraction.toLocaleDateString()}
        </div>
        <div className="flex items-center text-gray-600">
          <Tag size={18} className="mr-3" />
          Lead Score: {customer.leadScore}
        </div>
      </div>

      {customer.preferredTime && (
        <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            Preferred Contact Time: {customer.preferredTime}
          </p>
        </div>
      )}
    </div>
  );
}