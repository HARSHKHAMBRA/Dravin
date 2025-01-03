export interface KPI {
  label: string;
  value: number;
  change: number;
  unit?: string;
}

export interface Notification {
  id: string;
  type: 'warning' | 'success' | 'error' | 'info';
  message: string;
  timestamp: Date;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}