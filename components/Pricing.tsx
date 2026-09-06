
import React, { useState, useEffect } from 'react';

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  serviceKey: string;
}

const pricingData: Record<string, PricingPlan[]> = {
  logo: [
    {
      name: "Starter",
      price: "49",
      serviceKey: "Brand Identity Design",
      features: ["2 Logo Concepts", "High-Res JPG/PNG", "2 Revisions", "Basic 3D Mockup", "2-3 Days Delivery"]
    },
    {
      name: "Growth",
      price: "99",
      serviceKey: "Brand Identity Design",
      isPopular: true,
      features: ["4 Logo Concepts", "All Source Vector Files (AI/SVG/EPS)", "5 Revisions", "Social Media Starter Kit", "5 Realistic 3D Mockups", "Priority Support"]
    },
    {
      name: "Premium",
      price: "179",
      serviceKey: "Brand Identity Design",
      features: ["6 Premium Concepts", "Brand Mini Style Guide", "Unlimited Revisions", "Stationery & Business Card Design", "Full Copyright Ownership", "Priority 24h Turnaround"]
    }
  ],
  brand: [
    {
      name: "Starter",
      price: "149",
      serviceKey: "Brand Identity Design",
      features: ["Brand Logo Suite", "Color Palette & WCAG Tokens", "Typography Pairings", "Brand Stationery Design", "Core Social Media Templates", "4 Revisions"]
    },
    {
      name: "Growth",
      price: "249",
      serviceKey: "Brand Identity Design",
      isPopular: true,
      features: ["Full Visual Identity System", "Messaging, Tone & Positioning", "25-Page Usage Guidelines PDF", "Business Stationery Suite", "Social Media Asset Kit", "Priority Support"]
    },
    {
      name: "Premium",
      price: "449",
      serviceKey: "Web & UI/UX Design",
      features: ["360 Brand & Digital System", "Brand Strategy Framework", "Comprehensive 35+ Page Guide", "Landing Page UI Mockup (Figma)", "Iconography System", "Ongoing Art Director Consultation"]
    }
  ],
  social: [
    {
      name: "Starter",
      price: "89",
      serviceKey: "Social Media Marketing",
      features: ["12 Custom Posts / Month", "Engaging Captions & Copy", "Hashtag & Audience Research", "Monthly Analytics Summary", "Story & Feed Formats", "Standard Support"]
    },
    {
      name: "Growth",
      price: "159",
      serviceKey: "Social Media Marketing",
      isPopular: true,
      features: ["20 Custom Branded Creatives", "Carousel Decks & Short Reels", "Community Engagement Strategy", "Paid Ads Setup & Split Testing", "Bi-weekly Strategy Review", "Priority Ad Creative Batches"]
    },
    {
      name: "Premium",
      price: "279",
      serviceKey: "Paid Performance Ads",
      features: ["30 Custom Branded Assets / Month", "Advanced Paid Funnel Campaigns", "Direct-Response Video Hooks", "Weekly Campaign Optimization", "Dedicated Performance Manager", "Full Asset Production"]
    }
  ]
};

interface PricingProps {
  onNavigate?: (page: string, prefillService?: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('logo');
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
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

    document.querySelectorAll('.pricing-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (tab: string) => {
    setAnimate(false);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimate(true);
    }, 50);
  };

  return (
    <section id="pricing" className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-[#060B1A] via-[#0B1224] to-[#0E1A35] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-blue-500 text-xs font-extrabold tracking-[0.4em] uppercase pricing-reveal scroll-reveal">
            PRICING
          </span>
          <h2 className="text-4xl md:text-6xl font-['Montserrat'] font-extrabold text-white pricing-reveal scroll-reveal [transition-delay:0.1s]">
            Premium Quality <br />
            <span className="font-serif-italic text-blue-400">Affordable Pricing</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg font-['Inter'] pricing-reveal scroll-reveal [transition-delay:0.2s]">
            Elevate your brand with premium creative and marketing solutions at market-friendly rates.
          </p>
        </div>
        <div className="flex justify-center mb-20 pricing-reveal scroll-reveal [transition-delay:0.3s]">
          <div className="relative p-1.5 bg-[#0A1121] rounded-full border border-white/5 flex items-center shadow-2xl">
            {['logo', 'brand', 'social'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`relative px-6 md:px-10 py-3 rounded-full text-sm font-bold transition-all duration-300 z-10 capitalize ${
                  activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {tab === 'logo' ? 'Logo Design' : tab === 'brand' ? 'Brand Identity' : 'Social Media Marketing'}
                {activeTab === tab && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] -z-10 animate-pulse-slow"></div>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ${animate ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
          {pricingData[activeTab].map((plan, idx) => (
            <div 
              key={`${activeTab}-${plan.name}`}
              className={`group relative p-8 md:p-10 rounded-[32px] bg-white/[0.03] border border-white/5 backdrop-blur-xl transition-all duration-500 flex flex-col hover:border-blue-500/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(37,99,235,0.15)] hover:-translate-y-4 ${plan.isPopular ? 'lg:scale-105 border-blue-500/20 bg-white/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.4)]' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-700 to-blue-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg overflow-hidden">
                  Most Popular
                  <div className="absolute inset-0 bg-white/20 animate-shine"></div>
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold font-['Montserrat'] text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-extrabold text-white font-['Montserrat'] group-hover:scale-110 transition-transform duration-500">
                    ${plan.price}
                  </span>
                  {activeTab === 'social' && <span className="text-white/40 text-sm">/month</span>}
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/60 text-sm md:text-base group-hover:text-white/90 transition-colors">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                type="button"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('contact', plan.serviceKey);
                  } else {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="relative w-full py-4 rounded-full font-bold font-['Montserrat'] text-white overflow-hidden group/btn transition-all duration-300 text-center block cursor-pointer"
              >
                <span className="relative z-10">Select {plan.name} Package</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] group-hover/btn:brightness-125 transition-all"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 animate-shine transition-opacity"></div>
              </button>
              <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-[150%]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
