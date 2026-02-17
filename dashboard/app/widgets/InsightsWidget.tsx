import { useAIInsights } from '@/hooks/useAIInsights';
import { useState } from 'react';

export default function InsightsWidget() {
  const { result, loading, error, getInsights } = useAIInsights();
  const [input, setInput] = useState('Quais tendências para minha equipe?');

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2">Insights Inteligentes</h3>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="border rounded px-2 py-1 mb-2 w-full"
        placeholder="Digite sua pergunta"
      />
      <button
        className="bg-visity-primary text-white px-4 py-2 rounded"
        onClick={() => getInsights(input)}
        disabled={loading}
      >
        Gerar Insights
      </button>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {result && <p className="mt-2">{result}</p>}
    </div>
  );
}
