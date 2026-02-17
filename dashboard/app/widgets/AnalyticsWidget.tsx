import { useAIAnalytics } from '@/hooks/useAIAnalytics';
import { useState } from 'react';

const analyticsData = [
  { kpi: 'Visitas', value: 120, priority: 'alta' },
  { kpi: 'Clientes', value: 30, priority: 'média' },
  { kpi: 'Ativos', value: 15, priority: 'baixa' },
];

const priorityColors = {
  alta: 'bg-red-500',
  média: 'bg-yellow-500',
  baixa: 'bg-green-500',
};

export default function AnalyticsWidget() {
  const { analysis, loading, error, analyzeData } = useAIAnalytics();
  const [showIA, setShowIA] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2">Analytics Inteligente</h3>
      <div className="flex gap-4 mb-4">
        {analyticsData.map((item, idx) => (
          <div key={idx} className={`p-2 rounded text-white ${priorityColors[item.priority]}`}>
            <strong>{item.kpi}</strong>: {item.value}
          </div>
        ))}
      </div>
      <button
        className="bg-visity-primary text-white px-4 py-2 rounded"
        onClick={() => { analyzeData(analyticsData); setShowIA(true); }}
        disabled={loading}
      >
        Gerar Insights IA
      </button>
      {showIA && loading && <p>Carregando IA...</p>}
      {showIA && error && <p className="text-red-500">{error}</p>}
      {showIA && analysis && <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">{analysis}</div>}
    </div>
  );
}
