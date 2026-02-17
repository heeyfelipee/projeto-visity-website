import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity,
  Search,
  Filter,
  MapPin,
  LogIn,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Calendar,
  User,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

const activityConfig = {
  check_in: { icon: LogIn, color: 'bg-[#10b981] text-white', label: 'Check-in' },
  check_out: { icon: LogOut, color: 'bg-[#1e5fa8] text-white', label: 'Check-out' },
  visit_created: { icon: MapPin, color: 'bg-blue-500 text-white', label: 'Visita Criada' },
  visit_updated: { icon: FileText, color: 'bg-violet-500 text-white', label: 'Visita Atualizada' },
  visit_cancelled: { icon: AlertTriangle, color: 'bg-red-500 text-white', label: 'Visita Cancelada' },
  user_login: { icon: User, color: 'bg-slate-500 text-white', label: 'Login' },
  user_logout: { icon: User, color: 'bg-slate-400 text-white', label: 'Logout' },
  report_generated: { icon: FileText, color: 'bg-amber-500 text-white', label: 'Relatório Gerado' },
  settings_changed: { icon: Activity, color: 'bg-purple-500 text-white', label: 'Config. Alterada' },
  gps_alert: { icon: AlertTriangle, color: 'bg-amber-500 text-white', label: 'Alerta GPS' },
};

export default function Activities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: () => base44.entities.ActivityLog.list('-created_date', 200),
  });

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const filterByDate = (activity) => {
    if (dateFilter === 'all') return true;
    const activityDate = moment(activity.created_date);
    const today = moment().startOf('day');
    
    switch (dateFilter) {
      case 'today':
        return activityDate.isSame(today, 'day');
      case 'week':
        return activityDate.isAfter(moment().subtract(7, 'days'));
      case 'month':
        return activityDate.isAfter(moment().subtract(30, 'days'));
      default:
        return true;
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || activity.action === actionFilter;
    const matchesDate = filterByDate(activity);
    return matchesSearch && matchesAction && matchesDate;
  });

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = moment(activity.created_date).format('YYYY-MM-DD');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {});

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
            Atividades
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Histórico completo de ações no sistema
          </p>
        </div>
        <Badge className="bg-[#10b981]/10 text-[#10b981] w-fit">
          <span className="w-2 h-2 bg-[#10b981] rounded-full mr-2 animate-pulse" />
          Ao vivo
        </Badge>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Buscar atividades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-50 dark:bg-slate-700 border-0"
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-slate-50 dark:bg-slate-700 border-0">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Ação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as ações</SelectItem>
            <SelectItem value="check_in">Check-in</SelectItem>
            <SelectItem value="check_out">Check-out</SelectItem>
            <SelectItem value="visit_created">Visita Criada</SelectItem>
            <SelectItem value="visit_updated">Visita Atualizada</SelectItem>
            <SelectItem value="gps_alert">Alerta GPS</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-slate-50 dark:bg-slate-700 border-0">
            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todo período</SelectItem>
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="week">Última semana</SelectItem>
            <SelectItem value="month">Último mês</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Check-ins', count: activities.filter(a => a.action === 'check_in').length, icon: LogIn, color: 'bg-[#10b981]' },
          { label: 'Check-outs', count: activities.filter(a => a.action === 'check_out').length, icon: LogOut, color: 'bg-[#1e5fa8]' },
          { label: 'Visitas Criadas', count: activities.filter(a => a.action === 'visit_created').length, icon: MapPin, color: 'bg-violet-500' },
          { label: 'Alertas', count: activities.filter(a => a.action === 'gps_alert').length, icon: AlertTriangle, color: 'bg-amber-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.color)}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.count}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activities Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">
            <Clock className="w-8 h-8 mx-auto mb-2 animate-spin" />
            Carregando atividades...
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium">Nenhuma atividade encontrada</p>
            <p className="text-sm">As atividades aparecerão aqui</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {Object.entries(groupedActivities).map(([date, dayActivities]) => (
              <div key={date}>
                <div className="px-6 py-3 bg-slate-50 dark:bg-slate-700/50 sticky top-0">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 capitalize">
                    {moment(date).calendar(null, {
                      sameDay: '[Hoje]',
                      lastDay: '[Ontem]',
                      lastWeek: 'dddd',
                      sameElse: 'DD [de] MMMM'
                    })}
                  </span>
                </div>
                <AnimatePresence>
                  {dayActivities.map((activity, index) => {
                    const config = activityConfig[activity.action] || { 
                      icon: Activity, 
                      color: 'bg-slate-500 text-white', 
                      label: activity.action 
                    };
                    const Icon = config.icon;
                    
                    return (
                      <motion.div
                        key={activity.id || index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.02 }}
                        className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarFallback className="bg-[#1e5fa8]/10 text-[#1e5fa8] dark:bg-blue-900/50 dark:text-blue-400 text-sm font-medium">
                              {getInitials(activity.user_name)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-slate-900 dark:text-white">
                                {activity.user_name || 'Usuário'}
                              </span>
                              <Badge className={cn("text-xs", config.color)}>
                                <Icon className="w-3 h-3 mr-1" />
                                {config.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {activity.details || `Realizou ${config.label.toLowerCase()}`}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                              {moment(activity.created_date).format('HH:mm')}
                            </p>
                          </div>

                          <div className={cn(
                            "w-2 h-2 rounded-full flex-shrink-0 mt-2",
                            activity.action === 'check_in' ? 'bg-[#10b981]' :
                            activity.action === 'gps_alert' ? 'bg-amber-500 animate-pulse' :
                            'bg-slate-300 dark:bg-slate-600'
                          )} />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}