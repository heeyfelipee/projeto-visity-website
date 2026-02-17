import { useSubscription } from '../../../hooks/useSubscription';

export default function SubscriptionStatus() {
  const { data, isLoading, error } = useSubscription();
  if (isLoading) return <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">Carregando assinatura...</div>;
  if (error) return <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 text-red-600">Erro ao carregar assinatura</div>;
  if (!data) return null;
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col gap-2">
      <h3 className="font-semibold text-lg mb-2">Status da Assinatura</h3>
      <div className="flex items-center gap-2">
        <span className="font-bold text-brand-primary">{data.plan}</span>
        <span className={`text-xs px-2 py-1 rounded ${data.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{data.status}</span>
      </div>
      <span className="text-xs text-neutral-500">Válida até: {data.expiresAt ? new Date(data.expiresAt).toLocaleDateString('pt-BR') : 'Indefinido'}</span>
    </div>
  );
}
