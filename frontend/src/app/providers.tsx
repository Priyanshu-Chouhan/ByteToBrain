"use client";
import React, { ReactNode } from 'react';
import { AuthProvider } from '../context/AuthContext';
import NavbarProvider from '../context/NavbarContext';

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <NavbarProvider>{children}</NavbarProvider>
    </AuthProvider>
  );
}