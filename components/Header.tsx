
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage = 'home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home', href: '#home' },
    { name: 'About', id: 'about', href: '#about' },
    { name: 'Services', id: 'services', href: '#services' },
    { name: 'Work', id: 'works', href: '#works' },
    { name: 'Contact', id: 'contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent, pageId: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(pageId);
    }
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-[#0B132B]/90 backdrop-blur-xl py-4 shadow-xl border-b border-white/5' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, 'home')}
          className="z-50 flex items-center justify-center -ml-1 p-1 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none cursor-pointer"
          aria-label="Qarvion Home"
        >
          <Logo 
            size={isScrolled ? 46 : 56} 
            showText={false}
            iconOnly={true}
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center space-x-10">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={(e) => handleNavClick(e, item.id)}
                className={`text-sm font-medium transition-all relative py-1 group ${
                  isActive ? 'text-[#00D2FF] font-semibold' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.name}
                <span 
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#00D2FF] transition-all duration-300 ${
                    isActive ? 'w-full shadow-[0_0_10px_#00D2FF]' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            type="button"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden md:block px-7 py-3 rounded-full bg-gradient-to-r from-[#1B2A49] to-[#0F3460] text-white text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] border border-white/10 active:scale-95 text-center cursor-pointer"
          >
            Start Project
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0B132B] transition-all duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-7 p-12">
          {/* Logo brand mark in mobile overlay */}
          <div className="mb-4">
            <Logo size={76} showText={false} iconOnly={true} />
          </div>
          {navItems.map((item, idx) => {
            const isActive = currentPage === item.id;
            return (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={(e) => handleNavClick(e, item.id)}
                className={`text-3xl font-['Montserrat'] font-bold transition-all duration-500 delay-[${idx * 80}ms] flex items-center gap-3 ${
                  isActive ? 'text-[#00D2FF]' : 'text-white/80 hover:text-white'
                } ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                {item.name}
                {isActive && <span className="w-2 h-2 rounded-full bg-[#00D2FF] shadow-[0_0_10px_#00D2FF]"></span>}
              </a>
            );
          })}
          <button 
            type="button"
            onClick={(e) => handleNavClick(e, 'contact')}
            className={`mt-6 px-10 py-4 rounded-full bg-[#00D2FF] text-[#0B132B] font-bold text-base transition-all duration-500 delay-[400ms] cursor-pointer shadow-[0_0_25px_rgba(0,210,255,0.4)] ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Start Project
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
