import { useState } from 'react';

const notifications = [
  { message: 'Nova visita agendada', type: 'info' },
  { message: 'Colaborador inativo detectado', type: 'warning' },
  { message: 'Relatório disponível', type: 'success' },
];

export default function NotificationWidget() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="fixed top-6 right-6 z-50">
      {visible && notifications.map((n, idx) => (
        <div
          key={idx}
          className={`mb-2 px-4 py-2 rounded shadow text-white ${n.type === 'info' ? 'bg-blue-500' : n.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`}
        >
          {n.message}
          <button className="ml-4 text-xs" onClick={() => setVisible(false)}>Fechar</button>
        </div>
      ))}
    </div>
  );
}
