import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const services = [
  { name: 'API', status: 'operational', uptime: '99.99%' },
  { name: 'Dashboard Web', status: 'operational', uptime: '99.95%' },
  { name: 'Aplicativo Mobile', status: 'operational', uptime: '99.90%' },
  { name: 'Geolocalização', status: 'operational', uptime: '99.98%' },
  { name: 'Relatórios', status: 'operational', uptime: '99.95%' },
  { name: 'Notificações', status: 'operational', uptime: '99.99%' },
];

const incidents = [
  {
    date: '05 Jan 2025',
    title: 'Degradação de performance na API',
    status: 'resolved',
    description: 'Identificamos e resolvemos um problema de latência na API.',
  },
  {
    date: '20 Dez 2024',
    title: 'Manutenção programada',
    status: 'resolved',
    description: 'Manutenção de rotina concluída com sucesso.',
  },
];

export default function Status() {
  const allOperational = services.every(s => s.status === 'operational');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <svg viewBox="0 0 48 48" className="w-6 h-6">
                  <path d="M24 4C16.268 4 10 10.268 10 18C10 28 24 44 24 44C24 44 38 28 38 18C38 10.268 31.732 4 24 4Z" fill="white"/>
                  <circle cx="24" cy="18" r="8" fill="#0D47A1"/>
                  <path d="M20 18L23 21L29 15" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-visity-dark dark:text-white">Visity</span>
            </Link>
            <Link to="/" className="flex items-center gap-2 text-visity-gray dark:text-gray-400 hover:text-visity-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`rounded-2xl p-8 mb-8 ${allOperational ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${allOperational ? 'bg-green-100 dark:bg-green-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'}`}>
              {allOperational ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
              ) : (
                <AlertCircle className="w-8 h-8 text-yellow-500" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-visity-dark dark:text-white">
                {allOperational ? 'Todos os sistemas operacionais' : 'Alguns sistemas com problemas'}
              </h1>
              <p className="text-visity-gray dark:text-gray-400">
                Última atualização: {new Date().toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-visity-dark dark:text-white">Status dos Serviços</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {services.map((service, index) => (
              <div key={index} className="p-6 flex items-center justify-between">
                <span className="text-visity-dark dark:text-white">{service.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-visity-gray dark:text-gray-400">{service.uptime} uptime</span>
                  <span className="flex items-center gap-1.5 text-sm text-green-500">
                    <CheckCircle className="w-4 h-4" />
                    Operacional
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-visity-dark dark:text-white mb-6">Histórico de Incidentes</h2>
          <div className="space-y-6">
            {incidents.map((incident, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-visity-gray dark:text-gray-400" />
                  <span className="text-sm text-visity-gray dark:text-gray-400">{incident.date}</span>
                </div>
                <h3 className="font-semibold text-visity-dark dark:text-white mb-1">{incident.title}</h3>
                <p className="text-sm text-visity-gray dark:text-gray-400">{incident.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
