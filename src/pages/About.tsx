import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Eye, Heart, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
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

      {/* Hero */}
      <div className="bg-gradient-to-br from-visity-primary to-visity-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sobre Nós
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Transformando a gestão de visitas em campo com tecnologia e inovação
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-visity-dark dark:text-white mb-6">
              Nossa História
            </h2>
            <p className="text-visity-gray dark:text-gray-400 mb-4 leading-relaxed">
              O Visity nasceu da necessidade de resolver um problema real enfrentado por milhares de empresas no Brasil: a falta de controle e rastreabilidade nas visitas em campo.
            </p>
            <p className="text-visity-gray dark:text-gray-400 mb-4 leading-relaxed">
              Fundada em 2023 por uma equipe apaixonada por tecnologia e inovação, nossa missão é simplificar a gestão de equipes externas, proporcionando mais eficiência, transparência e resultados.
            </p>
            <p className="text-visity-gray dark:text-gray-400 leading-relaxed">
              Hoje, ajudamos empresas de diversos segmentos a economizarem horas de trabalho administrativo e a terem dados precisos para tomada de decisões.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-visity-primary mb-2">500+</div>
                <div className="text-sm text-visity-gray dark:text-gray-400">Empresas atendidas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-visity-primary mb-2">10k+</div>
                <div className="text-sm text-visity-gray dark:text-gray-400">Usuários ativos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-visity-primary mb-2">1M+</div>
                <div className="text-sm text-visity-gray dark:text-gray-400">Visitas registradas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-visity-primary mb-2">98%</div>
                <div className="text-sm text-visity-gray dark:text-gray-400">Satisfação</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-visity-dark dark:text-white text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-visity-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-visity-primary" />
              </div>
              <h3 className="font-semibold text-visity-dark dark:text-white mb-2">Foco no Cliente</h3>
              <p className="text-sm text-visity-gray dark:text-gray-400">Soluções pensadas para resolver problemas reais</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-visity-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-7 h-7 text-visity-primary" />
              </div>
              <h3 className="font-semibold text-visity-dark dark:text-white mb-2">Transparência</h3>
              <p className="text-sm text-visity-gray dark:text-gray-400">Dados claros e acessíveis para todos</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-visity-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-visity-primary" />
              </div>
              <h3 className="font-semibold text-visity-dark dark:text-white mb-2">Paixão</h3>
              <p className="text-sm text-visity-gray dark:text-gray-400">Amamos o que fazemos e isso se reflete no produto</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-visity-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-visity-primary" />
              </div>
              <h3 className="font-semibold text-visity-dark dark:text-white mb-2">Excelência</h3>
              <p className="text-sm text-visity-gray dark:text-gray-400">Buscamos sempre a melhor solução</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold text-visity-dark dark:text-white text-center mb-12">
            Nossa Equipe
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Carlos Silva', role: 'CEO & Fundador', initials: 'CS' },
              { name: 'Ana Pereira', role: 'CTO', initials: 'AP' },
              { name: 'Marina Costa', role: 'Head de Produto', initials: 'MC' },
            ].map((member, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-visity-primary to-visity-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{member.initials}</span>
                </div>
                <h3 className="font-semibold text-visity-dark dark:text-white">{member.name}</h3>
                <p className="text-sm text-visity-gray dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
