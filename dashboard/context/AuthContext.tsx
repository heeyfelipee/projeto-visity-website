'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  tenantId: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Checa token localStorage e busca user info
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Decodifica JWT (simples, para exemplo)
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        id: payload.id,
        email: payload.email,
        name: payload.name || '',
        role: payload.role,
        tenantId: payload.tenantId
      });
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Credenciais inválidas');
    const { accessToken, refreshToken } = await res.json();
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    setUser({
      id: payload.id,
      email: payload.email,
      name: payload.name || '',
      role: payload.role,
      tenantId: payload.tenantId
    });
    setLoading(false);
    router.push('/dashboard');
  }

  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
