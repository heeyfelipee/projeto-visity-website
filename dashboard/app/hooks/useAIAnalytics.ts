import { useState } from 'react';

export function useAIAnalytics() {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function analyzeData(data: any) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      const result = await res.json();
      setAnalysis(result.result);
    } catch (err) {
      setError('Erro ao buscar análise IA.');
    } finally {
      setLoading(false);
    }
  }

  return { analysis, loading, error, analyzeData };
}
