import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }} 
            />
            <span className="text-slate-500 dark:text-slate-400">{entry.name}:</span>
            <span className="font-semibold text-slate-900 dark:text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function VisitsChart({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Visitas por Período
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Acompanhe a evolução das visitas
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1e5fa8]" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Concluídas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Agendadas</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e5fa8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#1e5fa8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorScheduled" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="completed"
              name="Concluídas"
              stroke="#1e5fa8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCompleted)"
            />
            <Area
              type="monotone"
              dataKey="scheduled"
              name="Agendadas"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorScheduled)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}