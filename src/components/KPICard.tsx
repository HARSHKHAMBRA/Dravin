import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { KPI } from '../types';

interface KPICardProps {
  kpi: KPI;
}

export function KPICard({ kpi }: KPICardProps) {
  const isPositive = kpi.change >= 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{kpi.label}</p>
          <h3 className="text-2xl font-bold mt-1">
            {kpi.unit ? `${kpi.value}${kpi.unit}` : kpi.value}
          </h3>
        </div>
        <span className={`flex items-center ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {isPositive ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
          <span className="ml-1">{Math.abs(kpi.change)}%</span>
        </span>
      </div>
    </div>
  );
}