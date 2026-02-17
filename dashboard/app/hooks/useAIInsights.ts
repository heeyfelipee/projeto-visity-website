import { useState } from 'react';

export function useAIInsights() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getInsights(prompt: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setError('Erro ao buscar insights IA.');
    } finally {
      setLoading(false);
    }
  }

  return { result, loading, error, getInsights };
}
