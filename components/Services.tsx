
import React, { useState, useEffect, useRef } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Brand Identity Design",
    description: "Make your product pop on the shelf. We design packaging & printing products that create an unboxing experience.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Logo Design",
    description: "Crafting iconic symbols that resonate with your audience and define your brand's presence in a crowded market.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1471&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Social Media Marketing",
    description: "High-conversion posters for Instagram, Facebook, and LinkedIn to keep your audience engaged daily with fresh content.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1374&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Print & Identity Assets",
    description: "Everything from premium business cards to comprehensive brand books. We ensure your brand is consistent across all physical touchpoints.",
    image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=1560&auto=format&fit=crop"
  }
];

const Services: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    panelRefs.current.forEach((panel) => {
      if (panel) observer.observe(panel);
    });

    return () => observer.disconnect();
  }, []);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section 
      id="services"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-['Montserrat'] font-extrabold text-white">
          Our <span className="text-gradient-brand">Services</span>
        </h2>
        <p className="text-white/60 max-w-xl text-lg font-['Inter']">
          Comprehensive digital solutions tailored for high-growth brands and innovative startups.
        </p>
      </div>

      <div className="space-y-4">
        {services.map((service, index) => (
          /* Fix: Ensure ref callback returns void by wrapping assignment in braces */
          <div
            key={service.id}
            ref={(el) => { panelRefs.current[index] = el; }}
            data-index={index}
            onMouseEnter={() => handleInteraction(index)}
            onClick={() => handleInteraction(index)}
            className={`service-panel cursor-pointer rounded-2xl md:rounded-3xl border border-white/5 relative group flex items-center ${
              activeIndex === index ? 'active-panel' : ''
            }`}
          >
            {/* Collapsed View Label */}
            <div className={`absolute left-8 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${activeIndex === index ? 'opacity-0' : 'opacity-100'}`}>
              <h3 className="text-xl md:text-2xl font-bold font-['Montserrat'] text-white/50 group-hover:text-white/80 transition-colors">
                {service.title}
              </h3>
            </div>

            {/* Expanded Content */}
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-12 gap-8 overflow-hidden">
              {/* Left Side: Text */}
              <div className="panel-content flex-1 max-w-lg py-12">
                <span className="text-xs font-bold text-[#00D2FF] tracking-widest uppercase mb-4 block">
                  Service 0{service.id}
                </span>
                <h3 className="text-3xl md:text-4xl font-extrabold font-['Montserrat'] text-white mb-6">
                  {service.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-lg mb-8 font-['Inter']">
                  {service.description}
                </p>
                
                {/* Floating Circle Accent - Only visible in active panel */}
                <div className="hidden md:block absolute -left-4 bottom-12 w-16 h-16 border border-[#00D2FF]/20 rounded-full animate-circle-float opacity-50"></div>
              </div>

              {/* Right Side: Image with Reveal Mask */}
              <div className="panel-image-mask flex-1 h-[200px] md:h-full w-full relative">
                <div className="absolute inset-0 p-4 md:p-8">
                  <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden relative shadow-2xl">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/60 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
