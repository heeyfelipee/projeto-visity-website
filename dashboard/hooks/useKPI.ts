import { useQuery } from '@tanstack/react-query';

export function useKPI() {
  return useQuery(['kpi'], async () => {
    const res = await fetch('/api/analytics/overview', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!res.ok) throw new Error('Erro ao buscar KPIs');
    return res.json();
  });
}
