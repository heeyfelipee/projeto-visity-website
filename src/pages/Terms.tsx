import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Terms() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Termos de Uso</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Condições gerais de uso da plataforma Visity
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-visity-gray dark:text-gray-400 mb-8">
            Última atualização: 10 de Janeiro de 2025
          </p>

          <div className="space-y-8">
            <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-visity-primary" />
                <h2 className="text-xl font-semibold text-visity-dark dark:text-white">1. Aceitação dos Termos</h2>
              </div>
              <p className="text-visity-gray dark:text-gray-400">
                Ao acessar e usar o Visity, você concorda em cumprir estes termos de uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
              </p>
            </section>

            <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-visity-primary" />
                <h2 className="text-xl font-semibold text-visity-dark dark:text-white">2. Uso da Plataforma</h2>
              </div>
              <p className="text-visity-gray dark:text-gray-400 mb-4">
                O Visity é uma plataforma de gestão de visitas em campo. Você concorda em usar o serviço apenas para fins legais e de acordo com estes termos.
              </p>
              <ul className="list-disc list-inside space-y-2 text-visity-gray dark:text-gray-400">
                <li>Você é responsável por manter a confidencialidade de sua conta</li>
                <li>Não compartilhe suas credenciais de acesso</li>
                <li>Notifique-nos imediatamente sobre qualquer uso não autorizado</li>
              </ul>
            </section>

            <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-visity-primary" />
                <h2 className="text-xl font-semibold text-visity-dark dark:text-white">3. Limitação de Responsabilidade</h2>
              </div>
              <p className="text-visity-gray dark:text-gray-400">
                O Visity não se responsabiliza por danos indiretos, incidentais ou consequenciais resultantes do uso ou incapacidade de uso do serviço. Nossa responsabilidade total é limitada ao valor pago pelo serviço nos últimos 12 meses.
              </p>
            </section>

            <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-visity-dark dark:text-white mb-4">4. Alterações nos Termos</h2>
              <p className="text-visity-gray dark:text-gray-400">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão notificadas com 30 dias de antecedência. O uso continuado do serviço após as alterações constitui aceitação dos novos termos.
              </p>
            </section>

            <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-visity-dark dark:text-white mb-4">5. Contato</h2>
              <p className="text-visity-gray dark:text-gray-400">
                Para dúvidas sobre estes termos, entre em contato:
              </p>
              <ul className="mt-4 space-y-2 text-visity-gray dark:text-gray-400">
                <li>E-mail: legal@visity.com.br</li>
                <li>Telefone: (11) 4000-1234</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
