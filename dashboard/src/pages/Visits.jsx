import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  User,
  Building2,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Navigation
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

const statusConfig = {
  scheduled: { label: 'Agendada', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Calendar },
  in_progress: { label: 'Em Andamento', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', icon: Clock },
  completed: { label: 'Concluída', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', icon: CheckCircle2 },
  cancelled: { label: 'Cancelada', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: XCircle },
};

const priorityConfig = {
  low: { label: 'Baixa', color: 'bg-slate-100 text-slate-600' },
  medium: { label: 'Média', color: 'bg-blue-100 text-blue-600' },
  high: { label: 'Alta', color: 'bg-orange-100 text-orange-600' },
  urgent: { label: 'Urgente', color: 'bg-red-100 text-red-600' },
};

export default function Visits() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState(null);
  const [formData, setFormData] = useState({
    client_name: '',
    client_address: '',
    technician_name: '',
    technician_email: '',
    status: 'scheduled',
    priority: 'medium',
    scheduled_date: '',
    notes: ''
  });

  const queryClient = useQueryClient();

  const { data: visits = [], isLoading } = useQuery({
    queryKey: ['visits'],
    queryFn: () => base44.entities.Visit.list('-created_date', 100),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Visit.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] });
      handleCloseDialog();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Visit.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] });
      handleCloseDialog();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Visit.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] });
    },
  });

  const handleOpenDialog = (visit = null) => {
    if (visit) {
      setEditingVisit(visit);
      setFormData({
        client_name: visit.client_name || '',
        client_address: visit.client_address || '',
        technician_name: visit.technician_name || '',
        technician_email: visit.technician_email || '',
        status: visit.status || 'scheduled',
        priority: visit.priority || 'medium',
        scheduled_date: visit.scheduled_date || '',
        notes: visit.notes || ''
      });
    } else {
      setEditingVisit(null);
      setFormData({
        client_name: '',
        client_address: '',
        technician_name: '',
        technician_email: '',
        status: 'scheduled',
        priority: 'medium',
        scheduled_date: '',
        notes: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingVisit(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingVisit) {
      updateMutation.mutate({ id: editingVisit.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredVisits = visits.filter(visit => {
    const matchesSearch = 
      visit.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.technician_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || visit.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
            Visitas
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gerencie todas as suas visitas em um só lugar
          </p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()}
          className="bg-[#1e5fa8] hover:bg-[#164a85] shadow-lg shadow-[#1e5fa8]/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Visita
        </Button>
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
            placeholder="Buscar por cliente ou técnico..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-50 dark:bg-slate-700 border-0"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-slate-50 dark:bg-slate-700 border-0">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="scheduled">Agendadas</SelectItem>
            <SelectItem value="in_progress">Em Andamento</SelectItem>
            <SelectItem value="completed">Concluídas</SelectItem>
            <SelectItem value="cancelled">Canceladas</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([key, config], index) => {
          const count = visits.filter(v => v.status === key).length;
          const Icon = config.icon;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => setStatusFilter(statusFilter === key ? 'all' : key)}
              className={cn(
                "bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 cursor-pointer transition-all hover:shadow-md",
                statusFilter === key && "ring-2 ring-[#1e5fa8]"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{count}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{config.label}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Visits List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">
            <Clock className="w-8 h-8 mx-auto mb-2 animate-spin" />
            Carregando visitas...
          </div>
        ) : filteredVisits.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium">Nenhuma visita encontrada</p>
            <p className="text-sm">Crie uma nova visita para começar</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            <AnimatePresence>
              {filteredVisits.map((visit, index) => {
                const status = statusConfig[visit.status] || statusConfig.scheduled;
                const priority = priorityConfig[visit.priority] || priorityConfig.medium;
                const StatusIcon = status.icon;
                
                return (
                  <motion.div
                    key={visit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.03 }}
                    className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", status.color)}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                              {visit.client_name}
                            </h3>
                            <Badge className={status.color}>
                              {status.label}
                            </Badge>
                            <Badge className={priority.color}>
                              {priority.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400 flex-wrap">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {visit.technician_name || 'Não atribuído'}
                            </span>
                            {visit.client_address && (
                              <span className="flex items-center gap-1">
                                <Navigation className="w-4 h-4" />
                                {visit.client_address}
                              </span>
                            )}
                            {visit.scheduled_date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {moment(visit.scheduled_date).format('DD/MM/YYYY')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenDialog(visit)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => deleteMutation.mutate(visit.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingVisit ? 'Editar Visita' : 'Nova Visita'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Cliente</Label>
                <Input
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="Nome do cliente"
                  required
                />
              </div>
              <div className="col-span-2">
                <Label>Endereço</Label>
                <Input
                  value={formData.client_address}
                  onChange={(e) => setFormData({ ...formData, client_address: e.target.value })}
                  placeholder="Endereço da visita"
                />
              </div>
              <div>
                <Label>Técnico</Label>
                <Input
                  value={formData.technician_name}
                  onChange={(e) => setFormData({ ...formData, technician_name: e.target.value })}
                  placeholder="Nome do técnico"
                  required
                />
              </div>
              <div>
                <Label>Email do Técnico</Label>
                <Input
                  type="email"
                  value={formData.technician_email}
                  onChange={(e) => setFormData({ ...formData, technician_email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Agendada</SelectItem>
                    <SelectItem value="in_progress">Em Andamento</SelectItem>
                    <SelectItem value="completed">Concluída</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Prioridade</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label>Data Agendada</Label>
                <Input
                  type="date"
                  value={formData.scheduled_date}
                  onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label>Observações</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Notas adicionais sobre a visita..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-[#1e5fa8] hover:bg-[#164a85]"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editingVisit ? 'Salvar Alterações' : 'Criar Visita'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}