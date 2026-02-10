import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Book, MessageCircle, Video, FileText } from 'lucide-react';

const categories = [
  {
    icon: Book,
    title: 'Primeiros Passos',
    description: 'Aprenda a configurar sua conta e começar a usar o Visity',
    articles: 12,
  },
  {
    icon: MessageCircle,
    title: 'FAQ',
    description: 'Respostas para as perguntas mais frequentes',
    articles: 25,
  },
  {
    icon: Video,
    title: 'Tutoriais em Vídeo',
    description: 'Aprenda visualmente com nossos vídeos tutoriais',
    articles: 8,
  },
  {
    icon: FileText,
    title: 'Documentação Técnica',
    description: 'Documentação completa da API e integrações',
    articles: 15,
  },
];

const popularArticles = [
  'Como fazer o primeiro login',
  'Como cadastrar funcionários',
  'Como configurar geolocalização',
  'Como gerar relatórios',
  'Como integrar com outros sistemas',
  'Como exportar dados',
];

export default function Help() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Central de Ajuda</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Como podemos ajudar você hoje?
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar artigos..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur text-white placeholder:text-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-visity-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-visity-primary" />
                </div>
                <h3 className="font-semibold text-visity-dark dark:text-white mb-2">{category.title}</h3>
                <p className="text-sm text-visity-gray dark:text-gray-400 mb-3">{category.description}</p>
                <span className="text-xs text-visity-primary">{category.articles} artigos</span>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-visity-dark dark:text-white mb-6">Artigos populares</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popularArticles.map((article, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                <FileText className="w-5 h-5 text-visity-primary flex-shrink-0" />
                <span className="text-visity-dark dark:text-white">{article}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
