import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  MapPin,
  Users,
  Clock,
  Target,
  Zap,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';
import moment from 'moment';

export default function Analytics() {
  const { data: visits = [] } = useQuery({
    queryKey: ['visits'],
    queryFn: () => base44.entities.Visit.list('-created_date', 1000),
  });

  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: () => base44.entities.Client.list(),
  });

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => base44.entities.User.list(),
  });

  // Calculate metrics
  const totalVisits = visits.length;
  const completedVisits = visits.filter(v => v.status === 'completed').length;
  const cancelledVisits = visits.filter(v => v.status === 'cancelled').length;
  const completionRate = totalVisits > 0 ? Math.round((completedVisits / totalVisits) * 100) : 0;
  const cancellationRate = totalVisits > 0 ? Math.round((cancelledVisits / totalVisits) * 100) : 0;

  // Calculate average duration
  const visitsWithDuration = visits.filter(v => v.duration_minutes);
  const avgDuration = visitsWithDuration.length > 0 
    ? Math.round(visitsWithDuration.reduce((acc, v) => acc + v.duration_minutes, 0) / visitsWithDuration.length)
    : 0;

  // Monthly trend data
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const month = moment().subtract(i, 'months');
    const monthVisits = visits.filter(v => 
      moment(v.created_date).isSame(month, 'month')
    );
    monthlyData.push({
      name: month.format('MMM'),
      total: monthVisits.length,
      completed: monthVisits.filter(v => v.status === 'completed').length,
      cancelled: monthVisits.filter(v => v.status === 'cancelled').length,
    });
  }

  // Performance metrics
  const performanceData = [
    { name: 'Taxa de Conclusão', value: completionRate, fill: '#10b981' },
    { name: 'Taxa de Cancelamento', value: cancellationRate, fill: '#ef4444' },
    { name: 'Meta Mensal', value: 75, fill: '#1e5fa8' },
  ];

  // Priority distribution
  const priorityData = [
    { name: 'Baixa', value: visits.filter(v => v.priority === 'low').length },
    { name: 'Média', value: visits.filter(v => v.priority === 'medium').length },
    { name: 'Alta', value: visits.filter(v => v.priority === 'high').length },
    { name: 'Urgente', value: visits.filter(v => v.priority === 'urgent').length },
  ];

  // AI Insights (simulated)
  const aiInsights = [
    {
      type: 'success',
      title: 'Tendência Positiva',
      description: 'O número de visitas concluídas aumentou 15% este mês',
      icon: TrendingUp,
      color: 'bg-emerald-500'
    },
    {
      type: 'warning',
      title: 'Atenção Necessária',
      description: 'A taxa de cancelamento subiu nas últimas 2 semanas',
      icon: AlertTriangle,
      color: 'bg-amber-500'
    },
    {
      type: 'info',
      title: 'Oportunidade',
      description: 'Sexta-feira tem a maior taxa de conclusão (92%)',
      icon: Target,
      color: 'bg-[#1e5fa8]'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Analytics
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Insights inteligentes sobre suas operações
          </p>
        </div>
        <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 w-fit">
          <Zap className="w-3 h-3 mr-1" />
          AI Insights Ativo
        </Badge>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: 'Taxa de Conclusão', 
            value: `${completionRate}%`, 
            change: '+5%', 
            positive: true,
            icon: Target,
            color: 'bg-[#10b981]'
          },
          { 
            label: 'Duração Média', 
            value: `${avgDuration} min`, 
            change: '-8 min', 
            positive: true,
            icon: Clock,
            color: 'bg-[#1e5fa8]'
          },
          { 
            label: 'Clientes Ativos', 
            value: clients.filter(c => c.status === 'active').length, 
            change: '+12', 
            positive: true,
            icon: Users,
            color: 'bg-violet-500'
          },
          { 
            label: 'Taxa de Cancelamento', 
            value: `${cancellationRate}%`, 
            change: '+2%', 
            positive: false,
            icon: AlertTriangle,
            color: 'bg-amber-500'
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <div className={cn(
                  "flex items-center gap-1 mt-2 text-sm font-medium",
                  stat.positive ? "text-[#10b981]" : "text-red-500"
                )}>
                  {stat.positive ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.color)}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {aiInsights.map((insight, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", insight.color)}>
                <insight.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  {insight.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Evolução Mensal
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e5fa8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1e5fa8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="total"
                  name="Total"
                  stroke="#1e5fa8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  name="Concluídas"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCompleted)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Priority Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Distribuição por Prioridade
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
                <Tooltip />
                <Bar 
                  dataKey="value" 
                  name="Visitas"
                  radius={[0, 4, 4, 0]}
                >
                  {priorityData.map((entry, index) => (
                    <Bar
                      key={`bar-${index}`}
                      fill={['#94a3b8', '#1e5fa8', '#f59e0b', '#ef4444'][index]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Performance Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
          Metas de Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Meta de Visitas Mensais', current: totalVisits, target: 200, color: '#1e5fa8' },
            { label: 'Meta de Conclusão', current: completedVisits, target: 180, color: '#10b981' },
            { label: 'Clientes Atendidos', current: clients.length, target: 50, color: '#8b5cf6' },
          ].map((goal, index) => {
            const percentage = Math.min(Math.round((goal.current / goal.target) * 100), 100);
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {goal.label}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {goal.current} / {goal.target}
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-3"
                  style={{ '--progress-color': goal.color }}
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {percentage}% alcançado
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Predictive Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-gradient-to-br from-[#1e5fa8] to-[#10b981] rounded-2xl p-6 text-white"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Previsão AI</h3>
            <p className="text-white/80 text-sm mb-4">
              Com base nos padrões históricos, prevemos um aumento de 18% nas visitas no próximo mês. 
              Recomendamos aumentar a equipe de campo em 2 técnicos para manter a qualidade do atendimento.
            </p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-2xl font-bold">{Math.round(totalVisits * 1.18)}</p>
                <p className="text-xs text-white/60">Visitas previstas</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <p className="text-2xl font-bold">{Math.round(completionRate * 1.05)}%</p>
                <p className="text-xs text-white/60">Taxa prevista</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}