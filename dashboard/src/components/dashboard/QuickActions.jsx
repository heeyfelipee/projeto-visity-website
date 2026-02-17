import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { 
  Plus, 
  FileText, 
  Users, 
  Calendar,
  Download,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const actions = [
  {
    title: 'Nova Visita',
    description: 'Agendar nova visita',
    icon: Plus,
    color: 'bg-[#1e5fa8] hover:bg-[#164a85]',
    page: 'Visits',
    params: '?action=new'
  },
  {
    title: 'Novo Cliente',
    description: 'Cadastrar cliente',
    icon: Users,
    color: 'bg-[#10b981] hover:bg-emerald-600',
    page: 'Clients',
    params: '?action=new'
  },
  {
    title: 'Gerar Relatório',
    description: 'Exportar dados',
    icon: FileText,
    color: 'bg-violet-500 hover:bg-violet-600',
    page: 'Reports'
  },
  {
    title: 'Ver Agenda',
    description: 'Visitas do dia',
    icon: Calendar,
    color: 'bg-amber-500 hover:bg-amber-600',
    page: 'Schedule'
  }
];

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Ações Rápidas
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link
            key={action.title}
            to={createPageUrl(action.page) + (action.params || '')}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`${action.color} rounded-xl p-4 text-white cursor-pointer transition-all shadow-lg hover:shadow-xl`}
            >
              <action.icon className="w-6 h-6 mb-2" />
              <p className="font-medium text-sm">{action.title}</p>
              <p className="text-xs opacity-80">{action.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}