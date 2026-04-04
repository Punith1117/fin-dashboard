import React, { useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useTransactionStore } from '../../../store/useTransactionStore';
import { useDarkModeStore } from '../../../store/useDarkModeStore';
import { formatBalanceTrendData } from '../../../utils/chartDataUtils';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const balance = payload.find(p => p.dataKey === 'balance')?.value || 0;
    const income = payload.find(p => p.dataKey === 'income')?.value || 0;
    const expense = payload.find(p => p.dataKey === 'expense')?.value || 0;

    return (
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm lg:p-4 p-2 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 min-w-[150px]">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex justify-between gap-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">Balance:</span>
            <span className={`text-xs font-bold ${balance >= 0 ? 'text-finance-success' : 'text-finance-danger'}`}>
              ₹{balance.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">Income:</span>
            <span className="text-xs font-semibold text-finance-primary dark:brightness-200">
              ₹{income.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">Expense:</span>
            <span className="text-xs font-semibold text-finance-danger">
              ₹{expense.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function BalanceTrendChart() {
  const transactions = useTransactionStore((state) => state.transactions);
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);

  const data = useMemo(() => {
    return formatBalanceTrendData(transactions);
  }, [transactions]);

  const chartColors = {
    primary: isDarkMode ? '#6366f1' : '#4f46e5',
    grid: isDarkMode ? '#374151' : '#e5e7eb',
    tick: isDarkMode ? '#9ca3af' : '#6b7280',
    cursor: isDarkMode ? '#374151' : '#e5e7eb'
  };

  return (
    <div className="bg-white dark:bg-gray-900 lg:p-6 p-3 rounded-2xl border border-gray-100 dark:border-gray-800 lg:h-[400px] h-[300px] flex flex-col">
      <div className="flex items-center justify-between lg:mb-6 mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Balance Trend</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Net monthly balance (6M)</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-finance-primary dark:brightness-200">
          <span className="w-2 h-2 rounded-full bg-finance-primary" />
          Net Balance
        </div>
      </div>
      
      <div className="flex-1 w-full min-w-0">
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: chartColors.tick, fontSize: 12 }}
              interval={0}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: chartColors.tick, fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: chartColors.cursor, strokeWidth: 1 }} />
            
            <Area
              type="monotone"
              dataKey="balance"
              stroke={chartColors.primary}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBalance)"
              connectNulls
            />
            
            <Area type="monotone" dataKey="income" stroke="none" fill="none" />
            <Area type="monotone" dataKey="expense" stroke="none" fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
