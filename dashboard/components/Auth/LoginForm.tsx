'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('Credenciais inválidas');
      const { accessToken, refreshToken } = await res.json();
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao autenticar');
    }
  }

  return (
    <div className="space-y-4 max-w-sm mx-auto mt-12 bg-white dark:bg-neutral-900 p-8 rounded-xl shadow">
      <div className="flex flex-col items-center mb-4">
        <img src="/favicon_io/icone.png" alt="Visity Logo" className="w-12 h-12 mb-2 rounded-full object-cover" />
        <span className="text-xl font-bold text-visity-primary">Visity</span>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">Bem-vindo de volta</h2>
      <p className="text-center text-visity-gray mb-6">Faça login para acessar o dashboard</p>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="E-mail" className="input w-full" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Senha" className="input w-full" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="btn btn-primary w-full">Entrar</button>
      </form>
      <button
        type="button"
        className="mt-6 w-full py-2 rounded-full bg-visity-accent text-white font-semibold text-lg hover:bg-visity-primary transition-all"
        onClick={() => router.push("/")}
      >
        Voltar para o site
      </button>
      <div className="text-xs text-center text-visity-gray mt-6">© 2026 Visity. Todos os direitos reservados.</div>
    </div>
  );
}
