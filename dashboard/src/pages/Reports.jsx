import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar,
  MapPin,
  Users,
  Clock,
  TrendingUp,
  BarChart3,
  PieChart,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

const COLORS = ['#1e5fa8', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Reports() {
  const [dateFrom, setDateFrom] = useState(moment().subtract(30, 'days').format('YYYY-MM-DD'));
  const [dateTo, setDateTo] = useState(moment().format('YYYY-MM-DD'));
  const [reportType, setReportType] = useState('overview');

  const { data: visits = [] } = useQuery({
    queryKey: ['visits'],
    queryFn: () => base44.entities.Visit.list('-created_date', 500),
  });

  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: () => base44.entities.Client.list(),
  });

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => base44.entities.User.list(),
  });

  // Filter visits by date range
  const filteredVisits = visits.filter(visit => {
    const visitDate = visit.scheduled_date || visit.created_date?.split('T')[0];
    return visitDate >= dateFrom && visitDate <= dateTo;
  });

  // Calculate stats
  const totalVisits = filteredVisits.length;
  const completedVisits = filteredVisits.filter(v => v.status === 'completed').length;
  const cancelledVisits = filteredVisits.filter(v => v.status === 'cancelled').length;
  const completionRate = totalVisits > 0 ? Math.round((completedVisits / totalVisits) * 100) : 0;

  // Calculate average duration
  const visitsWithDuration = filteredVisits.filter(v => v.duration_minutes);
  const avgDuration = visitsWithDuration.length > 0 
    ? Math.round(visitsWithDuration.reduce((acc, v) => acc + v.duration_minutes, 0) / visitsWithDuration.length)
    : 0;

  // Status distribution
  const statusData = [
    { name: 'Concluídas', value: filteredVisits.filter(v => v.status === 'completed').length },
    { name: 'Em Andamento', value: filteredVisits.filter(v => v.status === 'in_progress').length },
    { name: 'Agendadas', value: filteredVisits.filter(v => v.status === 'scheduled').length },
    { name: 'Canceladas', value: filteredVisits.filter(v => v.status === 'cancelled').length },
  ].filter(d => d.value > 0);

  // Visits by day of week
  const dayOfWeekData = [
    { name: 'Seg', visits: 0 },
    { name: 'Ter', visits: 0 },
    { name: 'Qua', visits: 0 },
    { name: 'Qui', visits: 0 },
    { name: 'Sex', visits: 0 },
    { name: 'Sáb', visits: 0 },
    { name: 'Dom', visits: 0 },
  ];

  filteredVisits.forEach(visit => {
    const date = visit.scheduled_date || visit.created_date?.split('T')[0];
    if (date) {
      const dayIndex = moment(date).day();
      const mappedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
      if (dayOfWeekData[mappedIndex]) {
        dayOfWeekData[mappedIndex].visits++;
      }
    }
  });

  // Visits trend by week
  const trendData = [];
  let currentDate = moment(dateFrom);
  while (currentDate.isSameOrBefore(dateTo)) {
    const weekStart = currentDate.clone().startOf('week');
    const weekEnd = currentDate.clone().endOf('week');
    const weekVisits = filteredVisits.filter(v => {
      const visitDate = v.scheduled_date || v.created_date?.split('T')[0];
      return moment(visitDate).isBetween(weekStart, weekEnd, null, '[]');
    });
    
    trendData.push({
      name: weekStart.format('DD/MM'),
      total: weekVisits.length,
      completed: weekVisits.filter(v => v.status === 'completed').length,
    });
    
    currentDate.add(1, 'week');
  }

  // Top technicians
  const technicianStats = {};
  filteredVisits.forEach(visit => {
    const tech = visit.technician_name || 'Não atribuído';
    if (!technicianStats[tech]) {
      technicianStats[tech] = { total: 0, completed: 0 };
    }
    technicianStats[tech].total++;
    if (visit.status === 'completed') {
      technicianStats[tech].completed++;
    }
  });

  const topTechnicians = Object.entries(technicianStats)
    .map(([name, stats]) => ({
      name,
      total: stats.total,
      completed: stats.completed,
      rate: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
    }))
    .sort((a, b) => b.completed - a.completed)
    .slice(0, 5);

  const exportReport = () => {
    const reportData = {
      period: { from: dateFrom, to: dateTo },
      summary: {
        totalVisits,
        completedVisits,
        cancelledVisits,
        completionRate,
        avgDuration
      },
      technicians: topTechnicians,
      statusDistribution: statusData
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-visitas-${dateFrom}-${dateTo}.json`;
    a.click();
  };

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
            Relatórios
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Análise completa das suas operações
          </p>
        </div>
        <Button 
          onClick={exportReport}
          className="bg-[#1e5fa8] hover:bg-[#164a85] shadow-lg shadow-[#1e5fa8]/20"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-600 dark:text-slate-400">De:</span>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-40 bg-slate-50 dark:bg-slate-700 border-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400">Até:</span>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-40 bg-slate-50 dark:bg-slate-700 border-0"
          />
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total de Visitas', value: totalVisits, icon: MapPin, color: 'bg-[#1e5fa8]' },
          { label: 'Concluídas', value: completedVisits, icon: TrendingUp, color: 'bg-[#10b981]' },
          { label: 'Canceladas', value: cancelledVisits, icon: Clock, color: 'bg-red-500' },
          { label: 'Taxa de Conclusão', value: `${completionRate}%`, icon: BarChart3, color: 'bg-violet-500' },
          { label: 'Duração Média', value: `${avgDuration} min`, icon: Clock, color: 'bg-amber-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visits Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Tendência de Visitas
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  name="Total"
                  stroke="#1e5fa8" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  name="Concluídas"
                  stroke="#10b981" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Distribuição por Status
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Visits by Day */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Visitas por Dia da Semana
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dayOfWeekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="visits" name="Visitas" fill="#1e5fa8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Top Technicians */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Top Técnicos
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Técnico</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Total</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Concluídas</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Taxa</th>
              </tr>
            </thead>
            <tbody>
              {topTechnicians.map((tech, index) => (
                <tr key={tech.name} className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1e5fa8]/10 flex items-center justify-center text-[#1e5fa8] font-medium text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">{tech.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-400">{tech.total}</td>
                  <td className="py-3 px-4 text-center text-[#10b981] font-medium">{tech.completed}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tech.rate >= 80 ? 'bg-emerald-100 text-emerald-700' :
                      tech.rate >= 60 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tech.rate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}