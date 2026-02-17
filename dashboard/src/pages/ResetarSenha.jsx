import React, { useState } from 'react';

export default function ResetarSenha() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Pega o token da URL
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!password || !confirm) {
      setError('Preencha todos os campos.');
      return;
    }
    if (password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/auth/resetar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      if (!res.ok) throw new Error('Token inválido ou erro ao redefinir senha.');
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Erro ao redefinir senha.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-visity-primary to-visity-secondary dark:from-blue-900 dark:to-teal-900">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold text-visity-dark dark:text-white mb-2 text-center">Redefinir Senha</h2>
        <p className="text-visity-gray dark:text-gray-400 mb-6 text-center">Digite sua nova senha abaixo.</p>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-visity-dark dark:text-white mb-1">Nova senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-visity-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-visity-primary"
              placeholder="Digite a nova senha"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-visity-dark dark:text-white mb-1">Confirmar senha</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-visity-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-visity-primary"
              placeholder="Confirme a nova senha"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
          <button type="submit" className="w-full bg-visity-primary hover:bg-visity-accent text-white font-semibold py-2 rounded-lg transition-colors mt-2">Redefinir senha</button>
        </form>
        {success && (
          <div className="mt-4 text-green-600 text-center text-sm">
            Senha redefinida com sucesso!<br/>
            Agora você pode fazer login normalmente.<br/>
            <a href="/#/RecuperarSenha" className="text-visity-primary underline">Voltar para login</a>
          </div>
        )}
      </div>
    </div>
  );
}
