import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white dark:bg-neutral-900 shadow">
      <Link href="/" className="flex items-center gap-2">
        <img src="/assets/logo.svg" alt="VISITY" className="h-8" />
        <span className="font-bold text-brand-primary text-xl">Visity</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/register" target="_blank" className="btn btn-primary">Teste Grátis</Link>
        <Link href="/login" className="btn btn-outline-primary">Acessar Painel</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
