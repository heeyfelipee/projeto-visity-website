import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Edit,
  Award,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export default function Profile() {
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
    queryFn: () => base44.entities.Visit.list('-created_date', 500),
  });

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const userVisits = visits.filter(v => v.technician_email === user?.email);
  const completedVisits = userVisits.filter(v => v.status === 'completed').length;
  const totalVisits = userVisits.length;
  const completionRate = totalVisits > 0 ? Math.round((completedVisits / totalVisits) * 100) : 0;

  // Recent activity
  const recentVisits = userVisits.slice(0, 5);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1e5fa8] to-[#10b981] p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
              <AvatarFallback className="bg-white text-[#1e5fa8] text-3xl font-bold">
                {getInitials(user?.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left text-white">
              <h1 className="text-2xl font-bold">{user?.full_name || 'Seu Nome'}</h1>
              <p className="text-white/80">{user?.email}</p>
              <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
                <Badge className="bg-white/20 text-white border-0">
                  {user?.role === 'admin' ? 'Administrador' : 'Técnico de Campo'}
                </Badge>
                <Badge className="bg-white/20 text-white border-0">
                  <Calendar className="w-3 h-3 mr-1" />
                  Desde {moment(user?.created_date).format('MMM YYYY')}
                </Badge>
              </div>
            </div>
            <div className="sm:ml-auto">
              <Link to={createPageUrl('Settings')}>
                <Button variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-700 border-b border-slate-200 dark:border-slate-700">
          <div className="p-6 text-center">
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalVisits}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Total de Visitas</p>
          </div>
          <div className="p-6 text-center">
            <p className="text-3xl font-bold text-[#10b981]">{completedVisits}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Concluídas</p>
          </div>
          <div className="p-6 text-center">
            <p className="text-3xl font-bold text-[#1e5fa8]">{completionRate}%</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Taxa de Conclusão</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Informações de Contato
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#1e5fa8]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#1e5fa8]" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                <p className="font-medium text-slate-900 dark:text-white">{user?.email || '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#10b981]" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Telefone</p>
                <p className="font-medium text-slate-900 dark:text-white">{user?.phone || '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Empresa</p>
                <p className="font-medium text-slate-900 dark:text-white">{user?.company || '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Endereço</p>
                <p className="font-medium text-slate-900 dark:text-white truncate">{user?.address || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Performance & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Performance
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Taxa de Conclusão</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Meta Mensal</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {totalVisits} / 50
                </span>
              </div>
              <Progress value={Math.min((totalVisits / 50) * 100, 100)} className="h-2" />
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-[#10b981] mx-auto mb-1" />
                  <p className="text-xl font-bold text-slate-900 dark:text-white">+12%</p>
                  <p className="text-xs text-slate-500">vs. mês anterior</p>
                </div>
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <Clock className="w-6 h-6 text-[#1e5fa8] mx-auto mb-1" />
                  <p className="text-xl font-bold text-slate-900 dark:text-white">45 min</p>
                  <p className="text-xs text-slate-500">duração média</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            Atividade Recente
          </h3>

          {recentVisits.length === 0 ? (
            <p className="text-center py-8 text-slate-500 dark:text-slate-400">
              Nenhuma visita registrada
            </p>
          ) : (
            <div className="space-y-4">
              {recentVisits.map((visit, index) => (
                <div
                  key={visit.id || index}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    visit.status === 'completed' ? 'bg-[#10b981]/10 text-[#10b981]' :
                    visit.status === 'in_progress' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-[#1e5fa8]/10 text-[#1e5fa8]'
                  )}>
                    {visit.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <MapPin className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate">
                      {visit.client_name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {moment(visit.scheduled_date || visit.created_date).format('DD/MM/YYYY')}
                    </p>
                  </div>
                  <Badge className={cn(
                    visit.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                    visit.status === 'in_progress' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  )}>
                    {visit.status === 'completed' ? 'Concluída' :
                     visit.status === 'in_progress' ? 'Em Andamento' : 'Agendada'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}