// AI and Automation Types
export interface AIConfig {
  model: 'gpt-4' | 'gpt-3.5-turbo';
  temperature: number;
  maxTokens: number;
}

export interface AutomationRule {
  id: string;
  trigger: 'call_end' | 'order_placed' | 'email_received' | 'low_satisfaction';
  actions: AutomationAction[];
  conditions: AutomationCondition[];
  isActive: boolean;
}

export interface AutomationAction {
  type: 'send_email' | 'schedule_call' | 'create_task' | 'update_crm';
  template?: string;
  delay?: number; // in minutes
  priority?: 'high' | 'medium' | 'low';
}

export interface AutomationCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
  value: string | number | boolean;
}

// Order Management Types
export interface Order {
  id: string;
  customerId: string;
  products: OrderProduct[];
  status: OrderStatus;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: Address;
  billingAddress: Address;
  paymentStatus: PaymentStatus;
  automationHistory: AutomationEvent[];
}

export interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  sku: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 
  | 'pending'
  | 'authorized'
  | 'paid'
  | 'refunded'
  | 'failed';

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

// AI Analytics Types
export interface CallAnalytics {
  id: string;
  callId: string;
  duration: number;
  sentiment: SentimentScore;
  keywords: string[];
  topics: string[];
  nextBestAction: string;
  transcription: string;
  summary: string;
}

export interface SentimentScore {
  overall: number; // -1 to 1
  segments: {
    timestamp: number;
    score: number;
    text: string;
  }[];
}

export interface AutomationEvent {
  id: string;
  timestamp: Date;
  type: string;
  description: string;
  result: 'success' | 'failure';
  metadata: Record<string, unknown>;
}