import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle,
  Book,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Search,
  Play,
  FileText,
  Users,
  MapPin,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'Como faço check-in em uma visita?',
    answer: 'Para fazer check-in, abra o aplicativo móvel, vá até a visita agendada e clique em "Iniciar Visita". O sistema irá registrar automaticamente sua localização e horário.',
    category: 'visits'
  },
  {
    question: 'O sistema funciona offline?',
    answer: 'Sim! O aplicativo móvel funciona offline e sincroniza automaticamente quando você reconectar à internet. Nenhuma informação é perdida.',
    category: 'technical'
  },
  {
    question: 'Como adicionar um novo membro à equipe?',
    answer: 'Acesse o menu "Equipe", clique em "Convidar Membro" e insira o email do novo colaborador. Ele receberá um convite por email para criar sua conta.',
    category: 'team'
  },
  {
    question: 'Posso exportar relatórios?',
    answer: 'Sim, você pode exportar relatórios em vários formatos. Acesse "Relatórios", selecione o período desejado e clique em "Exportar".',
    category: 'reports'
  },
  {
    question: 'Como funciona a geolocalização?',
    answer: 'O sistema utiliza GPS do dispositivo para registrar a localização no check-in e check-out. É importante manter o GPS ativado durante as visitas.',
    category: 'technical'
  },
  {
    question: 'Posso cancelar uma visita agendada?',
    answer: 'Sim, abra a visita na lista de visitas, clique no menu de opções e selecione "Cancelar". O status será atualizado e o histórico mantido.',
    category: 'visits'
  },
];

const categories = [
  { id: 'all', label: 'Todas', icon: HelpCircle },
  { id: 'visits', label: 'Visitas', icon: MapPin },
  { id: 'team', label: 'Equipe', icon: Users },
  { id: 'reports', label: 'Relatórios', icon: FileText },
  { id: 'technical', label: 'Técnico', icon: Settings },
];

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Central de Ajuda
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Como podemos ajudar você hoje?
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          placeholder="Buscar perguntas frequentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-14 text-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl"
        />
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="bg-gradient-to-br from-[#1e5fa8] to-[#164a85] rounded-2xl p-6 text-white">
          <Book className="w-8 h-8 mb-3" />
          <h3 className="font-semibold mb-1">Documentação</h3>
          <p className="text-sm text-white/80">Guias completos de uso</p>
        </div>
        <div className="bg-gradient-to-br from-[#10b981] to-emerald-600 rounded-2xl p-6 text-white">
          <Play className="w-8 h-8 mb-3" />
          <h3 className="font-semibold mb-1">Tutoriais em Vídeo</h3>
          <p className="text-sm text-white/80">Aprenda de forma visual</p>
        </div>
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white">
          <MessageCircle className="w-8 h-8 mb-3" />
          <h3 className="font-semibold mb-1">Chat ao Vivo</h3>
          <p className="text-sm text-white/80">Fale com nossa equipe</p>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "rounded-xl",
              selectedCategory === category.id && "bg-[#1e5fa8] hover:bg-[#164a85]"
            )}
          >
            <category.icon className="w-4 h-4 mr-2" />
            {category.label}
          </Button>
        ))}
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Perguntas Frequentes
          </h2>
        </div>
        
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {filteredFaqs.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              Nenhuma pergunta encontrada
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <span className="font-medium text-slate-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600 dark:text-slate-400">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Ainda precisa de ajuda?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Nossa equipe de suporte está disponível para ajudá-lo
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-[#1e5fa8]/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-[#1e5fa8]" />
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Email</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">suporte@visity.com.br</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
              <Phone className="w-6 h-6 text-[#10b981]" />
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Telefone</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">(11) 99999-9999</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}