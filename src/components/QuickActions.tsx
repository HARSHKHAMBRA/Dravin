import React from 'react';
import { Phone, Plus, FileText } from 'lucide-react';

const actions = [
  {
    label: 'Start Call Campaign',
    icon: Phone,
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    label: 'Add New Order',
    icon: Plus,
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    label: 'View Reports',
    icon: FileText,
    color: 'bg-purple-500 hover:bg-purple-600',
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          className={`${action.color} text-white p-4 rounded-xl flex items-center justify-center transition-colors`}
        >
          <action.icon size={20} className="mr-2" />
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}