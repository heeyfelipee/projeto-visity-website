import { useAIExecutiveSummary } from '../../../hooks/useAIExecutiveSummary';

export default function AIExecutiveSummary() {
  const { data, isLoading, error } = useAIExecutiveSummary();
  return (
    <div className="bg-gradient-to-br from-brand-primary/90 to-brand-secondary/80 text-white rounded-xl shadow p-6 flex flex-col gap-2">
      <h3 className="font-semibold text-lg mb-2">Resumo Executivo (AI)</h3>
      {isLoading && <p className="text-base">Carregando resumo...</p>}
      {error && <p className="text-base text-red-200">Erro ao carregar resumo</p>}
      {data && <p className="text-base">{data.executiveSummary}</p>}
      <span className="text-xs opacity-80">Gerado automaticamente por inteligência artificial</span>
    </div>
  );
}
