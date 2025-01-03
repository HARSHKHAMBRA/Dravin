import React from 'react';
import { Clock, Phone, Star } from 'lucide-react';
import type { CallQueueItem } from '../../types/call';

interface CallQueueProps {
  calls: CallQueueItem[];
  onCallStart: (call: CallQueueItem) => void;
}

export function CallQueue({ calls, onCallStart }: CallQueueProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Call Queue</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {calls.map((call) => (
          <div 
            key={call.id} 
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${
                  call.priority === 'high' ? 'bg-red-500' :
                  call.priority === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`} />
                <div>
                  <h3 className="font-medium">{call.customer.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock size={14} className="mr-1" />
                    {new Date(call.scheduledTime).toLocaleTimeString()}
                    <Star size={14} className="ml-3 mr-1" />
                    Lead Score: {call.customer.leadScore}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onCallStart(call)}
                className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Phone size={16} className="mr-2" />
                Start Call
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">{call.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}