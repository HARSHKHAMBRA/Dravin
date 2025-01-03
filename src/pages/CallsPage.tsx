import React, { useState, useEffect } from 'react';
import { CallQueue } from '../components/calls/CallQueue';
import { CustomerProfile } from '../components/calls/CustomerProfile';
import { TranscriptionPanel } from '../components/calls/TranscriptionPanel';
import { CallControls } from '../components/calls/CallControls';
import { Power, RefreshCcw } from 'lucide-react'; // Add icons for the X-Lite button
import type { CallQueueItem, ActiveCall } from '../types/call';

// X-Lite Configurations (For VoIP Integration)
const xliteConfig = {
  server: '192.168.100.19',
  port: 5060,
  username: '4006',
  password: '4006',
  codec: 'G.711', // Common VoIP codec
  autoRegister: true,
  transport: 'UDP', // Options: UDP, TCP, TLS
};

// Sample data
const sampleCalls: CallQueueItem[] = [
  {
    id: '1',
    customer: {
      id: '101',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      leadScore: 85,
      lastInteraction: new Date('2024-03-10'),
      preferredTime: '9:00 AM - 11:00 AM',
      tags: ['VIP', 'Enterprise'],
    },
    scheduledTime: new Date('2024-03-15T10:00:00'),
    priority: 'high',
    type: 'outbound',
    reason: 'Follow up on enterprise subscription inquiry',
    status: 'pending',
  },
  // Add more sample calls here
];

export function CallsPage() {
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isXliteOn, setIsXliteOn] = useState(true); // Assume X-Lite is on initially

  // Simulate checking X-Lite status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const xliteRunning = Math.random() > 0.2; // Randomly simulate X-Lite being off (20% chance)
      setIsXliteOn(xliteRunning);

      if (!xliteRunning) {
        alert('X-Lite is currently OFF. Please start X-Lite to make calls.');
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const handleCallStart = (call: CallQueueItem) => {
    if (!isXliteOn) {
      alert('Cannot start the call as X-Lite is OFF.');
      return;
    }

    console.log('Initializing call with X-Lite configuration:', xliteConfig);
    console.log('Dialing:', call.customer.phone);

    setActiveCall({
      id: call.id,
      customer: call.customer,
      startTime: new Date(),
      transcripts: [],
      status: 'active',
      sentiment: 'neutral',
    });
  };

  const handleEndCall = () => {
    console.log('Ending call...');
    setActiveCall(null);
    setIsMuted(false);
  };

  const handleXliteToggle = () => {
    if (isXliteOn) {
      console.log('Turning X-Lite OFF...');
      setIsXliteOn(false);
    } else {
      console.log('Turning X-Lite ON...');
      setIsXliteOn(true);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Call Management</h1>
        <button
          onClick={handleXliteToggle}
          className={`flex items-center px-4 py-2 rounded-lg text-white ${
            isXliteOn ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {isXliteOn ? (
            <>
              <Power size={16} className="mr-2" />
              X-Lite ON
            </>
          ) : (
            <>
              <RefreshCcw size={16} className="mr-2" />
              Restart X-Lite
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CallQueue calls={sampleCalls} onCallStart={handleCallStart} />
        </div>

        {activeCall ? (
          <div className="lg:col-span-2 space-y-6">
            <CustomerProfile customer={activeCall.customer} />
            <TranscriptionPanel transcripts={activeCall.transcripts} />
            <CallControls
              isMuted={isMuted}
              onMute={() => {
                console.log(isMuted ? 'Unmuting call...' : 'Muting call...');
                setIsMuted(!isMuted);
              }}
              onTransfer={() => {
                console.log('Transferring call...');
              }}
              onEnd={handleEndCall}
              onAddNote={() => {
                console.log('Adding note...');
              }}
            />
          </div>
        ) : (
          <div className="lg:col-span-2 flex items-center justify-center h-[600px] bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">Select a call from the queue to start</p>
          </div>
        )}
      </div>
    </div>
  );
}
