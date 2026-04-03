import React, { useMemo } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { useTransactionStore } from '../../../store/useTransactionStore';
import { formatCategoryDistributionData } from '../../../utils/chartDataUtils';

const COLORS = [
  '#4f46e5', // INDIGO
  '#10b981', // EMERALD
  '#f59e0b', // AMBER
  '#ef4444', // RED
  '#8b5cf6', // VIOLET
  '#06b6d4', // CYAN
  '#94a3b8'  // SLATE (Others)
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-100">
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs font-bold text-finance-primary">₹{value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export function CategoryDistributionChart() {
  const transactions = useTransactionStore((state) => state.transactions);

  const data = useMemo(() => {
    return formatCategoryDistributionData(transactions);
  }, [transactions]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Spending Breakdown</h3>
          <p className="text-xs text-gray-500">Top 6 categories</p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0 relative">
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                formatter={(value) => <span className="text-[11px] font-medium text-gray-500">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
