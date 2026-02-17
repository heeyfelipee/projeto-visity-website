import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award } from 'lucide-react';

export default function TeamPerformance({ members = [] }) {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'bg-[#10b981]';
    if (performance >= 70) return 'bg-[#1e5fa8]';
    if (performance >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Desempenho da Equipe
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Ranking por visitas concluídas
          </p>
        </div>
        <Award className="w-5 h-5 text-amber-500" />
      </div>

      <div className="space-y-4">
        {members.length === 0 ? (
          <p className="text-center py-8 text-slate-500 dark:text-slate-400">
            Nenhum dado de equipe disponível
          </p>
        ) : (
          members.map((member, index) => (
            <motion.div
              key={member.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-[#1e5fa8]/10 text-[#1e5fa8] dark:bg-blue-900/50 dark:text-blue-400 font-medium">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                {index < 3 && (
                  <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                    index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-slate-400' : 'bg-amber-600'
                  }`}>
                    {index + 1}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-slate-900 dark:text-white text-sm truncate">
                    {member.name}
                  </span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {member.visits} visitas
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress 
                    value={member.performance || 0} 
                    className="h-2 flex-1" 
                  />
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full text-white ${getPerformanceColor(member.performance)}`}>
                    {member.performance}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}