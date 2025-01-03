import React from 'react';
import { Mic, MicOff, PhoneOff, UserPlus, MessageSquare } from 'lucide-react';

interface CallControlsProps {
  isMuted: boolean;
  onMute: () => void;
  onTransfer: () => void;
  onEnd: () => void;
  onAddNote: () => void;
}

export function CallControls({ 
  isMuted, 
  onMute, 
  onTransfer, 
  onEnd, 
  onAddNote 
}: CallControlsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-center space-x-4">
        <button
          onClick={onMute}
          className={`p-4 rounded-full ${
            isMuted 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        
        <button
          onClick={onTransfer}
          className="p-4 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
        >
          <UserPlus size={24} />
        </button>
        
        <button
          onClick={onAddNote}
          className="p-4 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
        >
          <MessageSquare size={24} />
        </button>
        
        <button
          onClick={onEnd}
          className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600"
        >
          <PhoneOff size={24} />
        </button>
      </div>
    </div>
  );
}