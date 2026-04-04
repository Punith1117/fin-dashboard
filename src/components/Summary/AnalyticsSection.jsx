import React from 'react';
import { BalanceTrendChart } from './Charts/BalanceTrendChart';
import { CategoryDistributionChart } from './Charts/CategoryDistributionChart';
import InsightsSection from './Insights/InsightsSection';

export function AnalyticsSection() {
  return (
    <section className="flex flex-col gap-4">
      {/* Dynamic Insights Logic */}
      <InsightsSection />
      
      {/* Primary Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-2 lg:mb-8 mb-2">
        <BalanceTrendChart />
        <CategoryDistributionChart />
      </div>
    </section>
  );
}
