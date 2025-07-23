"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useNavbarContext } from '../context/NavbarContext';

const socialLinks = [
  { href: 'https://mail.google.com/mail/?view=cm&fs=1&to=rachanasen1999@gmail.com', icon: '/gmail.png', label: 'Gmail' },
  { href: 'https://www.linkedin.com/company/bytetobrain/?viewAsMember=true', icon: '/linkedin.png', label: 'LinkedIn' },
  { href: 'https://wa.me/918269028823', icon: '/whatsapp.png', label: 'WhatsApp' },
  { href: 'https://www.instagram.com/byte_to_brain?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', icon: '/instagram.png', label: 'Instagram' },
  { href: 'https://www.facebook.com/bytetobrain', icon: '/communication.png', label: 'Facebook' },
];

const phone = '+91 98765 43210';
const officeHours = 'Mon-Sat, 10am - 7pm';
const miniAbout = 'ByteToBrain empowers your business with innovative digital solutions, design, and technology.';
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About' },
  { href: '/services/web-development', label: 'Services' },
  { href: '/projects', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/careers', label: 'Careers' },
];
const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
];

const Footer: React.FC = () => {
  const { setOpenServices } = useNavbarContext();
  const scrollToNavbarServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        setOpenServices(true);
      }, 400);
    } else {
      // fallback: scroll to nav
      const nav = document.querySelector('nav');
      if (nav) {
        window.scrollTo({ top: nav.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
        setTimeout(() => {
          setOpenServices(true);
        }, 400);
      }
    }
  };

  return (
    <footer className="bg-[#18181b] py-10 mt-12 border-t border-[#232326] text-[#C7C7CC]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Address & Contact */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2">
            <img src="/location.png" alt="Location" className="w-5 h-5 mt-1" />
            <span className="text-base text-white font-semibold leading-tight">
              <span className="text-[#FFA500] font-bold mr-1">Address:</span>
              <span className="block">Saraswati Nagar, Near Water Tank,</span>
              <span className="block">Goragaon, Bhopal,</span>
              <span className="block">Madhya Pradesh, 462044</span>
            </span>
          </div>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rachanasen1999@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#2997FF] hover:underline text-sm font-medium">
            <img src="/gmail.png" alt="Gmail" className="w-5 h-5" /> rachanasen1999@gmail.com
          </a>
          <a href="https://wa.me/918269028823" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#25D366] hover:underline text-sm font-medium">
            <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5" /> +91 82690 28823
          </a>
          <div className="text-xs text-[#C7C7CC] mt-1">Office Hours: {officeHours}</div>
        </div>
        {/* Mini About/Tagline */}
        <div className="flex flex-col gap-3">
          <div className="text-white font-semibold text-lg mb-1">About ByteToBrain</div>
          <div className="text-sm text-[#C7C7CC]">{miniAbout}</div>
        </div>
        {/* Navigation Links */}
        <div className="flex flex-col gap-3">
          <div className="text-white font-semibold text-lg mb-1">Quick Links</div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) =>
              link.label === 'Services' ? (
                <a key={link.href} href="#" onClick={scrollToNavbarServices} className="hover:text-[#2997FF] text-sm cursor-pointer">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="hover:text-[#2997FF] text-sm">
                  {link.label}
                </Link>
              )
            )}
          </div>
      </div>
        {/* Newsletter & Social */}
        <div className="flex flex-col gap-3 items-start">
          <div className="text-white font-semibold text-lg mb-1">Social Media</div>
          <div className="flex gap-3 mt-1">
        {socialLinks.map((link) => (
              <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
            aria-label={link.label}
          >
                <img src={link.icon} alt={link.label} className="w-7 h-7 rounded-full" />
              </a>
            ))}
          </div>
          <div className="flex gap-3 mt-3">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-[#C7C7CC] hover:text-[#2997FF] underline">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 pb-0 mb-0">
        <div className="w-full text-center text-xs text-[#C7C7CC]">&copy; {new Date().getFullYear()} ByteToBrain. All rights reserved.</div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed right-24 bottom-24 md:bottom-16 bg-[#2997FF] text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-[#0071E3] transition shadow-lg z-50"
          aria-label="Back to top"
        >
          ↑ Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer; 