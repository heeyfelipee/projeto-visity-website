import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Terminal, Webhook, Key, FileJson } from 'lucide-react';

const sections = [
  {
    icon: Terminal,
    title: 'Primeiros Passos',
    description: 'Configure seu ambiente de desenvolvimento',
  },
  {
    icon: Code,
    title: 'Autenticação',
    description: 'Aprenda a autenticar suas requisições',
  },
  {
    icon: Webhook,
    title: 'Webhooks',
    description: 'Receba notificações em tempo real',
  },
  {
    icon: Key,
    title: 'API Keys',
    description: 'Gerencie suas chaves de API',
  },
  {
    icon: FileJson,
    title: 'Endpoints',
    description: 'Documentação completa dos endpoints',
  },
];

const codeExample = `// Exemplo: Listar visitas
const response = await fetch('https://api.visity.com.br/v1/visits', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
});

const data = await response.json();
console.log(data);`;

export default function Documentation() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Documentação</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Integre o Visity ao seu sistema com nossa API REST
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sticky top-8">
              <h2 className="font-semibold text-visity-dark dark:text-white mb-4">Conteúdo</h2>
              <ul className="space-y-2">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <li key={index}>
                      <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-left">
                        <Icon className="w-5 h-5 text-visity-primary" />
                        <span className="text-visity-dark dark:text-white text-sm">{section.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-visity-dark dark:text-white mb-4">Introdução</h2>
              <p className="text-visity-gray dark:text-gray-400 mb-6">
                A API do Visity permite que você integre nossa plataforma de gestão de visitas ao seu sistema. 
                Com ela, você pode criar, consultar e gerenciar visitas, funcionários e relatórios programmaticamente.
              </p>
              <div className="bg-visity-primary/10 rounded-xl p-4 mb-6">
                <p className="text-sm text-visity-primary">
                  <strong>Base URL:</strong> https://api.visity.com.br/v1
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-visity-dark dark:text-white mb-4">Exemplo de uso</h2>
              <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-green-400">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
