type KPIProps = { label: string; value: number; trend?: number };
export default function KPI({ label, value, trend }: KPIProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center">
      <span className="text-lg font-semibold text-brand-primary">{label}</span>
      <span className="text-3xl font-bold mt-2">{value}</span>
      {trend !== undefined && (
        <span className={`mt-1 text-sm ${trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'}`}>
          {trend > 0 ? `▲ +${trend}%` : trend < 0 ? `▼ ${trend}%` : '—'}
        </span>
      )}
    </div>
  );
}
