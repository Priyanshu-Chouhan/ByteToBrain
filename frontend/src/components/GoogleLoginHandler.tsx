"use client";
import React from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

const GoogleLoginHandler: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 rounded-full py-2 px-4 hover:bg-gray-100 transition font-medium shadow"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
    >
      <img src="/google.png" alt="Google" className="w-5 h-5" />
      Sign in with Google
    </button>
  );
};

export default GoogleLoginHandler;