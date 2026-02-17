import { useAIFAQ } from '@/hooks/useAIFAQ';
import { useState } from 'react';

const suggestions = [
  'Cliente A',
  'Cliente B',
  'Colaborador X',
  'Visita Y',
];

export default function SearchWidget() {
  const { answer, loading, askFAQ } = useAIFAQ();
  const [query, setQuery] = useState('');
  const [auto, setAuto] = useState<string[]>([]);

  function handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    setQuery(value);
    setAuto(suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase())));
    if (value.length > 2) askFAQ(value);
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2">Pesquisa Inteligente</h3>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="border rounded px-2 py-1 mb-2 w-full"
        placeholder="Pesquisar..."
      />
      {auto.length > 0 && (
        <ul className="bg-gray-100 dark:bg-gray-800 rounded p-2">
          {auto.map((s, idx) => <li key={idx}>{s}</li>)}
        </ul>
      )}
      {loading && <p>Carregando sugestão IA...</p>}
      {answer && <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">Sugestão IA: {answer}</div>}
    </div>
  );
}
