import { useTheme } from '@/hooks/useTheme';

export default function UserPopover({ user }: { user: any }) {
  const { theme } = useTheme();

  return (
    <div className={`rounded-xl p-4 shadow ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-visity-dark'}`}>
      <h3 className="font-semibold mb-2">Usuário</h3>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <button className="mt-2 bg-visity-primary text-white px-4 py-2 rounded">Sair</button>
    </div>
  );
}
