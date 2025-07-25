"use client";
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();
  const login = auth?.login;

  useEffect(() => {
    const token = searchParams.get('token');
    const userString = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      console.error('Authentication error:', error);
      router.push('/login?error=auth_failed');
      return;
    }

    if (token && userString && login) {
      try {
        const user = JSON.parse(decodeURIComponent(userString));
        localStorage.setItem('token', token);
        login(user);
        router.push('/');
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login?error=auth_failed');
      }
    } else {
      router.push('/login');
    }
  }, [searchParams, router, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#18181b]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2997FF] mx-auto"></div>
        <p className="mt-4 text-white">Processing authentication...</p>
      </div>
    </div>
  );
}