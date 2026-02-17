import { useState } from 'react';

export function useAIFAQ() {
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function askFAQ(question: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.result);
    } catch (err) {
      setError('Erro ao buscar resposta IA.');
    } finally {
      setLoading(false);
    }
  }

  return { answer, loading, error, askFAQ };
}
