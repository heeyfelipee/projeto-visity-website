import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  MapPin,
  User,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

const statusColors = {
  scheduled: 'bg-blue-500',
  in_progress: 'bg-amber-500',
  completed: 'bg-emerald-500',
  cancelled: 'bg-red-500',
};

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [view, setView] = useState('month'); // 'month' or 'week'

  const { data: visits = [] } = useQuery({
    queryKey: ['visits'],
    queryFn: () => base44.entities.Visit.list('-created_date', 500),
  });

  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.clone().startOf('month').day();
  const lastDayOfMonth = currentDate.clone().endOf('month').day();

  const getVisitsForDate = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    return visits.filter(v => v.scheduled_date === dateStr);
  };

  const generateCalendarDays = () => {
    const days = [];
    const startDate = currentDate.clone().startOf('month').startOf('week');
    const endDate = currentDate.clone().endOf('month').endOf('week');

    let day = startDate.clone();
    while (day.isSameOrBefore(endDate)) {
      days.push(day.clone());
      day.add(1, 'day');
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const goToPrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  const goToToday = () => {
    setCurrentDate(moment());
  };

  const todayVisits = getVisitsForDate(moment());
  const upcomingVisits = visits
    .filter(v => moment(v.scheduled_date).isAfter(moment()) && v.status === 'scheduled')
    .slice(0, 5);

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
            Agenda
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Visualize e gerencie as visitas agendadas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={goToToday}>
            Hoje
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Calendar Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={goToPrevMonth}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white capitalize">
                {currentDate.format('MMMM YYYY')}
              </h2>
              <Button variant="ghost" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-700">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div 
                key={day} 
                className="py-3 text-center text-sm font-medium text-slate-500 dark:text-slate-400"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const isCurrentMonth = day.month() === currentDate.month();
              const isToday = day.isSame(moment(), 'day');
              const dayVisits = getVisitsForDate(day);
              
              return (
                <div
                  key={index}
                  className={cn(
                    "min-h-24 p-2 border-b border-r border-slate-100 dark:border-slate-700/50 transition-colors",
                    !isCurrentMonth && "bg-slate-50 dark:bg-slate-800/50",
                    isToday && "bg-[#1e5fa8]/5"
                  )}
                >
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium mb-1",
                    isToday && "bg-[#1e5fa8] text-white",
                    !isCurrentMonth && "text-slate-400 dark:text-slate-600",
                    isCurrentMonth && !isToday && "text-slate-700 dark:text-slate-300"
                  )}>
                    {day.date()}
                  </div>
                  <div className="space-y-1">
                    {dayVisits.slice(0, 3).map((visit, vIndex) => (
                      <div
                        key={vIndex}
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded truncate text-white",
                          statusColors[visit.status] || statusColors.scheduled
                        )}
                        title={visit.client_name}
                      >
                        {visit.client_name}
                      </div>
                    ))}
                    {dayVisits.length > 3 && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 px-1">
                        +{dayVisits.length - 3} mais
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Visits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="w-5 h-5 text-[#1e5fa8]" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Hoje</h3>
              <Badge className="ml-auto bg-[#1e5fa8]/10 text-[#1e5fa8]">
                {todayVisits.length}
              </Badge>
            </div>
            
            {todayVisits.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                Nenhuma visita agendada para hoje
              </p>
            ) : (
              <div className="space-y-3">
                {todayVisits.map((visit, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50"
                  >
                    <div className="flex items-start gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-1.5",
                        statusColors[visit.status]
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-900 dark:text-white truncate">
                          {visit.client_name}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                          <User className="w-3 h-3" />
                          <span className="truncate">{visit.technician_name || 'Não atribuído'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Upcoming Visits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[#10b981]" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Próximas</h3>
            </div>
            
            {upcomingVisits.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                Nenhuma visita futura agendada
              </p>
            ) : (
              <div className="space-y-3">
                {upcomingVisits.map((visit, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50"
                  >
                    <p className="font-medium text-sm text-slate-900 dark:text-white truncate">
                      {visit.client_name}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{moment(visit.scheduled_date).format('DD/MM/YYYY')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Legenda</h3>
            <div className="space-y-2">
              {[
                { status: 'scheduled', label: 'Agendada' },
                { status: 'in_progress', label: 'Em Andamento' },
                { status: 'completed', label: 'Concluída' },
                { status: 'cancelled', label: 'Cancelada' },
              ].map((item) => (
                <div key={item.status} className="flex items-center gap-2 text-sm">
                  <div className={cn("w-3 h-3 rounded", statusColors[item.status])} />
                  <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}