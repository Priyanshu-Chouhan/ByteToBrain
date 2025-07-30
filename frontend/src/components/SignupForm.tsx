"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

const hearOptions = [
  'LinkedIn',
  'Instagram',
  'WhatsApp',
  'Facebook',
  'Other',
];

function getPasswordStrength(password: string) {
  if (password.length < 6) return 'Weak';
  if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) return 'Strong';
  return 'Medium';
}

const SignupForm: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    hear: '',
    hearOther: '',
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const router = useRouter();
  const auth = useAuth();
  const login = auth?.login;

  // Helper functions for password rules
  const hasMinLength = form.password.length >= 8;
  const hasUpper = /[A-Z]/.test(form.password);
  const hasLower = /[a-z]/.test(form.password);
  const hasNumber = /[0-9]/.test(form.password);
  const hasSpecial = /[^A-Za-z0-9]/.test(form.password);

  const validate = () => {
    const errs: any = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errs.email = 'Valid email required.';
    if (!form.phone.match(/^\d{10}$/)) errs.phone = 'Valid 10-digit phone required.';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    if (!form.hear) errs.hear = 'Please select an option.';
    if (form.hear === 'Other' && !form.hearOther.trim()) errs.hearOther = 'Please specify.';
    if (!form.terms) errs.terms = 'You must accept the terms.';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === 'checkbox') {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
    setFieldErrors((prev: any) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      console.log('Attempting signup to:', `${BACKEND_URL}/api/users/register`);
      const res = await fetch(`${BACKEND_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          reference: form.hear === 'Other' ? form.hearOther : form.hear,
        }),
      });
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Backend server not running. Please start the backend server.');
        }
        try {
          const data = await res.json();
          setError(data.error || 'Signup failed');
          return;
        } catch {
          setError('Signup failed');
          return;
        }
      }
      
      const data = await res.json();
      console.log('Signup response:', data);
      
      // Auto-login after successful signup
      if (data.user && login) {
        const userData = {
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          reference: data.user.reference,
          avatar: data.user.avatar
        };
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        login(userData);
        setMessage('Account created successfully! Welcome!');
        window.location.href = '/';
        return;
      }
      
      setMessage('Signup successful! Please login.');
      setForm({ name: '', email: '', phone: '', password: '', confirmPassword: '', hear: '', hearOther: '', terms: false });
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Network error. Please check if backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto bg-[#18181b] p-8 rounded-2xl shadow-2xl border border-[#232326]">
      <h2 className="text-2xl font-bold mb-2 text-center text-white">Sign Up</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-white font-medium">Full Name</label>
        <input name="name" id="name" type="text" placeholder="Enter your full name" value={form.name} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#2997FF]" style={{WebkitBoxShadow: '0 0 0 1000px #232326 inset', WebkitTextFillColor: 'white'}} />
        {fieldErrors.name && <div className="text-red-500 text-sm">{fieldErrors.name}</div>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-white font-medium">Email</label>
        <input name="email" id="email" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#2997FF]" style={{WebkitBoxShadow: '0 0 0 1000px #232326 inset', WebkitTextFillColor: 'white'}} />
        {fieldErrors.email && <div className="text-red-500 text-sm">{fieldErrors.email}</div>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-white font-medium">Phone</label>
        <input name="phone" id="phone" type="tel" placeholder="Enter your phone number" value={form.phone} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#2997FF]" style={{WebkitBoxShadow: '0 0 0 1000px #232326 inset', WebkitTextFillColor: 'white'}} />
        {fieldErrors.phone && <div className="text-red-500 text-sm">{fieldErrors.phone}</div>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-white font-medium">Password</label>
        <div className="relative">
          <input name="password" id="password" type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={form.password} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#2997FF]" style={{WebkitBoxShadow: '0 0 0 1000px #232326 inset', WebkitTextFillColor: 'white'}} />
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
        <ul className="text-xs mb-1 grid grid-cols-2 gap-x-6 gap-y-1">
          <li className={hasMinLength ? 'text-green-400' : 'text-red-400'}>
            {hasMinLength ? '✔️' : '❌'} At least 8 characters
          </li>
          <li className={hasUpper ? 'text-green-400' : 'text-red-400'}>
            {hasUpper ? '✔️' : '❌'} At least one uppercase letter
          </li>
          <li className={hasLower ? 'text-green-400' : 'text-red-400'}>
            {hasLower ? '✔️' : '❌'} At least one lowercase letter
          </li>
          <li className={hasNumber ? 'text-green-400' : 'text-red-400'}>
            {hasNumber ? '✔️' : '❌'} At least one number
          </li>
          <li className={(hasSpecial ? 'text-green-400' : 'text-red-400') + ' whitespace-nowrap'}>
            {hasSpecial ? '✔️' : '❌'} At least one special character <span className="whitespace-nowrap">(e.g. !@#$%^&*)</span>
          </li>
        </ul>
        {fieldErrors.password && <div className="text-red-500 text-sm">{fieldErrors.password}</div>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-white font-medium">Confirm Password</label>
        <div className="relative">
          <input name="confirmPassword" id="confirmPassword" type={showConfirm ? 'text' : 'password'} placeholder="Confirm your password" value={form.confirmPassword} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#2997FF]" style={{WebkitBoxShadow: '0 0 0 1000px #232326 inset', WebkitTextFillColor: 'white'}} />
        <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-3 cursor-pointer text-gray-400 focus:outline-none" tabIndex={-1} aria-label={showConfirm ? 'Hide password' : 'Show password'}>
          {showConfirm ? (
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
        {fieldErrors.confirmPassword && <div className="text-red-500 text-sm">{fieldErrors.confirmPassword}</div>}
      </div>
      <div>
        <label className="block mb-1 text-white">How did you hear about us?</label>
        <select name="hear" value={form.hear} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#2997FF]">
          <option value="">Select</option>
          {hearOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        {form.hear === 'Other' && (
          <input name="hearOther" type="text" placeholder="Please specify" value={form.hearOther} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded mt-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2997FF]" style={{WebkitBoxShadow: '0 0 0 1000px #232326 inset', WebkitTextFillColor: 'white'}} />
        )}
        {fieldErrors.hear && <div className="text-red-500 text-sm">{fieldErrors.hear}</div>}
        {fieldErrors.hearOther && <div className="text-red-500 text-sm">{fieldErrors.hearOther}</div>}
      </div>
      <div className="flex items-center gap-2">
        <input name="terms" type="checkbox" checked={form.terms} onChange={handleChange} className="accent-[#2997FF]" />
        <span className="text-sm text-white">I accept the <a href="/terms" className="underline text-blue-400">Terms & Conditions</a></span>
      </div>
      {fieldErrors.terms && <div className="text-red-500 text-sm">{fieldErrors.terms}</div>}
      <button type="submit" className="bg-[#2997FF] text-white py-2 rounded-full font-semibold hover:bg-[#0071E3] transition" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
      {message && <div className="text-green-400 text-center">{message}</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
    </form>
  );
};

export default SignupForm; 