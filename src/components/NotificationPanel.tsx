import React from 'react';
import { Bell, X } from 'lucide-react';
import type { Notification } from '../types';

interface NotificationPanelProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export function NotificationPanel({ notifications, onDismiss }: NotificationPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Bell size={20} className="mr-2" />
          Notifications
        </h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {notifications.length} New
        </span>
      </div>
      
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`flex items-start justify-between p-3 rounded-lg ${
              notification.type === 'warning' ? 'bg-yellow-50' :
              notification.type === 'error' ? 'bg-red-50' :
              notification.type === 'success' ? 'bg-green-50' :
              'bg-blue-50'
            }`}
          >
            <div className="flex-1">
              <p className="text-sm">{notification.message}</p>
              <span className="text-xs text-gray-500">
                {notification.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <button
              onClick={() => onDismiss(notification.id)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}