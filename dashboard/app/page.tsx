import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard/Dashboard';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <Dashboard />
      </main>
    </>
  );
}
