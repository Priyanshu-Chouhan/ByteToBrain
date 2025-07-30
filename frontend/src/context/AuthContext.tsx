"use client";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
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
  const [forceUpdate, setForceUpdate] = useState(0);

  const login = (userData: UserType) => {
    console.log('AuthContext login called with:', userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log('User set in localStorage:', localStorage.getItem("user"));
    setForceUpdate(prev => prev + 1);
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (stored) {
      try {
        const userData = JSON.parse(stored);
        setUser(userData);
      } catch (e) {
        console.error('Error parsing stored user data:', e);
        localStorage.removeItem("user");
      }
      setLoading(false);
    } else if (token) {
      // If we have token but no user, fetch profile
      fetch(`${BACKEND_URL}/api/users/profile-details`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.profile) {
            const { name, email, phone, reference, avatar } = data.profile;
            const userData = { name, email, phone, reference, avatar };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      fetch(`${BACKEND_URL}/api/users/profile-details`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.profile) {
            const { name, email, phone, reference, avatar } = data.profile;
            const userData = { name, email, phone, reference, avatar };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
          }
          setLoading(false);
        })
        .catch(console.error)
        .finally(() => {
          // remove token from URL
          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, '', cleanUrl);
        });
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setForceUpdate(prev => prev + 1);
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
