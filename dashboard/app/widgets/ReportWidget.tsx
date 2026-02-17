import { useAIInsights } from '@/hooks/useAIInsights';
import { useState } from 'react';

export default function ReportWidget({ data }: { data: any }) {
  const { result, loading, error, getInsights } = useAIInsights();
  const [showIA, setShowIA] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2">Relatório Detalhado</h3>
      {/* Modelo inovador: tabela + IA */}
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th>Colaborador</th>
            <th>Visitas</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, idx: number) => (
            <tr key={idx} className={item.status === 'inativo' ? 'bg-red-50' : ''}>
              <td>{item.name}</td>
              <td>{item.visits}</td>
              <td>{item.status}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-visity-primary text-white px-4 py-2 rounded"
        onClick={() => { getInsights('Resumo detalhado do relatório: ' + JSON.stringify(data)); setShowIA(true); }}
        disabled={loading}
      >
        Gerar Sugestão IA
      </button>
      {showIA && loading && <p>Carregando IA...</p>}
      {showIA && error && <p className="text-red-500">{error}</p>}
      {showIA && result && <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">{result}</div>}
    </div>
  );
}
