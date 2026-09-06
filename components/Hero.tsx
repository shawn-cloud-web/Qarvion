import React, { useEffect, useRef } from 'react';
import { LogoIcon } from './Logo';

const logos = [
  'TechCorp', 'Stellar', 'NexGen', 'Lumina', 'Zenith', 'Omni'
];

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 overflow-hidden"
    >
      {/* Floating Orb - Top Right */}
      <div className="absolute top-24 right-10 md:right-20 lg:right-32 w-20 h-20 md:w-[120px] md:h-[120px] border border-[#00D2FF]/30 rounded-full animate-orb pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        
        {/* Glassmorphism Badge */}
        <div className="scroll-reveal flex justify-center [transition-delay:0.1s]">
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs md:text-sm font-medium bg-white/5 border border-white/10 backdrop-blur-md text-[#00D2FF] tracking-wide uppercase">
            <LogoIcon size={18} className="drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <span>170+ Projects Completed</span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="scroll-reveal text-5xl md:text-7xl lg:text-8xl font-['Montserrat'] font-extrabold leading-[1.1] [transition-delay:0.2s]">
          Grow your own <br className="hidden md:block" />
          <span className="text-gradient-brand">brand</span> with us.
        </h1>

        {/* Subheadline */}
        <p className="scroll-reveal text-lg md:text-xl text-white/70 font-['Inter'] max-w-2xl mx-auto [transition-delay:0.3s]">
          Boost productivity with seamless design and brand management. We transform complex visions into digital reality.
        </p>

        {/* Trust Rating */}
        <div className="scroll-reveal flex flex-col md:flex-row items-center justify-center gap-2 [transition-delay:0.4s]">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-[#00D2FF] fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <p className="text-sm font-medium text-white/80">
            <span className="font-bold">4.9 Rating</span> based on 50+ clients
          </p>
        </div>

        {/* CTA Button */}
        <div className="scroll-reveal [transition-delay:0.5s]">
          <a href="#contact" className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#16213E] to-[#1F4068] text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,210,255,0.4)] border border-white/10">
            <span className="relative z-10 flex items-center gap-2">
              Start your project
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
        </div>

        {/* Logo Marquee Section */}
        <div className="scroll-reveal pt-12 space-y-6 [transition-delay:0.6s]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Trusted by industry leaders</p>
          <div className="logo-marquee relative w-full overflow-hidden py-4">
            <div className="logo-track">
              {/* First Set */}
              {logos.map((logo, idx) => (
                <div key={`logo-1-${idx}`} className="mx-8 md:mx-12 opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2 grayscale hover:grayscale-0">
                  <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold text-xs text-[#00D2FF]">{logo[0]}</div>
                  <span className="text-xl font-bold font-['Montserrat'] tracking-tight">{logo}</span>
                </div>
              ))}
              {/* Duplicated Set for Infinite Loop */}
              {logos.map((logo, idx) => (
                <div key={`logo-2-${idx}`} className="mx-8 md:mx-12 opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2 grayscale hover:grayscale-0">
                  <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold text-xs text-[#00D2FF]">{logo[0]}</div>
                  <span className="text-xl font-bold font-['Montserrat'] tracking-tight">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Hero Visual Accent */}
      <div className="scroll-reveal absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF]/20 to-transparent [transition-delay:0.8s]"></div>
    </section>
  );
};

export default Hero;