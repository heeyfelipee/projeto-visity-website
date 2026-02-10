import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, DollarSign } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Desenvolvedor Full Stack',
    department: 'Tecnologia',
    location: 'Remoto',
    type: 'CLT',
    salary: 'R$ 8.000 - R$ 12.000',
  },
  {
    id: 2,
    title: 'Customer Success Manager',
    department: 'Sucesso do Cliente',
    location: 'São Paulo, SP',
    type: 'CLT',
    salary: 'R$ 5.000 - R$ 7.000',
  },
  {
    id: 3,
    title: 'Product Designer',
    department: 'Design',
    location: 'Remoto',
    type: 'PJ',
    salary: 'R$ 7.000 - R$ 10.000',
  },
  {
    id: 4,
    title: 'Sales Development Representative',
    department: 'Vendas',
    location: 'São Paulo, SP',
    type: 'CLT',
    salary: 'R$ 3.500 + comissão',
  },
];

export default function Careers() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Carreiras</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Faça parte de uma equipe que está transformando a gestão de campo no Brasil
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-visity-dark dark:text-white mb-4">Por que trabalhar no Visity?</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-visity-gray dark:text-gray-400">Ambiente de trabalho flexível e remoto</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-visity-gray dark:text-gray-400">Plano de saúde e odontológico</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-visity-gray dark:text-gray-400">Vale-refeição e vale-transporte</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-visity-gray dark:text-gray-400">Horários flexíveis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-visity-gray dark:text-gray-400">Oportunidades de crescimento</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-visity-dark dark:text-white mb-4">Nossa cultura</h2>
            <p className="text-visity-gray dark:text-gray-400 mb-4">
              No Visity, valorizamos pessoas que pensam fora da caixa, que têm sede de aprender e que querem fazer a diferença.
            </p>
            <p className="text-visity-gray dark:text-gray-400">
              Acreditamos que o melhor produto nasce de equipes diversas e inclusivas, onde cada voz é ouvida e respeitada.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-visity-dark dark:text-white mb-8">Vagas abertas</h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div>
                <h3 className="text-lg font-semibold text-visity-dark dark:text-white mb-1">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-visity-gray dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </span>
                </div>
              </div>
              <button className="btn-primary px-6 py-2">Candidatar-se</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
