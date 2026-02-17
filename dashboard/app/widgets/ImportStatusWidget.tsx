import { useState } from 'react';

export default function ImportStatusWidget({ imported }: { imported: any[] }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2">Status de Importação</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {imported.map((item, idx) => (
            <tr key={idx} className={item.status === 'inativo' ? 'bg-red-50' : 'bg-green-50'}>
              <td>{item.name}</td>
              <td>{item.status === 'ativo' ? 'Ativo' : 'Inativo'}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
