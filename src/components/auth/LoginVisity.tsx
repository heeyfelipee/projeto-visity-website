import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function LoginVisity() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    // Usuário de teste
    if (email === 'teste@visity.com' && password === '123456') {
      setError('');
      window.location.href = '/dashboard-area'; // Redireciona para dashboard real
    } else {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-visity-primary to-visity-secondary dark:from-blue-900 dark:to-teal-900 relative">
      {/* Botão de voltar */}
      <button
        type="button"
        className="absolute top-6 left-6 bg-transparent p-2 rounded-full hover:bg-visity-accent/20 transition-all"
        onClick={() => window.location.href = "/"}
        aria-label="Voltar para o site"
      >
        <ChevronLeft className="w-7 h-7 text-visity-primary dark:text-white" />
      </button>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <img src="/favicon_io/icone.png" alt="Visity Logo" className="w-14 h-14" />
            <span className="font-bold text-visity-primary dark:text-white text-2xl">Visity</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-visity-dark dark:text-white mb-2 text-center">Bem-vindo de volta</h2>
        <p className="text-visity-gray dark:text-gray-400 mb-6 text-center">Faça login para acessar o dashboard</p>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-visity-dark dark:text-white mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-visity-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-visity-primary"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-visity-dark dark:text-white mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-visity-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-visity-primary"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
          <button type="submit" className="w-full bg-visity-primary hover:bg-visity-accent text-white font-semibold py-2 rounded-lg transition-colors mt-2">Entrar</button>
          <div className="w-full text-center mt-3">
            <button
              type="button"
              className="text-visity-primary dark:text-visity-accent font-semibold text-sm underline hover:text-visity-secondary transition-all"
              onClick={() => window.location.href = '/dashboard/#/RecuperarSenha'}
            >
              Esqueceu sua senha? Clique aqui para recuperar o acesso.
            </button>
          </div>
        </form>
        <div className="mt-6 text-xs text-visity-gray dark:text-gray-400 text-center">© 2026 Visity. Todos os direitos reservados.</div>
      </div>
    </div>
  );
}
