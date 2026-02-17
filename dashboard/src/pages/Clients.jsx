import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Building2,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Upload,
  FileSpreadsheet,
  X,
  AlertCircle,
  CheckCircle2
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import moment from 'moment';

const statusColors = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  inactive: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
  prospect: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    status: 'active',
    notes: ''
  });

  const queryClient = useQueryClient();

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: () => base44.entities.Client.list('-created_date', 100),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Client.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      handleCloseDialog();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Client.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      handleCloseDialog();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Client.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  const handleOpenDialog = (client = null) => {
    if (client) {
      setEditingClient(client);
      setFormData({
        name: client.name || '',
        contact_name: client.contact_name || '',
        email: client.email || '',
        phone: client.phone || '',
        address: client.address || '',
        city: client.city || '',
        state: client.state || '',
        status: client.status || 'active',
        notes: client.notes || ''
      });
    } else {
      setEditingClient(null);
      setFormData({
        name: '',
        contact_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        status: 'active',
        notes: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingClient(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClient) {
      updateMutation.mutate({ id: editingClient.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'C';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleImportFile = async () => {
    if (!importFile) return;
    
    setImporting(true);
    setImportResult(null);
    
    try {
      // Upload file first
      const { file_url } = await base44.integrations.Core.UploadFile({ file: importFile });
      
      // Extract data from uploaded file with explicit status instructions
      const result = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url,
        json_schema: {
          type: "object",
          properties: {
            clients: {
              type: "array",
              description: "Lista de clientes extraídos do arquivo. Para cada cliente, extraia o status EXATAMENTE como aparece no documento (Ativo, Inativo, ou Prospecto).",
              items: {
                type: "object",
                properties: {
                  name: { 
                    type: "string",
                    description: "Nome completo da empresa ou cliente"
                  },
                  contact_name: { 
                    type: "string",
                    description: "Nome da pessoa de contato"
                  },
                  email: { 
                    type: "string",
                    description: "Email do cliente"
                  },
                  phone: { 
                    type: "string",
                    description: "Telefone do cliente"
                  },
                  address: { 
                    type: "string",
                    description: "Endereço completo"
                  },
                  city: { 
                    type: "string",
                    description: "Cidade"
                  },
                  state: { 
                    type: "string",
                    description: "Estado (UF)"
                  },
                  status: { 
                    type: "string",
                    description: "Status do cliente - IMPORTANTE: extraia exatamente como está no documento. Exemplos: 'Ativo', 'Inativo', 'Prospecto', 'active', 'inactive', 'prospect'. Não invente valores.",
                    enum: ["Ativo", "Inativo", "Prospecto", "active", "inactive", "prospect"]
                  },
                  notes: { 
                    type: "string",
                    description: "Observações sobre o cliente"
                  }
                },
                required: ["name"]
              }
            }
          }
        }
      });
      
      if (result.status === 'success' && result.output?.clients) {
        // Comprehensive status mapping with multiple variations
        const statusMap = {
          // Portuguese variations
          'ativo': 'active',
          'ativa': 'active',
          'ativos': 'active',
          'ativas': 'active',
          'inativo': 'inactive',
          'inativa': 'inactive',
          'inativos': 'inactive',
          'inativas': 'inactive',
          'prospecto': 'prospect',
          'prospect': 'prospect',
          'prospecção': 'prospect',
          // English variations
          'active': 'active',
          'inactive': 'inactive',
          // Already normalized
          'active': 'active',
          'inactive': 'inactive',
          'prospect': 'prospect'
        };
        
        const clientsToCreate = result.output.clients.filter(c => c.name).map(c => {
          // Default to active if status is missing or unrecognized
          let mappedStatus = 'active';
          
          if (c.status) {
            // Normalize: lowercase, trim, remove accents
            const normalized = c.status
              .toLowerCase()
              .trim()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, ""); // Remove diacritics
            
            // Map to English status
            mappedStatus = statusMap[normalized] || 'active';
          }
          
          return {
            name: c.name,
            contact_name: c.contact_name || '',
            email: c.email || '',
            phone: c.phone || '',
            address: c.address || '',
            city: c.city || '',
            state: c.state || '',
            status: mappedStatus,
            notes: c.notes || '',
            total_visits: 0
          };
        });
        
        if (clientsToCreate.length > 0) {
          await base44.entities.Client.bulkCreate(clientsToCreate);
          
          queryClient.invalidateQueries({ queryKey: ['clients'] });
          setImportResult({
            success: true,
            count: clientsToCreate.length
          });
          setImportFile(null);
          
          setTimeout(() => {
            setIsImportDialogOpen(false);
            setImportResult(null);
          }, 2000);
        } else {
          setImportResult({
            success: false,
            message: 'Nenhum cliente válido encontrado no arquivo'
          });
        }
      } else {
        setImportResult({
          success: false,
          message: result.details || 'Erro ao processar arquivo'
        });
      }
    } catch (error) {
      setImportResult({
        success: false,
        message: error.message || 'Erro ao importar clientes'
      });
    }
    
    setImporting(false);
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
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
            Clientes
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gerencie sua carteira de clientes
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsImportDialogOpen(true)}
            variant="outline"
            className="border-[#1e5fa8] text-[#1e5fa8] hover:bg-[#1e5fa8] hover:text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            Importar Clientes
          </Button>
          <Button 
            onClick={() => handleOpenDialog()}
            className="bg-[#1e5fa8] hover:bg-[#164a85] shadow-lg shadow-[#1e5fa8]/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </div>
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
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-50 dark:bg-slate-700 border-0"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-slate-50 dark:bg-slate-700 border-0">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="inactive">Inativos</SelectItem>
            <SelectItem value="prospect">Prospect</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Clients Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-slate-500">
          Carregando clientes...
        </div>
      ) : filteredClients.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-12 border border-slate-200 dark:border-slate-700 text-center"
        >
          <Building2 className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Nenhum cliente encontrado
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Comece adicionando seu primeiro cliente
          </p>
          <Button 
            onClick={() => handleOpenDialog()}
            className="bg-[#1e5fa8] hover:bg-[#164a85]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Cliente
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.03 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-[#1e5fa8]/10 text-[#1e5fa8] dark:bg-blue-900/50 dark:text-blue-400 font-semibold">
                        {getInitials(client.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {client.name}
                      </h3>
                      {client.contact_name && (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {client.contact_name}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenDialog(client)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => deleteMutation.mutate(client.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2 text-sm">
                  {client.email && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  {(client.city || client.state) && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{[client.city, client.state].filter(Boolean).join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <Badge className={statusColors[client.status] || statusColors.active}>
                    {client.status === 'active' ? 'Ativo' : 
                     client.status === 'inactive' ? 'Inativo' : 'Prospect'}
                  </Badge>
                  {client.total_visits > 0 && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {client.total_visits} visitas
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Nome da Empresa</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome do cliente"
                  required
                />
              </div>
              <div>
                <Label>Contato</Label>
                <Input
                  value={formData.contact_name}
                  onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                  placeholder="Nome do contato"
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
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                    <SelectItem value="prospect">Prospect</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <Label>Telefone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="col-span-2">
                <Label>Endereço</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Endereço completo"
                />
              </div>
              <div>
                <Label>Cidade</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Cidade"
                />
              </div>
              <div>
                <Label>Estado</Label>
                <Input
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="UF"
                  maxLength={2}
                />
              </div>
              <div className="col-span-2">
                <Label>Observações</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Notas sobre o cliente..."
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
                {editingClient ? 'Salvar Alterações' : 'Criar Cliente'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#1e5fa8]" />
              Importar Clientes
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-400">
              <p className="font-medium text-slate-900 dark:text-white mb-2">Formatos suportados:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Excel (.xlsx, .xls)</li>
                <li>PDF com tabelas</li>
                <li>CSV</li>
              </ul>
              <p className="mt-3 text-xs">
                O arquivo deve conter as colunas: nome, contato, email, telefone, endereço, cidade, estado
              </p>
            </div>

            {!importFile ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 cursor-pointer hover:border-[#1e5fa8] transition-colors">
                <input
                  type="file"
                  accept=".pdf,.xlsx,.xls,.csv"
                  onChange={(e) => setImportFile(e.target.files[0])}
                  className="hidden"
                />
                <FileSpreadsheet className="w-12 h-12 text-slate-400 mb-3" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Clique para selecionar arquivo
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  ou arraste e solte aqui
                </p>
              </label>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <FileSpreadsheet className="w-8 h-8 text-[#1e5fa8]" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-white truncate">
                    {importFile.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {(importFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setImportFile(null)}
                  disabled={importing}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            {importResult && (
              <div className={cn(
                "p-4 rounded-xl flex items-start gap-3",
                importResult.success 
                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                  : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
              )}>
                {importResult.success ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium">
                    {importResult.success 
                      ? `${importResult.count} clientes importados com sucesso!`
                      : 'Erro na importação'
                    }
                  </p>
                  {importResult.message && (
                    <p className="text-sm mt-1">{importResult.message}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsImportDialogOpen(false);
                setImportFile(null);
                setImportResult(null);
              }}
              disabled={importing}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleImportFile}
              disabled={!importFile || importing}
              className="bg-[#1e5fa8] hover:bg-[#164a85]"
            >
              {importing ? 'Importando...' : 'Importar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}