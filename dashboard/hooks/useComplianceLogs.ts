import { useQuery } from '@tanstack/react-query';

export function useComplianceLogs() {
  return useQuery(['compliance-logs'], async () => {
    const res = await fetch('/api/audit', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!res.ok) throw new Error('Erro ao buscar logs de compliance');
    return res.json();
  });
}
