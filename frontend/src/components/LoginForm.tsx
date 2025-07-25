"use client";
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

const LoginForm: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const login = auth?.login;
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setMessage('Login successful!');
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user && login) {
        // Fetch latest profile for avatar
        try {
          const profileRes = await fetch(`${BACKEND_URL}/api/users/profile-details`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${data.token}` },
          });
          const profileData = await profileRes.json();
          if (profileRes.ok && profileData.profile) {
            login({ ...data.user, avatar: profileData.profile.avatar });
          } else {
            login(data.user);
          }
        } catch {
          login(data.user);
        }
        router.push('/');
      }
      setForm({ email: '', password: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      // Send the credential to your backend for verification
      const res = await fetch(`${BACKEND_URL}/api/auth/google/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Google login failed');

      setMessage('Google login successful!');
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user && login) {
        login(data.user);
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto bg-[#18181b] p-8 rounded-2xl shadow-2xl border border-[#232326]">
      <h2 className="text-2xl font-bold mb-2 text-center text-white">Login</h2>
      <input name="email" type="email" placeholder="Email or Phone" value={form.email} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#2997FF]" required />
      <div className="relative">
        <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#2997FF]" required />
        <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-3 cursor-pointer text-gray-400 focus:outline-none" tabIndex={-1} aria-label={showPassword ? 'Hide password' : 'Show password'}>
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001C3.226 15.613 7.113 19.5 12 19.5c1.658 0 3.237-.338 4.646-.95M21.065 12.001a10.477 10.477 0 00-2.045-3.778M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.86-.67 1.671-1.176 2.414M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-[#A1A1A6]">
          <input type="checkbox" className="accent-[#2997FF]" /> Remember Me
        </label>
        <a href="/forgot-password" className="text-[#2997FF] hover:underline">Forgot Password?</a>
      </div>
      <button type="submit" className="bg-[#2997FF] text-white py-2 rounded-full font-semibold hover:bg-[#0071E3] transition" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      
      {/* Google Login Button */}
      <div className="w-full">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={handleGoogleLoginError}
          theme="filled_blue"
          size="large"
          width="100%"
          text="signin_with"
          shape="pill"
        />
      </div>
      {message && <div className="text-green-500 text-center">{message}</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
    </form>
  );
};

export default LoginForm; 