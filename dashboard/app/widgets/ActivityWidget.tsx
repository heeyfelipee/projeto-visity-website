import { useAIInsights } from '@/hooks/useAIInsights';
import { useState } from 'react';

const activities = [
  { name: 'Carlos M.', action: 'Check-in', time: '2 min', status: 'success' },
  { name: 'Ana P.', action: 'Check-out', time: '5 min', status: 'success' },
  { name: 'João S.', action: 'Em visita', time: '12 min', status: 'pending' },
  { name: 'Maria Santos', action: 'Check-in em Cliente DEF', time: '18 min', status: 'success' },
  { name: 'Pedro Costa', action: 'Alerta: GPS desativado', time: '25 min', status: 'error' },
];

export default function ActivityWidget() {
  const { result, loading, error, getInsights } = useAIInsights();
  const [showIA, setShowIA] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2">Atividades Recentes</h3>
      <ul className="mb-4">
        {activities.map((a, idx) => (
          <li key={idx} className={a.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}>
            {a.name} - {a.action} ({a.time})
          </li>
        ))}
      </ul>
      <button
        className="bg-visity-primary text-white px-4 py-2 rounded"
        onClick={() => { getInsights('Enriqueça os dados das atividades: ' + JSON.stringify(activities)); setShowIA(true); }}
        disabled={loading}
      >
        Enriquecer com IA
      </button>
      {showIA && loading && <p>Carregando IA...</p>}
      {showIA && error && <p className="text-red-500">{error}</p>}
      {showIA && result && <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">{result}</div>}
    </div>
  );
}
