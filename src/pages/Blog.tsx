import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'Como reduzir custos com gestão de visitas em campo',
    excerpt: 'Descubra como empresas estão economizando até 30% nos custos operacionais com uma gestão eficiente.',
    author: 'Ana Pereira',
    date: '15 Jan 2025',
    readTime: '5 min',
    category: 'Gestão',
  },
  {
    id: 2,
    title: '5 dicas para aumentar a produtividade da sua equipe externa',
    excerpt: 'Aprenda estratégias práticas para motivar e aumentar a performance dos seus colaboradores.',
    author: 'Carlos Silva',
    date: '10 Jan 2025',
    readTime: '4 min',
    category: 'Produtividade',
  },
  {
    id: 3,
    title: 'A importância da geolocalização no controle de visitas',
    excerpt: 'Entenda como a tecnologia GPS pode transformar a forma como você gerencia sua equipe.',
    author: 'Marina Costa',
    date: '05 Jan 2025',
    readTime: '6 min',
    category: 'Tecnologia',
  },
  {
    id: 4,
    title: 'Compliance e segurança jurídica nas visitas em campo',
    excerpt: 'Saiba como proteger sua empresa com registros válidos e documentação adequada.',
    author: 'Pedro Santos',
    date: '28 Dez 2024',
    readTime: '7 min',
    category: 'Jurídico',
  },
];

export default function Blog() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Blog</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Dicas, novidades e conteúdos sobre gestão de campo
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-visity-primary/20 to-visity-secondary/20 flex items-center justify-center">
                <span className="text-6xl">📝</span>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-visity-primary/10 text-visity-primary text-sm font-medium rounded-full mb-4">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold text-visity-dark dark:text-white mb-3 hover:text-visity-primary transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-visity-gray dark:text-gray-400 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-visity-gray dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
