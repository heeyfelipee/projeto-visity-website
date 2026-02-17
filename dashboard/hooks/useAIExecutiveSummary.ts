import { useQuery } from '@tanstack/react-query';

export function useAIExecutiveSummary() {
  return useQuery(['ai-executive-summary'], async () => {
    const res = await fetch('/api/analytics/ai-insights', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!res.ok) throw new Error('Erro ao buscar resumo AI');
    return res.json();
  });
}
