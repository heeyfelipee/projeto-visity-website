import { useQuery } from '@tanstack/react-query';

export function useSubscription() {
  return useQuery(['subscription'], async () => {
    const res = await fetch('/api/subscription', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!res.ok) throw new Error('Erro ao buscar assinatura');
    return res.json();
  });
}
