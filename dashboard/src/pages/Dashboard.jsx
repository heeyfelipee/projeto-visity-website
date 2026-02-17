import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  Calendar,
  AlertTriangle
} from 'lucide-react';

import KPICard from '../components/dashboard/KPICard';
import VisitsChart from '../components/dashboard/VisitsChart';
import RecentActivities from '../components/dashboard/RecentActivities';
import TeamPerformance from '../components/dashboard/TeamPerformance';
import VisitsMap from '../components/dashboard/VisitsMap';
import QuickActions from '../components/dashboard/QuickActions';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {
        console.log('User not logged in');
      }
    };
    loadUser();
  }, []);

  const { data: visits = [] } = useQuery({
    queryKey: ['visits'],
    queryFn: () => base44.entities.Visit.list('-created_date', 100),
  });

  const { data: activities = [] } = useQuery({
    queryKey: ['activities'],
    queryFn: () => base44.entities.ActivityLog.list('-created_date', 15),
  });

  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: () => base44.entities.Client.list(),
  });

  // Calculate KPIs
  const totalVisits = visits.length;
  const completedVisits = visits.filter(v => v.status === 'completed').length;
  const inProgressVisits = visits.filter(v => v.status === 'in_progress').length;
  const scheduledVisits = visits.filter(v => v.status === 'scheduled').length;
  
  const today = new Date().toISOString().split('T')[0];
  const todayVisits = visits.filter(v => 
    v.scheduled_date === today || 
    (v.check_in_time && v.check_in_time.startsWith(today))
  ).length;

  // Chart data
  const chartData = [
    { name: 'Seg', completed: 12, scheduled: 8 },
    { name: 'Ter', completed: 19, scheduled: 15 },
    { name: 'Qua', completed: 15, scheduled: 12 },
    { name: 'Qui', completed: 22, scheduled: 18 },
    { name: 'Sex', completed: 28, scheduled: 20 },
    { name: 'Sáb', completed: 8, scheduled: 5 },
    { name: 'Dom', completed: 3, scheduled: 2 },
  ];

  // Team performance data
  const teamPerformance = [
    { id: 1, name: 'Carlos Moreira', visits: 45, performance: 95 },
    { id: 2, name: 'Ana Pereira', visits: 42, performance: 88 },
    { id: 3, name: 'João Silva', visits: 38, performance: 82 },
    { id: 4, name: 'Maria Santos', visits: 35, performance: 78 },
    { id: 5, name: 'Pedro Costa', visits: 30, performance: 72 },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
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
            {getGreeting()}, {user?.full_name?.split(' ')[0] || 'Usuário'}! 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Aqui está o resumo das suas atividades de hoje
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total de Visitas"
          value={totalVisits.toLocaleString('pt-BR')}
          change="+12%"
          changeType="increase"
          icon={MapPin}
          iconColor="bg-[#1e5fa8]"
          delay={0}
        />
        <KPICard
          title="Visitas Hoje"
          value={todayVisits.toLocaleString('pt-BR')}
          change="+5%"
          changeType="increase"
          icon={Calendar}
          iconColor="bg-[#10b981]"
          delay={0.1}
        />
        <KPICard
          title="Em Andamento"
          value={inProgressVisits.toLocaleString('pt-BR')}
          icon={Clock}
          iconColor="bg-amber-500"
          delay={0.2}
        />
        <KPICard
          title="Concluídas"
          value={completedVisits.toLocaleString('pt-BR')}
          change="+8%"
          changeType="increase"
          icon={CheckCircle2}
          iconColor="bg-violet-500"
          delay={0.3}
        />
      </div>

      {/* Charts and Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VisitsChart data={chartData} />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <VisitsMap 
            visits={visits}
            stats={{
              activeStates: 5,
              activeVisits: inProgressVisits || 12
            }} 
          />
        </div>
      </div>

      {/* Activities and Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities activities={activities} />
        <TeamPerformance members={teamPerformance} />
      </div>

      {/* Alerts Section */}
      {scheduledVisits > 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-amber-900 dark:text-amber-100">
              Atenção: {scheduledVisits} visitas pendentes
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Você tem visitas agendadas que ainda não foram iniciadas
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}