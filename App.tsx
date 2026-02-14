
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Workflow from './components/Workflow';
import Projects from './components/Projects';
import WhyChooseUs from './components/WhyChooseUs';
import Pricing from './components/Pricing';
import ReviewsAndContact from './components/ReviewsAndContact';
import Team from './components/Team';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-['Inter'] relative">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Projects />
        <Pricing />
        <Workflow />
        <Team />
        <ReviewsAndContact />
        <Marquee />
      </main>
      <Footer />
      
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
