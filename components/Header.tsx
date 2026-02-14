
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#why-choose-us' },
    { name: 'Services', href: '#services' },
    { name: 'Works', href: '#works' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-[#0B132B]/90 backdrop-blur-xl py-4 shadow-xl border-b border-white/5' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-2xl md:text-3xl font-['Montserrat'] font-extrabold tracking-tighter text-white hover:text-[#00D2FF] transition-colors">
          Qarvion
        </a>

        {/* Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center space-x-10">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-white/70 hover:text-white text-sm font-medium transition-all relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00D2FF] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <a 
          href="#contact" 
          className="px-7 py-3 rounded-full bg-gradient-to-r from-[#1B2A49] to-[#0F3460] text-white text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,210,255,0.3)] border border-white/10 active:scale-95 text-center"
        >
          Start Project
        </a>
      </div>
    </header>
  );
};

export default Header;
