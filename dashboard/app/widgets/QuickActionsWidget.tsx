export default function QuickActionsWidget() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow flex gap-4">
      <button className="bg-visity-primary text-white px-4 py-2 rounded">Nova Visita</button>
      <button className="bg-visity-accent text-white px-4 py-2 rounded">Novo Colaborador</button>
      <button className="bg-green-500 text-white px-4 py-2 rounded">Exportar Relatório</button>
    </div>
  );
}
