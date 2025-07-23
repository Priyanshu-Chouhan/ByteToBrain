"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserType = {
  name: string;
  email: string;
  phone?: string;
  reference?: string;
  avatar?: string;
};

type AuthContextType = {
  user: UserType | null;
  login: (userData: UserType) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = (userData: UserType) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (loading) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#121212',
        color: '#2997FF',
        fontSize: '1.5rem',
        zIndex: 9999
      }}>
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 