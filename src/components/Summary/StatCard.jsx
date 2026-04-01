import React from 'react';

export function StatCard({ label, amount, type = 'primary', icon: Icon }) {
  const styles = {
    primary: {
      border: 'border-finance-primary/20',
      bg: 'bg-finance-primary/5',
      text: 'text-finance-primary',
      iconBg: 'bg-finance-primary/10',
    },
    success: {
      border: 'border-finance-success/20',
      bg: 'bg-finance-success/5',
      text: 'text-finance-success',
      iconBg: 'bg-finance-success/10',
    },
    danger: {
      border: 'border-finance-danger/20',
      bg: 'bg-finance-danger/5',
      text: 'text-finance-danger',
      iconBg: 'bg-finance-danger/10',
    },
  };

  const currentStyle = styles[type] || styles.primary;

  return (
    <div className={`p-6 rounded-2xl border ${currentStyle.border} ${currentStyle.bg} flex items-center justify-between`}>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
        <p className="text-2xl font-bold text-gray-900">{amount}</p>
      </div>
      {Icon && (
        <div className={`p-3 rounded-xl ${currentStyle.iconBg}`}>
          <Icon className={currentStyle.text} size={24} strokeWidth={2} />
        </div>
      )}
    </div>
  );
}
