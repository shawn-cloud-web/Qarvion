
import React from 'react';

const marqueeItems = [
  "App Icon",
  "Letterhead",
  "Flyer",
  "Brochure",
  "Branding",
  "Logo",
  "Social Media",
  "Book Cover"
];

const Marquee: React.FC = () => {
  // Duplicate the items exactly once to ensure seamless looping with the -50% translateX animation defined in index.html
  const doubledItems = [...marqueeItems, ...marqueeItems];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden border-y border-white/5 bg-white/[0.01]">
      <div className="logo-marquee relative w-full overflow-hidden py-4">
        <div className="logo-track flex items-center gap-8 md:gap-12 px-4">
          {doubledItems.map((item, idx) => (
            <div 
              key={`${item}-${idx}`} 
              className="flex items-center gap-8 md:gap-12 group cursor-default"
            >
              {/* Item Capsule */}
              <div className="px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#00D2FF]/30 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.15)]">
                <span className="text-white/80 group-hover:text-white font-['Montserrat'] font-medium text-sm md:text-lg tracking-wide whitespace-nowrap transition-colors">
                  {item}
                </span>
              </div>
              
              {/* Separator Accent */}
              <span className="text-[#00D2FF] opacity-40 font-bold text-xl">•</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#00D2FF]/[0.02] to-transparent"></div>
    </section>
  );
};

export default Marquee;
