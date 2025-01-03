// src/types.ts or src/interfaces.ts

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  leadScore: number;
  lastInteraction: Date;
  preferredTime?: string; // Optional
  tags: string[];
}

export interface CallQueueItem {
  id: string;
  customer: Customer;
  scheduledTime: Date;
  priority: 'low' | 'medium' | 'high';
  type: 'outbound' | 'inbound';
  reason: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface CallTranscript {
  id: string;
  timestamp: Date;
  speaker: 'agent' | 'customer';
  text: string;
}

export interface ActiveCall {
  id: string;
  customer: Customer;
  startTime: Date;
  transcripts: CallTranscript[];
  status: 'active' | 'hold' | 'muted';
  sentiment: 'positive' | 'neutral' | 'negative';
}
