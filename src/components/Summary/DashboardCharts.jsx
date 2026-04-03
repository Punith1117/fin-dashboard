import React from 'react';
import { BalanceTrendChart } from './Charts/BalanceTrendChart';

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <BalanceTrendChart />
    </div>
  );
}
