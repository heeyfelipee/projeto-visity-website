import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function KPICard({ 
  title, 
  value, 
  change, 
  changeType = 'increase', 
  icon: Icon,
  iconColor = 'bg-[#1e5fa8]',
  delay = 0 
}) {
  const isPositive = changeType === 'increase';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {value}
          </p>
          {change && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-sm font-medium",
              isPositive ? "text-[#10b981]" : "text-red-500"
            )}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{change}</span>
              <span className="text-slate-400 dark:text-slate-500 font-normal">vs. mês anterior</span>
            </div>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
          iconColor
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}