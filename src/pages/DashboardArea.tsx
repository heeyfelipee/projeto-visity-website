import React from 'react';

export default function DashboardArea() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-visity-primary to-visity-secondary dark:from-blue-900 dark:to-teal-900 flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-10 w-full max-w-2xl flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <img src="/logo-visity.png" alt="Visity Logo" className="w-10 h-10" />
          <span className="font-bold text-visity-primary dark:text-white text-2xl">Visity Dashboard</span>
        </div>
        <h1 className="text-3xl font-bold text-visity-dark dark:text-white mb-4 text-center">Bem-vindo ao Painel Profissional</h1>
        <p className="text-visity-gray dark:text-gray-400 mb-8 text-center">Aqui você pode acompanhar métricas, atividades, relatórios e muito mais.</p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center shadow">
            <h2 className="text-xl font-semibold text-visity-primary mb-2">Visitas em Campo</h2>
            <p className="text-visity-dark dark:text-white">1.247 visitas registradas</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center shadow">
            <h2 className="text-xl font-semibold text-visity-primary mb-2">Usuários Ativos</h2>
            <p className="text-visity-dark dark:text-white">10k+ usuários</p>
          </div>
        </div>
        <div className="mt-8 text-xs text-visity-gray dark:text-gray-400 text-center">© 2026 Visity. Todos os direitos reservados.</div>
      </div>
    </div>
  );
}
