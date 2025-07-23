"use client";

import HeroSection from './HeroSection';
import ServiceCard from './ServiceCard';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import TestimonialCard from './TestimonialCard';
import ContactForm from './ContactForm';
import { useRef, useEffect, useState } from 'react';

function AnimatedFeatures() {
  const features = [
    { icon: '⚡', title: 'Fast Delivery', desc: 'Quick turnaround for all projects.' },
    { icon: '🎨', title: 'Modern Design', desc: 'Trendy, user-friendly interfaces.' },
    { icon: '🔒', title: 'Secure & Scalable', desc: 'Best practices for growth & safety.' },
  ];
  return (
    <section className="w-full bg-[#18181b] py-16 px-4 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">What Makes Us Different?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-[#232326] rounded-xl p-8 shadow-lg flex flex-col items-center text-center"
          >
            <span className="text-4xl mb-4">{f.icon}</span>
            <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-[#A1A1A6]">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const projects = [
  {
    title: 'E-commerce Website',
    description: 'A modern e-commerce platform with payment integration and admin dashboard.',
    image: '/project1.png',
  },
  {
    title: 'Branding & UI/UX',
    description: 'Complete branding and UI/UX design for a startup.',
    image: '/project2.png',
  },
  {
    title: 'Portfolio Website',
    description: 'Personal portfolio website with blog and contact form.',
    image: '/project3.png',
  },
];

const testimonials = [
  {
    name: 'Amit Sharma',
    role: 'Business Owner',
    message: 'ByteToBrain delivered our website on time with amazing quality. Highly recommended!',
    image: '/user1.jpg',
  },
  {
    name: 'Priya Verma',
    role: 'Startup Founder',
    message: 'Their UI/UX and branding work helped us stand out in the market.',
    image: '/user2.jpg',
  },
  {
    name: 'Rahul Singh',
    role: 'Freelancer',
    message: 'Professional, creative, and always available for support. Great experience!',
    image: '/user3.jpg',
  },
];

export default function HomeClient() {
  const services = [
    {
      icon: <img src="/programming.png" alt="Programming" className="w-12 h-12" />,
      title: "Web Development",
      desc: "Custom websites and web apps to boost your business online.",
      features: ["SEO Ready", "Responsive", "Fast Delivery"],
      link: "/services/web-development",
    },
    {
      icon: <img src="/app-development.png" alt="App Development" className="w-16 h-16" />,
      title: "Mobile App Development",
      desc: "Android & iOS apps for your brand and customers.",
      features: ["Cross-platform", "Modern UI", "Smooth UX"],
      link: "/services/web-development#mobile-app",
    },
    {
      icon: <img src="/web-design.png" alt="Web Design" className="w-12 h-12" />,
      title: "UI/UX Design",
      desc: "User-centric, beautiful, and intuitive interfaces for web and mobile.",
      features: ["Wireframes", "Prototyping", "Brand Consistency"],
      link: "/services/uiux-branding#uiux-design",
    },
    {
      icon: <img src="/cloud-icon.png" alt="Cloud Solutions" className="w-16 h-16" />,
      title: "Cloud Solutions",
      desc: "Cloud migration, DevOps, and scalable infrastructure for your business.",
      features: ["AWS, Azure, GCP", "DevOps", "Secure & Scalable"],
      link: "/services/cloud-marketing#cloud-devops",
    },
    {
      icon: <img src="/social-media.png" alt="Digital Marketing" className="w-14 h-14" />,
      title: "Digital Marketing",
      desc: "Grow your brand with SEO, social media, and digital campaigns.",
      features: ["SEO", "Social Media", "Lead Generation"],
      link: "/services/cloud-marketing#digital-marketing",
    },
    {
      icon: <img src="/brand.png" alt="Branding" className="w-16 h-16" />,
      title: "Branding",
      desc: "Build a memorable brand identity with our creative team.",
      features: ["Logo Design", "Brand Guidelines", "Rebranding"],
      link: "/services/uiux-branding#branding",
    },
  ];

  // Hybrid marquee: auto-scroll with smooth manual scroll/drag, auto resumes after manual
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = useState(false);

  // Calculate dynamic width for the marquee container
  const CARD_WIDTH = 280; // min-w-[280px]
  const GAP = 32; // gap-8 (2rem = 32px)
  const cardCount = services.length * 2;
  const marqueeWidth = cardCount * CARD_WIDTH + (cardCount - 1) * GAP;

  // Auto-scroll logic (smooth with requestAnimationFrame)
  useEffect(() => {
    let frame: number;
    const speed = 1.2; // px per frame, adjust for smoothness
    function step() {
      if (paused || isDragging) return;
      const marquee = marqueeRef.current;
      if (!marquee) return;
      marquee.scrollLeft += speed;
      if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
        marquee.scrollLeft = 0;
      }
      frame = requestAnimationFrame(step);
    }
    if (!paused && !isDragging) {
      frame = requestAnimationFrame(step);
    }
    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [paused, isDragging]);

  // Manual drag scroll
  const handleManualStart = (clientX: number) => {
    setIsDragging(true);
    setPaused(true);
    dragStartX.current = clientX;
    scrollStartX.current = marqueeRef.current?.scrollLeft || 0;
  };
  const handleManualMove = (clientX: number) => {
    if (!isDragging || !marqueeRef.current) return;
    const dx = clientX - dragStartX.current;
    marqueeRef.current.scrollLeft = scrollStartX.current - dx;
  };
  const handleManualEnd = () => {
    setIsDragging(false);
    setPaused(false);
  };
  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => handleManualStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleManualMove(e.clientX);
  const handleMouseUp = () => handleManualEnd();
  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => handleManualStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleManualMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleManualEnd();
  // Manual scroll (scrollbar)
  const handleScroll = () => {
    setPaused(true);
    if (!isDragging) setIsDragging(true);
    if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
    setTimeout(() => {
      setIsDragging(false);
      setPaused(false);
    }, 100);
  };

  // Card hover/click handlers
  const handleCardMouseEnter = () => setPaused(true);
  const handleCardMouseLeave = () => setPaused(false);
  const handleCardClick = () => setPaused(true);

  return (
    <>
      <div className="relative w-full h-[380px] md:h-[520px] flex items-center justify-between bg-black overflow-hidden pt-16 md:pt-20">
        {/* Hero Image */}
        <Image
          src="/laptop-neon.jpg"
          alt="Neon Laptop with Code"
          fill
          className="object-cover object-center absolute top-0 left-0 w-full h-full z-0"
          priority
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* Content */}
        <div className="relative z-20 flex flex-col items-start justify-center h-full w-full max-w-2xl pl-8 md:pl-16 -mt-16 text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 drop-shadow-2xl leading-tight max-w-xl">
            Build Your Digital Presence with <span className="bg-gradient-to-r from-[#2997FF] via-[#A259FF] to-[#FF6F91] bg-clip-text text-transparent">ByteToBrain</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#2997FF] via-[#A259FF] to-[#FF6F91] rounded-full mb-5 ml-0" />
          <p className="text-base md:text-lg lg:text-xl text-[#C7C7CC] mb-0 max-w-lg drop-shadow-2xl">
            Websites, apps, and branding for startups & businesses who want to stand out.
          </p>
        </div>
      </div>
      {/* Our Services Section */}
      <section id="services" className="w-full bg-[#18181b] py-16 flex flex-col items-center overflow-y-visible">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Our Services</h2>
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 z-20 mt-12">
          {services.map((s, i) =>
            <motion.div
              key={s.title + '-border'}
              whileHover={{ y: -10, scale: 1.04 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 15,
                delay: i * 0.05,
                duration: 0.15
              }}
              viewport={{ once: true }}
              className="relative z-10 p-[2px] rounded-xl bg-gradient-to-r from-[#2997FF] via-[#A259FF] to-[#FF6F91] overflow-hidden"
            >
              <div
                className="flex flex-col justify-between items-center text-center h-full bg-[#18181b] rounded-xl hover:bg-[#1e293b] active:bg-[#18181b] transition-colors cursor-pointer py-3"
                style={{ boxShadow: 'none', border: 'none' }}
              >
                <div className="mt-0 mb-0 h-14 flex items-center justify-center">{s.icon}</div>
                <div className="flex-1 flex flex-col justify-between w-full">
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-[#A1A1A6] mb-2">{s.desc}</p>
                  <ul className="text-xs text-[#2997FF] space-y-1 mb-2">
                    {s.features.map(f => <li key={f}>• {f}</li>)}
                  </ul>
                </div>
                <a href={s.link} className="mt-2 px-6 py-2 bg-gradient-to-r from-[#2997FF] via-[#A259FF] to-[#FF6F91] text-white rounded-full font-semibold shadow hover:scale-105 transition text-sm mb-2">Learn more</a>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      {/* Best Modern Animated Feature Section (No Button/Link) */}
      <section className="w-full bg-[#18181b] py-16 flex flex-col items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none" style={{background: "url('/pattern.svg') repeat"}}></div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 relative z-10">What Makes Us Different?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl relative z-10">
          {[
            {
              icon: <img src="/flash.png" alt="Fast Delivery" className="w-14 h-14 mb-4 mt-2" />,
              title: "Superfast Project Delivery",
              desc: "Get your website or app live in record time—without compromising on quality.",
              color: "from-[#2997FF] via-[#A259FF] to-[#FF6F91]"
            },
            {
              icon: <img src="/paint-palette.png" alt="Modern Design" className="w-14 h-14 mb-4 mt-2" />,
              title: "Creative & Modern Design",
              desc: "Eye-catching, user-friendly interfaces that make your brand stand out.",
              color: "from-[#A259FF] via-[#2997FF] to-[#FF6F91]"
            },
            {
              icon: <img src="/lock.png" alt="Secure & Scalable" className="w-14 h-14 mb-4 mt-2" />,
              title: "Secure & Future-Ready",
              desc: "Built with best practices for security and easy growth as your business expands.",
              color: "from-[#FF6F91] via-[#2997FF] to-[#A259FF]"
            }
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.7, type: "spring" }}
              viewport={{ once: true }}
              className={`relative group bg-[#232326]/80 backdrop-blur-md rounded-xl p-8 shadow-xl flex flex-col items-center text-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-[#2997FF]`}
              style={{ boxShadow: "0 8px 32px 0 rgba(41,151,255,0.10)" }}
            >
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${card.color} rounded-full group-hover:w-24 transition-all duration-300`} />
              <span className="group-hover:animate-bounce transition-all duration-200">{card.icon}</span>
              <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
              <p className="text-[#A1A1A6]">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
} 
