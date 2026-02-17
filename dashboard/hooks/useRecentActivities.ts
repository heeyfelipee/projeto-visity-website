import { useQuery } from '@tanstack/react-query';

export function useRecentActivities() {
  return useQuery(['recent-activities'], async () => {
    const res = await fetch('/api/audit', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!res.ok) throw new Error('Erro ao buscar atividades');
    return res.json();
  });
}
