import { useKPI } from '../../../hooks/useKPI';

export default function KPICards() {
  const { data, isLoading, error } = useKPI();
  if (isLoading) return <div className="mb-8">Carregando KPIs...</div>;
  if (error) return <div className="mb-8 text-red-600">Erro ao carregar KPIs</div>;
  const kpis = [
    { label: 'Total de Visitas', value: data?.kpis?.totalVisits ?? 0, trend: data?.monthlyGrowth ?? 0 },
    { label: 'Visitantes Ativos', value: data?.kpis?.activeVisitors ?? 0 },
    { label: 'Aprovações Pendentes', value: data?.kpis?.pendingApprovals ?? 0 },
    { label: 'Alertas de Compliance', value: data?.kpis?.complianceAlerts ?? 0 }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-lg font-semibold text-brand-primary">{kpi.label}</span>
          <span className="text-3xl font-bold mt-2">{kpi.value}</span>
          {kpi.trend !== undefined && (
            <span className={`mt-1 text-sm ${kpi.trend > 0 ? 'text-green-600' : kpi.trend < 0 ? 'text-red-600' : 'text-gray-500'}`}>
              {kpi.trend > 0 ? `▲ +${kpi.trend}%` : kpi.trend < 0 ? `▼ ${kpi.trend}%` : '—'}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
