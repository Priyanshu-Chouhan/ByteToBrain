
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar, { WhatsAppStickyButton } from '../components/ClientNavbar';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>ByteToBrain - Your Digital Solutions Partner</title>
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212] text-white`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppStickyButton />
        </AuthProvider>
      </body>
    </html>
  );
}
