import React, { useState } from 'react';
import { Info } from 'lucide-react';

const InsightCard = ({ title, value, highlight, icon: Icon, type = 'info', tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const typeStyles = {
    info: 'from-finance-primary/10 to-indigo-500/10 border-finance-primary/20 text-finance-primary',
    success: 'from-finance-success/10 to-teal-500/10 border-finance-success/20 text-finance-success',
    warning: 'from-amber-500/10 to-yellow-500/10 border-amber-200/20 text-amber-700',
    critical: 'from-finance-danger/10 to-red-500/10 border-finance-danger/20 text-finance-danger',
  };

  const iconBgStyles = {
    info: 'bg-finance-primary/10 text-finance-primary',
    success: 'bg-finance-success/10 text-finance-success',
    warning: 'bg-amber-100 text-amber-600',
    critical: 'bg-finance-danger/10 text-finance-danger',
  };

  return (
    <div 
      className={`relative overflow-visible rounded-xl border bg-gradient-to-br p-4 transition-all duration-300 hover:shadow-md ${typeStyles[type]}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip Overlay */}
      <div 
        className={`absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none transition-all duration-200 ease-out 
          ${showTooltip && tooltip ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1'}`}
      >
        <div className="w-48 p-2 text-xs font-medium bg-gray-900 text-white rounded-lg shadow-xl">
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              {title}
            </p>
            <Info size={10} className="opacity-40 cursor-help" />
          </div>
          <h3 className="text-base font-bold text-gray-900 leading-tight">
            {value}
          </h3>
          <p className="text-[11px] font-semibold mt-1 opacity-90 leading-normal">
            {highlight}
          </p>
        </div>
        <div className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${iconBgStyles[type]}`}>
          <Icon size={16} />
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
