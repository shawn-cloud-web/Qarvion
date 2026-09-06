import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Projects from '../components/Projects';
import Pricing from '../components/Pricing';
import Workflow from '../components/Workflow';
import Team from '../components/Team';
import ReviewsAndContact from '../components/ReviewsAndContact';
import Marquee from '../components/Marquee';
import { ArrowRight, Sparkles, Layers, Briefcase, MessageSquare } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, prefillService?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  useEffect(() => {
    // Re-initialize intersection observers for animations on mount
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.scroll-reveal, .workflow-reveal, .rev-reveal, .footer-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Hero />
      <Marquee />

      {/* Services Section with Quick Hub Link */}
      <div className="relative">
        <Services />
        <div className="container mx-auto px-6 md:px-12 max-w-7xl -mt-12 mb-20 flex justify-center">
          <button
            onClick={() => onNavigate('services')}
            className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-[#00D2FF] text-white hover:text-[#0B132B] border border-white/10 font-bold text-sm transition-all duration-300 flex items-center gap-2.5 shadow-lg group hover:scale-105 hover:shadow-[0_0_25px_rgba(0,210,255,0.4)]"
          >
            <span>Explore All 6 Services & Deliverables</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* About & Why Choose Us Section with Quick Hub Link */}
      <div id="about" className="relative">
        <WhyChooseUs />
        <div className="container mx-auto px-6 md:px-12 max-w-7xl -mt-16 mb-20 flex justify-center">
          <button
            onClick={() => onNavigate('about')}
            className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-[#A3FF12] text-white hover:text-[#050810] border border-white/10 font-bold text-sm transition-all duration-300 flex items-center gap-2.5 shadow-lg group hover:scale-105 hover:shadow-[0_0_25px_rgba(163,255,18,0.4)]"
          >
            <span>Read Agency Story & Core Standards</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Projects Section with Quick Hub Link */}
      <div className="relative">
        <Projects />
        <div className="container mx-auto px-6 md:px-12 max-w-7xl -mt-16 mb-20 flex justify-center">
          <button
            onClick={() => onNavigate('works')}
            className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-[#A3FF12] text-white hover:text-[#050810] border border-white/10 font-bold text-sm transition-all duration-300 flex items-center gap-2.5 shadow-lg group hover:scale-105 hover:shadow-[0_0_25px_rgba(163,255,18,0.4)]"
          >
            <span>View Full Portfolio & Case Studies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <Pricing onNavigate={onNavigate} />
      <Workflow />
      <Team />
      <ReviewsAndContact />

      {/* Cross-Page Destination Hub */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 bg-[#080E21]/60">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00D2FF]">EXPLORE QARVION</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-['Montserrat'] text-white">
              Navigate All Agency Pages
            </h2>
            <p className="text-white/60 font-['Inter'] text-sm md:text-base max-w-2xl mx-auto">
              Jump directly to any section of our agency website for in-depth insights, case studies, and inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => onNavigate('about')}
              className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#00D2FF] hover:bg-white/[0.06] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D2FF]/10 text-[#00D2FF] flex items-center justify-center group-hover:bg-[#00D2FF] group-hover:text-[#0B132B] transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-['Montserrat'] text-white">About Page</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                  Our manifesto, comparison matrix against other agencies, and leadership profiles.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1 text-xs font-bold text-[#00D2FF]">
                <span>Open About Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('services')}
              className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#3A7BD5] hover:bg-white/[0.06] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#3A7BD5]/10 text-[#3A7BD5] flex items-center justify-center group-hover:bg-[#3A7BD5] group-hover:text-white transition-colors">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-['Montserrat'] text-white">Services Page</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                  Deep dive on all 6 capabilities, deliverables breakdown, and package calculator.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1 text-xs font-bold text-[#3A7BD5]">
                <span>Open Services Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('works')}
              className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#A3FF12] hover:bg-white/[0.06] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#A3FF12]/10 text-[#A3FF12] flex items-center justify-center group-hover:bg-[#A3FF12] group-hover:text-[#050810] transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-['Montserrat'] text-white">Works Page</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                  Interactive case studies, verified ROI metrics, client reviews, and category filters.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1 text-xs font-bold text-[#A3FF12]">
                <span>Open Works Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('contact')}
              className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white hover:bg-white/[0.06] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#0B132B] transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-['Montserrat'] text-white">Contact Page</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                  Interactive project brief builder, budget selectors, and direct studio contacts.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1 text-xs font-bold text-white">
                <span>Open Contact Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
