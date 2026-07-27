import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api, apiGet, apiPost } from '@/lib/api';
import type { User } from '@/lib/types';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, try to restore the session (refresh cookie → access token → /me).
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { user } = await apiGet<{ user: User }>('/auth/me');
        if (active) setUser(user);
      } catch {
        // Try a silent refresh, then /me again.
        try {
          await api.post('/auth/refresh');
          const { user } = await apiGet<{ user: User }>('/auth/me');
          if (active) setUser(user);
        } catch {
          if (active) setUser(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { user } = await apiPost<{ user: User }>('/auth/login', { email, password });
    setUser(user);
    return user;
  };

  const register = async (input: RegisterInput) => {
    const { user } = await apiPost<{ user: User }>('/auth/register', input);
    setUser(user);
    return user;
  };

  const logout = async () => {
    try {
      await apiPost('/auth/logout');
    } finally {
      setUser(null);
    }
  };

  const refresh = async () => {
    const { user } = await apiGet<{ user: User }>('/auth/me');
    setUser(user);
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refresh }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
