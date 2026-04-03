import React from 'react';
import { BalanceTrendChart } from './Charts/BalanceTrendChart';
import { CategoryDistributionChart } from './Charts/CategoryDistributionChart';

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <BalanceTrendChart />
      <CategoryDistributionChart />
    </div>
  );
}
