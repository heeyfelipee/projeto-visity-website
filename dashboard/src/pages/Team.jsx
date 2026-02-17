import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Users,
  Mail,
  Shield,
  ShieldCheck,
  MoreVertical,
  Edit,
  Trash2,
  UserPlus,
  Crown,
  MapPin,
  Calendar
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
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import moment from 'moment';

export default function Team() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isAddCollaboratorOpen, setIsAddCollaboratorOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('user');
  const [currentUser, setCurrentUser] = useState(null);
  const [collaboratorForm, setCollaboratorForm] = useState({
    full_name: '',
    email: '',
    password: '',
    position: '',
    city: '',
    state: '',
    phone: '',
    role: 'user',
    permissions: {
      dashboard_access: false,
      app_access: true,
      download_reports: false,
      view_all_visits: false,
      view_sensitive_data: false
    }
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setCurrentUser(userData);
      } catch (e) {
        console.log('User not logged in');
      }
    };
    loadUser();
  }, []);

  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => base44.entities.User.list('-created_date', 100),
  });

  const { data: visits = [] } = useQuery({
    queryKey: ['visits'],
    queryFn: () => base44.entities.Visit.list('-created_date', 500),
  });

  const handleInviteUser = async () => {
    try {
      await base44.users.inviteUser(inviteEmail, inviteRole);
      setIsInviteDialogOpen(false);
      setInviteEmail('');
      setInviteRole('user');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    } catch (error) {
      console.error('Error inviting user:', error);
    }
  };

  const handleAddCollaborator = async () => {
    try {
      // Create user with full details
      await base44.users.inviteUser(collaboratorForm.email, collaboratorForm.role);
      
      // Update user with additional information
      const users = await base44.entities.User.filter({ email: collaboratorForm.email });
      if (users.length > 0) {
        await base44.entities.User.update(users[0].id, {
          position: collaboratorForm.position,
          city: collaboratorForm.city,
          state: collaboratorForm.state,
          phone: collaboratorForm.phone,
          permissions: collaboratorForm.permissions,
          status: 'active'
        });
      }
      
      setIsAddCollaboratorOpen(false);
      setCollaboratorForm({
        full_name: '',
        email: '',
        password: '',
        position: '',
        city: '',
        state: '',
        phone: '',
        role: 'user',
        permissions: {
          dashboard_access: false,
          app_access: true,
          download_reports: false,
          view_all_visits: false,
          view_sensitive_data: false
        }
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    } catch (error) {
      console.error('Error adding collaborator:', error);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getUserVisits = (email) => {
    return visits.filter(v => v.technician_email === email).length;
  };

  const getUserCompletedVisits = (email) => {
    return visits.filter(v => v.technician_email === email && v.status === 'completed').length;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const isAdmin = currentUser?.role === 'admin';

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
            Equipe
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gerencie os membros da sua equipe
          </p>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsAddCollaboratorOpen(true)}
              className="bg-[#10b981] hover:bg-[#059669] shadow-lg shadow-[#10b981]/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Colaborador
            </Button>
            <Button 
              onClick={() => setIsInviteDialogOpen(true)}
              className="bg-[#1e5fa8] hover:bg-[#164a85] shadow-lg shadow-[#1e5fa8]/20"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Convidar Membro
            </Button>
          </div>
        )}
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
            placeholder="Buscar membros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-50 dark:bg-slate-700 border-0"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-slate-50 dark:bg-slate-700 border-0">
            <SelectValue placeholder="Função" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as funções</SelectItem>
            <SelectItem value="admin">Administradores</SelectItem>
            <SelectItem value="user">Usuários</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#1e5fa8]/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#1e5fa8]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{users.length}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Total de Membros</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Crown className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {users.filter(u => u.role === 'admin').length}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Administradores</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#10b981]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {visits.filter(v => v.status === 'completed').length}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Visitas Realizadas</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Team Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-slate-500">
          Carregando equipe...
        </div>
      ) : filteredUsers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-12 border border-slate-200 dark:border-slate-700 text-center"
        >
          <Users className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Nenhum membro encontrado
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Convide membros para sua equipe
          </p>
          {isAdmin && (
            <Button 
              onClick={() => setIsInviteDialogOpen(true)}
              className="bg-[#1e5fa8] hover:bg-[#164a85]"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Convidar Membro
            </Button>
          )}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredUsers.map((user, index) => {
              const totalVisits = getUserVisits(user.email);
              const completedVisits = getUserCompletedVisits(user.email);
              const performance = totalVisits > 0 ? Math.round((completedVisits / totalVisits) * 100) : 0;
              
              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-14 w-14">
                          <AvatarFallback className="bg-[#1e5fa8]/10 text-[#1e5fa8] dark:bg-blue-900/50 dark:text-blue-400 text-lg font-semibold">
                            {getInitials(user.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        {user.role === 'admin' && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                            <Crown className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {user.full_name || 'Usuário'}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={cn(
                      user.role === 'admin' 
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-[#1e5fa8]/10 text-[#1e5fa8] dark:bg-blue-900/30 dark:text-blue-400'
                    )}>
                      {user.role === 'admin' ? (
                        <>
                          <ShieldCheck className="w-3 h-3 mr-1" />
                          Administrador
                        </>
                      ) : (
                        <>
                          <Shield className="w-3 h-3 mr-1" />
                          Técnico
                        </>
                      )}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{totalVisits}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Visitas</p>
                    </div>
                    <div className="text-center border-x border-slate-200 dark:border-slate-600">
                      <p className="text-lg font-bold text-[#10b981]">{completedVisits}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Concluídas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-[#1e5fa8]">{performance}%</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Eficiência</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Membro desde {moment(user.created_date).format('MMM YYYY')}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Add Collaborator Dialog */}
      <Dialog open={isAddCollaboratorOpen} onOpenChange={setIsAddCollaboratorOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Colaborador</DialogTitle>
            <DialogDescription>
              Preencha os dados completos do colaborador, incluindo login e permissões
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            {/* Basic Info */}
            <div className="space-y-4 pb-4 border-b border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300">Informações Básicas</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome Completo *</Label>
                  <Input
                    value={collaboratorForm.full_name}
                    onChange={(e) => setCollaboratorForm({...collaboratorForm, full_name: e.target.value})}
                    placeholder="João Silva"
                  />
                </div>
                <div>
                  <Label>Função/Cargo *</Label>
                  <Input
                    value={collaboratorForm.position}
                    onChange={(e) => setCollaboratorForm({...collaboratorForm, position: e.target.value})}
                    placeholder="Técnico de Campo"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pb-4 border-b border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300">Contato</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={collaboratorForm.email}
                    onChange={(e) => setCollaboratorForm({...collaboratorForm, email: e.target.value})}
                    placeholder="joao@exemplo.com"
                  />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input
                    value={collaboratorForm.phone}
                    onChange={(e) => setCollaboratorForm({...collaboratorForm, phone: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4 pb-4 border-b border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300">Localização</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cidade</Label>
                  <Input
                    value={collaboratorForm.city}
                    onChange={(e) => setCollaboratorForm({...collaboratorForm, city: e.target.value})}
                    placeholder="São Paulo"
                  />
                </div>
                <div>
                  <Label>Estado</Label>
                  <Input
                    value={collaboratorForm.state}
                    onChange={(e) => setCollaboratorForm({...collaboratorForm, state: e.target.value})}
                    placeholder="SP"
                    maxLength={2}
                  />
                </div>
              </div>
            </div>

            {/* Access */}
            <div className="space-y-4 pb-4 border-b border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300">Acesso e Login</h4>
              <div>
                <Label>Nível de Acesso</Label>
                <Select value={collaboratorForm.role} onValueChange={(value) => setCollaboratorForm({...collaboratorForm, role: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Técnico (Acesso Limitado)</SelectItem>
                    <SelectItem value="admin">Administrador (Acesso Total)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-1">
                  {collaboratorForm.role === 'user' 
                    ? 'Acesso apenas ao app móvel, vê apenas suas próprias visitas' 
                    : 'Acesso total ao dashboard e todas as funcionalidades'}
                </p>
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300">Permissões Específicas</h4>
              <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Acesso ao Dashboard</p>
                    <p className="text-xs text-slate-500">Permitir login no painel web administrativo</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={collaboratorForm.permissions.dashboard_access}
                    onChange={(e) => setCollaboratorForm({
                      ...collaboratorForm,
                      permissions: {...collaboratorForm.permissions, dashboard_access: e.target.checked}
                    })}
                    className="w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Acesso ao Aplicativo</p>
                    <p className="text-xs text-slate-500">Usar o app móvel para registrar visitas</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={collaboratorForm.permissions.app_access}
                    onChange={(e) => setCollaboratorForm({
                      ...collaboratorForm,
                      permissions: {...collaboratorForm.permissions, app_access: e.target.checked}
                    })}
                    className="w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Baixar Relatórios</p>
                    <p className="text-xs text-slate-500">Exportar e baixar relatórios do sistema</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={collaboratorForm.permissions.download_reports}
                    onChange={(e) => setCollaboratorForm({
                      ...collaboratorForm,
                      permissions: {...collaboratorForm.permissions, download_reports: e.target.checked}
                    })}
                    className="w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Ver Todas as Visitas</p>
                    <p className="text-xs text-slate-500">Visualizar visitas de outros colaboradores</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={collaboratorForm.permissions.view_all_visits}
                    onChange={(e) => setCollaboratorForm({
                      ...collaboratorForm,
                      permissions: {...collaboratorForm.permissions, view_all_visits: e.target.checked}
                    })}
                    className="w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Ver Dados Sensíveis</p>
                    <p className="text-xs text-slate-500">Acesso a informações confidenciais dos clientes</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={collaboratorForm.permissions.view_sensitive_data}
                    onChange={(e) => setCollaboratorForm({
                      ...collaboratorForm,
                      permissions: {...collaboratorForm.permissions, view_sensitive_data: e.target.checked}
                    })}
                    className="w-4 h-4"
                  />
                </label>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <strong>Nota:</strong> O funcionário receberá um email de boas-vindas com instruções para criar sua senha de acesso.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsAddCollaboratorOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleAddCollaborator}
                className="bg-[#10b981] hover:bg-[#059669]"
                disabled={!collaboratorForm.email || !collaboratorForm.full_name}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Colaborador
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invite Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convidar Novo Membro</DialogTitle>
            <DialogDescription>
              Envie um convite por email para adicionar um novo membro à equipe
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="email@exemplo.com"
              />
            </div>
            <div>
              <Label>Função</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Técnico</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleInviteUser}
                className="bg-[#1e5fa8] hover:bg-[#164a85]"
                disabled={!inviteEmail}
              >
                Enviar Convite
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}