import { useComplianceLogs } from '../../../hooks/useComplianceLogs';

export default function ComplianceLogs() {
  const { data, isLoading, error } = useComplianceLogs();
  if (isLoading) return <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">Carregando logs de compliance...</div>;
  if (error) return <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 text-red-600">Erro ao carregar logs</div>;
  if (!data) return null;
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
      <h3 className="font-semibold text-lg mb-4">Logs de Compliance</h3>
      <ul className="divide-y divide-neutral-200 dark:divide-neutral-800 max-h-64 overflow-y-auto">
        {data.slice(0, 10).map((log: any, i: number) => (
          <li key={i} className="py-2 flex flex-col gap-1">
            <span className="text-sm text-brand-primary font-medium">{log.action}</span>
            <span className="text-xs text-neutral-500">{log.entity} #{log.entityId}</span>
            <span className="text-xs text-neutral-400">{new Date(log.createdAt).toLocaleString('pt-BR')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
