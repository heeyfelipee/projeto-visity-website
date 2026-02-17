import { useRecentActivities } from '../../../hooks/useRecentActivities';

export default function RecentActivities() {
  const { data, isLoading, error } = useRecentActivities();
  if (isLoading) return <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">Carregando atividades...</div>;
  if (error) return <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 text-red-600">Erro ao carregar atividades</div>;
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
      <h3 className="font-semibold text-lg mb-4">Atividades Recentes</h3>
      <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {(data ?? []).map((a: any, i: number) => (
          <li key={i} className="py-2 flex justify-between items-center">
            <span className="font-medium text-brand-primary">{a.user?.name || a.userId || 'Usuário'}</span>
            <span className="text-sm text-neutral-600 dark:text-neutral-300">{a.action}</span>
            <span className="text-xs text-neutral-400">{new Date(a.createdAt).toLocaleString('pt-BR')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
