
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WorksPage from './pages/WorksPage';
import ContactPage from './pages/ContactPage';

const validPages = ['home', 'about', 'services', 'works', 'contact'];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (validPages.includes(hash)) {
      return hash;
    }
    // Check if hash matches why-choose-us or team -> map to about
    if (hash === 'why-choose-us' || hash === 'team') return 'about';
    return 'home';
  });

  const [contactPrefill, setContactPrefill] = useState<string | undefined>(undefined);

  // Synchronize with browser hash changes for back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (hash === 'why-choose-us' || hash === 'team') {
        setCurrentPage('about');
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, prefillService?: string) => {
    const targetPage = validPages.includes(page) ? page : 'home';
    setCurrentPage(targetPage);
    if (prefillService) {
      setContactPrefill(prefillService);
    }
    window.location.hash = targetPage === 'home' ? '' : targetPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-['Inter'] relative text-white selection:bg-[#00D2FF] selection:text-[#0B132B]">
      <Header currentPage={currentPage} onNavigate={navigateTo} />
      
      <main className="min-h-[80vh]">
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
        {currentPage === 'services' && <ServicesPage onNavigate={navigateTo} />}
        {currentPage === 'works' && <WorksPage onNavigate={navigateTo} />}
        {currentPage === 'contact' && (
          <ContactPage initialService={contactPrefill} onNavigate={navigateTo} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
      <BackToTop />
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        {/* Main Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B132B] via-[#1C2541] to-[#3A506B]"></div>
        
        {/* Radial Glow at bottom center - with pulse animation */}
        <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[140%] h-[600px] bg-[#00D2FF]/15 blur-[160px] rounded-full animate-glow-pulse"></div>
        
        {/* Animated Floating Shapes */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] border border-white/5 rounded-full animate-float opacity-30 blur-[2px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] border border-[#00D2FF]/10 rounded-full animate-float opacity-20 blur-[1px] [animation-delay:-5s]"></div>
        
        {/* Mesh Overlay */}
        <div className="absolute inset-0 bg-mesh opacity-40"></div>
        
        {/* Subtle Noise Texture Simulation via CSS */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
      </div>
    </div>
  );
};

export default App;
