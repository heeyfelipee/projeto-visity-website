import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, Settings, Shield } from 'lucide-react';

const cookieTypes = [
  {
    name: 'Cookies Essenciais',
    description: 'Necessários para o funcionamento básico do site. Não podem ser desativados.',
    required: true,
  },
  {
    name: 'Cookies de Performance',
    description: 'Ajudam a entender como os visitantes interagem com o site.',
    required: false,
  },
  {
    name: 'Cookies de Funcionalidade',
    description: 'Permitem funcionalidades aprimoradas como preferências de idioma.',
    required: false,
  },
  {
    name: 'Cookies de Marketing',
    description: 'Usados para fornecer anúncios relevantes.',
    required: false,
  },
];

export default function Cookies() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Política de Cookies</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Como utilizamos cookies para melhorar sua experiência
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-visity-gray dark:text-gray-400 mb-8">
            Última atualização: 10 de Janeiro de 2025
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-6 h-6 text-visity-primary" />
              <h2 className="text-xl font-semibold text-visity-dark dark:text-white">O que são Cookies?</h2>
            </div>
            <p className="text-visity-gray dark:text-gray-400">
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles nos ajudam a fornecer uma melhor experiência de navegação.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-visity-dark dark:text-white">Tipos de Cookies</h2>
            {cookieTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-visity-dark dark:text-white">{type.name}</h3>
                  {type.required && (
                    <span className="text-xs bg-visity-primary/10 text-visity-primary px-2 py-1 rounded">Obrigatório</span>
                  )}
                </div>
                <p className="text-visity-gray dark:text-gray-400">{type.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-visity-primary" />
              <h2 className="text-xl font-semibold text-visity-dark dark:text-white">Gerenciar Preferências</h2>
            </div>
            <p className="text-visity-gray dark:text-gray-400 mb-4">
              Você pode gerenciar suas preferências de cookies a qualquer momento através das configurações do seu navegador ou clicando no botão abaixo.
            </p>
            <button className="btn-primary">
              Gerenciar Cookies
            </button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-visity-primary" />
              <h2 className="text-xl font-semibold text-visity-dark dark:text-white">Mais Informações</h2>
            </div>
            <p className="text-visity-gray dark:text-gray-400 mb-4">
              Para mais informações sobre como protegemos seus dados, consulte nossa:
            </p>
            <div className="flex gap-4">
              <Link to="/privacidade" className="text-visity-primary hover:underline">
                Política de Privacidade
              </Link>
              <Link to="/termos" className="text-visity-primary hover:underline">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
