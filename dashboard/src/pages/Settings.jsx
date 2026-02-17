import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Camera,
  Mail,
  Phone,
  Building2,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Settings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: '',
    phone: '',
    company: '',
    address: '',
  });
  const [notifications, setNotifications] = useState({
    email_visits: true,
    email_reports: true,
    push_checkin: true,
    push_alerts: true,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
        setProfileData({
          full_name: userData.full_name || '',
          phone: userData.phone || '',
          company: userData.company || '',
          address: userData.address || '',
        });
      } catch (e) {
        console.log('User not logged in');
      }
    };
    loadUser();
  }, []);

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await base44.auth.updateMe(profileData);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar perfil');
    }
    setLoading(false);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Configurações
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Gerencie suas preferências e configurações
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 rounded-xl">
            <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-[#1e5fa8] data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-[#1e5fa8] data-[state=active]:text-white">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-[#1e5fa8] data-[state=active]:text-white">
              <Shield className="w-4 h-4 mr-2" />
              Segurança
            </TabsTrigger>
            <TabsTrigger value="preferences" className="rounded-lg data-[state=active]:bg-[#1e5fa8] data-[state=active]:text-white">
              <Palette className="w-4 h-4 mr-2" />
              Preferências
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-[#1e5fa8] to-[#10b981] p-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-white">
                      <AvatarFallback className="bg-white text-[#1e5fa8] text-2xl font-bold">
                        {getInitials(profileData.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 transition-colors">
                      <Camera className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                  <div className="text-white">
                    <h2 className="text-xl font-bold">{profileData.full_name || 'Seu Nome'}</h2>
                    <p className="text-white/80">{user?.email}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                      {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Nome Completo</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        value={profileData.full_name}
                        onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                        placeholder="Seu nome"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        value={user?.email || ''}
                        disabled
                        className="pl-10 bg-slate-50 dark:bg-slate-700"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        placeholder="(00) 00000-0000"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Empresa</Label>
                    <div className="relative mt-1">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        value={profileData.company}
                        onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                        placeholder="Nome da empresa"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Endereço</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Textarea
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        placeholder="Endereço completo"
                        className="pl-10 min-h-20"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Button 
                    onClick={handleSaveProfile}
                    className="bg-[#1e5fa8] hover:bg-[#164a85]"
                    disabled={loading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  Notificações por Email
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Configure quais notificações deseja receber por email
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Novas Visitas</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receba um email quando uma nova visita for agendada
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email_visits}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email_visits: checked })}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Relatórios Semanais</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receba um resumo semanal das atividades
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email_reports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email_reports: checked })}
                  />
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  Notificações Push
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Configure as notificações do aplicativo
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Check-in/Check-out</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Notificações de entrada e saída da equipe
                    </p>
                  </div>
                  <Switch
                    checked={notifications.push_checkin}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push_checkin: checked })}
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Alertas de GPS</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receba alertas quando o GPS estiver desativado
                    </p>
                  </div>
                  <Switch
                    checked={notifications.push_alerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push_alerts: checked })}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  Segurança da Conta
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Gerencie a segurança da sua conta
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Alterar Senha</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Última alteração: há 30 dias
                      </p>
                    </div>
                    <Button variant="outline">
                      Alterar
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Autenticação em Duas Etapas</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Adicione uma camada extra de segurança
                      </p>
                    </div>
                    <Button variant="outline">
                      Configurar
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Sessões Ativas</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Gerencie suas sessões em outros dispositivos
                      </p>
                    </div>
                    <Button variant="outline">
                      Ver Sessões
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  Preferências do Sistema
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Personalize sua experiência
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Idioma</Label>
                  <Select defaultValue="pt-BR">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Fuso Horário</Label>
                  <Select defaultValue="America/Sao_Paulo">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                      <SelectItem value="America/Manaus">Manaus (GMT-4)</SelectItem>
                      <SelectItem value="America/Noronha">Fernando de Noronha (GMT-2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Formato de Data</Label>
                  <Select defaultValue="DD/MM/YYYY">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Tema</Label>
                  <Select defaultValue="light">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}