import React, { useState } from 'react';

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Informe seu e-mail para recuperar a senha.');
      return;
    }
    // Simulação de envio para backend
    try {
      // Substitua por sua API real
      const res = await fetch('http://localhost:4000/api/auth/recuperar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error('E-mail não encontrado ou erro no envio.');
      setSent(true);
    } catch (err) {
      setError(err.message || 'Erro ao enviar recuperação.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-visity-primary to-visity-secondary dark:from-blue-900 dark:to-teal-900">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold text-visity-dark dark:text-white mb-2 text-center">Recuperar Senha</h2>
        <p className="text-visity-gray dark:text-gray-400 mb-6 text-center">Digite seu e-mail cadastrado para receber o link de recuperação.</p>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-visity-dark dark:text-white mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-visity-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-visity-primary"
              placeholder="seu@email.com"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
          <button type="submit" className="w-full bg-visity-primary hover:bg-visity-accent text-white font-semibold py-2 rounded-lg transition-colors mt-2">Enviar link de recuperação</button>
        </form>
        {sent && (
          <div className="mt-4 text-green-600 text-center text-sm">
            Se o e-mail informado estiver cadastrado, você receberá um link para redefinir sua senha.<br/>
            <b>Verifique sua caixa de entrada e o spam.</b>
          </div>
        )}
      </div>
    </div>
  );
}
