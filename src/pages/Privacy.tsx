import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';

const sections = [
  {
    icon: Shield,
    title: 'Coleta de Dados',
    content: 'Coletamos apenas os dados necessários para o funcionamento do serviço, incluindo informações de cadastro, dados de localização durante as visitas e registros de atividades.',
  },
  {
    icon: Lock,
    title: 'Segurança',
    content: 'Utilizamos criptografia de ponta a ponta para proteger seus dados. Todos os dados são armazenados em servidores seguros com certificação ISO 27001.',
  },
  {
    icon: Eye,
    title: 'Uso dos Dados',
    content: 'Seus dados são utilizados exclusivamente para fornecer e melhorar nossos serviços. Nunca vendemos ou compartilhamos seus dados com terceiros para fins comerciais.',
  },
  {
    icon: FileText,
    title: 'Seus Direitos',
    content: 'Você tem o direito de acessar, corrigir ou excluir seus dados a qualquer momento. Entre em contato conosco para exercer esses direitos.',
  },
];

export default function Privacy() {
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

      <div className="bg-gradient-to-br from-visity-primary to-visity-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Política de Privacidade</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Sua privacidade é nossa prioridade
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-visity-gray dark:text-gray-400 mb-8">
            Última atualização: 10 de Janeiro de 2025
          </p>

          <div className="grid gap-8 mb-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-visity-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-visity-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-visity-dark dark:text-white">{section.title}</h2>
                  </div>
                  <p className="text-visity-gray dark:text-gray-400">{section.content}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-visity-dark dark:text-white mb-4">Contato</h2>
            <p className="text-visity-gray dark:text-gray-400 mb-4">
              Se você tiver alguma dúvida sobre nossa política de privacidade, entre em contato conosco:
            </p>
            <ul className="space-y-2 text-visity-gray dark:text-gray-400">
              <li>E-mail: privacidade@visity.com.br</li>
              <li>Telefone: (11) 4000-1234</li>
              <li>Endereço: São Paulo, SP - Brasil</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
