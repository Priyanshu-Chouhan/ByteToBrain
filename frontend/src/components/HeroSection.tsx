import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  icon?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, ctaText, ctaLink, icon }) => (
  <section className="flex flex-col items-center justify-center text-center py-16 bg-gradient-to-b from-blue-50 to-white">
    <div className="text-5xl mb-4 font-bold flex items-center gap-2">{icon} {title}</div>
    <div className="text-xl mb-6 text-gray-700 max-w-2xl">{subtitle}</div>
    <a href={ctaLink} className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">{ctaText}</a>
  </section>
);

export default HeroSection; 