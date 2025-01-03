import React from 'react';
import { MessageSquare, Search } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  unread: boolean;
}

const sampleMessages: Message[] = [
  {
    id: 'MSG-001',
    sender: 'John Smith',
    content: 'Hi, I have a question about my recent order...',
    timestamp: new Date(),
    unread: true
  },
  {
    id: 'MSG-002',
    sender: 'Sarah Johnson',
    content: 'Thank you for your help with my account!',
    timestamp: new Date(),
    unread: false
  }
];

export function MessagesPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <MessageSquare className="mr-2" />
          Messages
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        {sampleMessages.map((message) => (
          <div
            key={message.id}
            className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer
              ${message.unread ? 'bg-blue-50' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{message.sender}</h3>
              <span className="text-sm text-gray-500">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p className="text-gray-600 text-sm">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}