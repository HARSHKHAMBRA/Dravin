// src/components/StatusDisplay.tsx
import React from 'react';
import { FaClipboardList } from 'react-icons/fa';

interface StatusDisplayProps {
  status: string;
}

export function StatusDisplay({ status }: StatusDisplayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <FaClipboardList className="text-3xl text-gray-500" />
        <h3 className="text-xl font-semibold">Status</h3>
      </div>
      <p className="mt-4 text-lg text-gray-600">{status}</p>
    </div>
  );
}
