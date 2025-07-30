"use client";
import LoginForm from '../../components/LoginForm';
import { useEffect } from 'react';

function setPageTitle() {
  if (typeof document !== 'undefined') {
    document.title = "Login | ByteToBrain";
  }
}

export default function Login() {
  useEffect(() => {
    setPageTitle();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-8">
      <LoginForm />
      <div className="mt-4 text-center text-sm text-gray-700">
        New user?{' '}
        <a href="/signup" className="text-blue-600 hover:underline font-semibold">Create an account</a>
      </div>
    </div>
  );
} 