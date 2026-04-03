import React from 'react';
import { BalanceTrendChart } from './Charts/BalanceTrendChart';
import { CategoryDistributionChart } from './Charts/CategoryDistributionChart';
import InsightsSection from './Insights/InsightsSection';

export function AnalyticsSection() {
  return (
    <div className="flex flex-col gap-8">
      {/* Dynamic Insights Logic */}
      <InsightsSection />
      
      {/* Primary Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <BalanceTrendChart />
        <CategoryDistributionChart />
      </div>
    </div>
  );
}
