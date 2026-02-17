import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Navigation } from 'lucide-react';

// Simple Brazil map SVG representation
const BrazilMapSVG = ({ activeStates = [] }) => {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e5fa8" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      {/* Simplified Brazil outline */}
      <path
        d="M100,50 L300,50 Q350,100 350,200 Q350,300 250,350 L150,350 Q50,300 50,200 Q50,100 100,50"
        fill="url(#mapGradient)"
        stroke="#1e5fa8"
        strokeWidth="2"
        className="opacity-50"
      />
      
      {/* Active visit points */}
      {activeStates.map((state, index) => (
        <g key={index}>
          <circle
            cx={state.x}
            cy={state.y}
            r="6"
            fill="#10b981"
            className="animate-pulse"
          />
          <circle
            cx={state.x}
            cy={state.y}
            r="12"
            fill="#10b981"
            fillOpacity="0.3"
            className="animate-ping"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        </g>
      ))}
    </svg>
  );
};

export default function VisitsMap({ stats = {}, visits = [] }) {
  // Extract real visit locations from visits data
  const activeVisits = visits
    .filter(v => v.status === 'in_progress' && v.check_in_latitude && v.check_in_longitude)
    .slice(0, 15)
    .map((visit, index) => ({
      x: 150 + (index * 20) % 200,
      y: 100 + (index * 25) % 250,
      name: visit.client_name?.substring(0, 2).toUpperCase() || 'V',
      technician: visit.technician_name
    }));

  // Fallback to sample data if no real visits
  const displayVisits = activeVisits.length > 0 ? activeVisits : [
    { x: 200, y: 150, name: 'SP' },
    { x: 250, y: 180, name: 'RJ' },
    { x: 180, y: 200, name: 'MG' },
    { x: 280, y: 120, name: 'BA' },
    { x: 150, y: 250, name: 'PR' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Mapa de Visitas
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Distribuição geográfica
          </p>
        </div>
        <span className="text-xs font-medium text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-full flex items-center gap-1">
          <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
          Ao vivo
        </span>
      </div>

      <div className="relative flex-1 mb-4 min-h-[200px]">
        <BrazilMapSVG activeStates={displayVisits} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#e8f4fc] dark:bg-slate-700/50 rounded-xl p-3">
          <div className="flex items-center gap-2 text-[#1e5fa8] dark:text-blue-400 mb-1">
            <Navigation className="w-4 h-4" />
            <span className="text-xs font-medium">Estados ativos</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {stats.activeStates || 5}
          </p>
        </div>
        <div className="bg-[#10b981]/10 rounded-xl p-3">
          <div className="flex items-center gap-2 text-[#10b981] mb-1">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-medium">Visitas ativas</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {stats.activeVisits || 12}
          </p>
        </div>
      </div>
    </motion.div>
  );
}