import { useState } from 'react';
import { useAIInsights } from '../hooks/useAIInsights';

export default function ImportClientWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { result, loading: iaLoading, error, getInsights } = useAIInsights();

  async function handleImport() {
    if (!file) return;
    setLoading(true);
    // Simulação: parse de Excel/PDF
    setTimeout(() => {
      const imported = [
        { name: 'Cliente 1', status: 'ativo', date: '2026-02-15' },
        { name: 'Cliente 2', status: 'inativo', date: '2026-02-15' },
      ];
      setStatus(imported);
      setLoading(false);
      getInsights('Valide e otimize o cadastro dos clientes: ' + JSON.stringify(imported));
    }, 1500);
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2">Importar Clientes</h3>
      <input type="file" accept=".xlsx,.xls,.pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button
        className="bg-visity-primary text-white px-4 py-2 rounded mt-2"
        onClick={handleImport}
        disabled={loading || !file}
      >
        Importar
      </button>
      {loading && <p>Importando...</p>}
      {status.length > 0 && (
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {status.map((item, idx) => (
              <tr key={idx} className={item.status === 'inativo' ? 'bg-red-50' : 'bg-green-50'}>
                <td>{item.name}</td>
                <td>{item.status === 'ativo' ? 'Ativo' : 'Inativo'}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {iaLoading && <p>IA validando cadastro...</p>}
      {result && <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">Sugestão IA: {result}</div>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
