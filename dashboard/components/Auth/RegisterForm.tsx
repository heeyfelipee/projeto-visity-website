'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', company: '', cnpj: '', phone: '', address: '', city: '', state: '', cep: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Erro ao registrar');
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4 max-w-lg mx-auto mt-12 bg-white dark:bg-neutral-900 p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Criar Conta VISITY</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" required placeholder="Nome completo" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input w-full" />
        <input type="email" required placeholder="E-mail" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input w-full" />
        <input type="password" required placeholder="Senha forte" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="input w-full" />
        <input type="text" required placeholder="Empresa" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className="input w-full" />
        <input type="text" required placeholder="CNPJ" value={form.cnpj} onChange={e => setForm(f => ({ ...f, cnpj: e.target.value }))} className="input w-full" />
        <input type="text" required placeholder="Telefone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input w-full" />
        <input type="text" required placeholder="Endereço" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="input w-full" />
        <input type="text" required placeholder="Cidade" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="input w-full" />
        <input type="text" required placeholder="Estado (UF)" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} className="input w-full" />
        <input type="text" required placeholder="CEP" value={form.cep} onChange={e => setForm(f => ({ ...f, cep: e.target.value }))} className="input w-full" />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? 'Criando...' : 'Finalizar Cadastro'}</button>
    </form>
  );
}
