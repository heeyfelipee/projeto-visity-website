import { useAIFAQ } from '@/hooks/useAIFAQ';
import { useState } from 'react';

export default function FAQWidget() {
  const { answer, loading, error, askFAQ } = useAIFAQ();
  const [question, setQuestion] = useState('');

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2">FAQ Automático</h3>
      <input
        type="text"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        className="border rounded px-2 py-1 mb-2 w-full"
        placeholder="Pergunte algo..."
      />
      <button
        className="bg-visity-primary text-white px-4 py-2 rounded"
        onClick={() => askFAQ(question)}
        disabled={loading || !question.trim()}
      >
        Perguntar
      </button>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {answer && <p className="mt-2">{answer}</p>}
    </div>
  );
}
