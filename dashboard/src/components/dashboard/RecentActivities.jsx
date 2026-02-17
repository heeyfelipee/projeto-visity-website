import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  LogIn, 
  LogOut, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  User
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

const activityIcons = {
  check_in: { icon: LogIn, color: 'bg-[#10b981] text-white' },
  check_out: { icon: LogOut, color: 'bg-[#1e5fa8] text-white' },
  visit_created: { icon: MapPin, color: 'bg-blue-500 text-white' },
  visit_completed: { icon: CheckCircle2, color: 'bg-emerald-500 text-white' },
  gps_alert: { icon: AlertTriangle, color: 'bg-amber-500 text-white' },
  default: { icon: Clock, color: 'bg-slate-400 text-white' }
};

export default function RecentActivities({ activities = [] }) {
  const getActivityConfig = (action) => {
    return activityIcons[action] || activityIcons.default;
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Atividades Recentes
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Últimas ações no sistema
          </p>
        </div>
        <span className="text-xs font-medium text-[#1e5fa8] dark:text-blue-400 bg-[#e8f4fc] dark:bg-blue-900/30 px-3 py-1 rounded-full">
          Ao vivo
        </span>
      </div>

      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma atividade recente</p>
          </div>
        ) : (
          activities.map((activity, index) => {
            const config = getActivityConfig(activity.action);
            const Icon = config.icon;
            
            return (
              <motion.div
                key={activity.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
              >
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="bg-[#1e5fa8]/10 text-[#1e5fa8] dark:bg-blue-900/50 dark:text-blue-400 text-sm font-medium">
                    {getInitials(activity.user_name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900 dark:text-white text-sm">
                      {activity.user_name || 'Usuário'}
                    </span>
                    <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", config.color)}>
                      <Icon className="w-3 h-3" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                    {activity.details || activity.action?.replace(/_/g, ' ')}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {moment(activity.created_date).fromNow()}
                  </p>
                </div>

                <div className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0 mt-2",
                  activity.action === 'check_in' ? 'bg-[#10b981]' : 
                  activity.action === 'gps_alert' ? 'bg-amber-500' : 
                  'bg-slate-300 dark:bg-slate-600'
                )} />
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}