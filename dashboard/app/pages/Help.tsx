import { useState } from 'react';
import { useAIFAQ } from '../hooks/useAIFAQ';

const faqs = [
  { question: 'Como cadastrar colaboradores?', answer: 'Clique em "Importar Colaboradores" e selecione o arquivo Excel ou PDF.' },
  { question: 'Como exportar relatórios?', answer: 'Acesse o painel de relatórios e clique em "Exportar".' },
  { question: 'Como funciona a agenda?', answer: 'A agenda permite visualizar e gerenciar eventos multinacionais.' },
];

export default function Help() {
  const { answer, loading, askFAQ } = useAIFAQ();
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(faqs);

  function handleSearch({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    setSearch(value);
    setFiltered(faqs.filter(f => f.question.toLowerCase().includes(value.toLowerCase())));
    if (value.length > 2) askFAQ(value);
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-6 text-visity-dark dark:text-white text-center">Ajuda & Documentação</h2>
      <div className="mb-6 flex gap-4 justify-center">
        <a href="https://youtube.com/visity" target="_blank" rel="noopener" className="bg-visity-primary text-white px-4 py-2 rounded">Tutoriais em vídeo</a>
        <a href="https://wa.me/551140001234" target="_blank" rel="noopener" className="bg-green-500 text-white px-4 py-2 rounded">Chat ao vivo (WhatsApp)</a>
      </div>
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="border rounded px-2 py-1 w-full"
          placeholder="Pesquisar no FAQ..."
        />
      </div>
      <div className="grid gap-4">
        {filtered.map((f, idx) => (
          <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded p-4">
            <strong>{f.question}</strong>
            <p>{f.answer}</p>
          </div>
        ))}
        {loading && <p>Carregando sugestão IA...</p>}
        {answer && <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">Sugestão IA: {answer}</div>}
      </div>
      <div className="mt-8 text-center">
        <img src="/assets/help-doc.png" alt="Documentação" className="mx-auto rounded shadow" style={{ maxWidth: 400 }} />
        <p className="mt-2 text-visity-gray dark:text-gray-400">Documentação profissional, detalhada, com imagens e exemplos.</p>
      </div>
    </div>
  );
}
