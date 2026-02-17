import { useAIInsights } from '@/hooks/useAIInsights';
import { useState } from 'react';

const notifications = [
  { message: 'Nova visita agendada', type: 'info' },
  { message: 'Colaborador inativo detectado', type: 'warning' },
  { message: 'Relatório disponível', type: 'success' },
];

export default function NotificationWidgetIA() {
  const [visible, setVisible] = useState(true);
  const { result, loading, error, getInsights } = useAIInsights();
  const [selected, setSelected] = useState<string | null>(null);

  function handleIA(msg: string) {
    setSelected(msg);
    getInsights('Melhore a notificação: ' + msg);
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      {visible && notifications.map((n, idx) => (
        <div
          key={idx}
          className={`mb-2 px-4 py-2 rounded shadow text-white ${n.type === 'info' ? 'bg-blue-500' : n.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`}
        >
          {selected === n.message && loading && <span>IA aprimorando...</span>}
          {selected === n.message && error && <span className="text-red-500">{error}</span>}
          {selected === n.message && result ? (
            <span>{result}</span>
          ) : (
            <span>{n.message}</span>
          )}
          <button className="ml-4 text-xs" onClick={() => setVisible(false)}>Fechar</button>
          <button className="ml-2 text-xs bg-white text-black px-2 rounded" onClick={() => handleIA(n.message)}>
            IA Melhorar
          </button>
        </div>
      ))}
    </div>
  );
}
