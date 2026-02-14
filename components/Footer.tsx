
import React, { useEffect, useState } from 'react';

interface OverlayContent {
  title: string;
  body: React.ReactNode;
}

const Footer: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [overlay, setOverlay] = useState<OverlayContent | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        const rect = footerElement.getBoundingClientRect();
        const footerHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / footerHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { name: 'Facebook', icon: 'fb', url: 'https://www.facebook.com/Qarvion' },
    { name: 'Instagram', icon: 'ig', url: 'https://www.instagram.com/qarvion/' },
    { name: 'X', icon: '𝕏', url: 'https://x.com/Qarvion' },
    { name: 'Behance', icon: 'bē', url: 'https://behance.net' },
    { name: 'YouTube', icon: 'yt', url: 'https://youtube.com' }
  ];

  const services = [
    { name: "Brand Identity Design", id: "services" },
    { name: "Motion Graphics", id: "services" },
    { name: "Web Design & Development", id: "services" },
    { name: "UI/UX Design", id: "services" },
    { name: "Social Media Marketing", id: "services" },
    { name: "Social Media Management", id: "services" },
    { name: "Paid Ads Strategy", id: "services" },
    { name: "Content Strategy", id: "services" }
  ];

  const quickLinks = [
    { name: "Home", id: "home", type: 'scroll' },
    { name: "Services", id: "services", type: 'scroll' },
    { name: "Our Work", id: "works", type: 'scroll' },
    { name: "Careers", id: "careers", type: 'page' },
    { name: "FAQ", id: "faq", type: 'page' }
  ];

  const openPage = (id: string) => {
    const pages: Record<string, OverlayContent> = {
      careers: {
        title: "Join the Qarvion Team",
        body: (
          <div className="space-y-6 text-white/70">
            <p>We're always looking for talented designers, strategists, and performance marketers to join our mission of scaling brands globally.</p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-white font-bold">Creative Lead</h4>
                <p className="text-sm">Remote • Full-time</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-white font-bold">Social Media Strategist</h4>
                <p className="text-sm">Dubai, UAE • Hybrid</p>
              </div>
            </div>
            <p className="text-sm">Send your portfolio to <span className="text-blue-400">qarviontech@gmail.com</span></p>
          </div>
        )
      },
      faq: {
        title: "Frequently Asked Questions",
        body: (
          <div className="space-y-6 text-white/70">
            <div>
              <h4 className="text-white font-bold">How long does a branding project take?</h4>
              <p className="text-sm">Typically 2-4 weeks depending on the scope and refinement rounds.</p>
            </div>
            <div>
              <h4 className="text-white font-bold">Do you provide ongoing social media management?</h4>
              <p className="text-sm">Yes, we have monthly packages for content creation and performance ad management.</p>
            </div>
            <div>
              <h4 className="text-white font-bold">What industries do you work with?</h4>
              <p className="text-sm">We specialize in Tech, Fashion, Wellness, and High-growth Startups.</p>
            </div>
          </div>
        )
      },
      terms: {
        title: "Terms & Conditions",
        body: (
          <div className="space-y-4 text-white/60 text-sm">
            <p>1. Acceptance of Terms: By accessing Qarvion's services, you agree to comply with our policies.</p>
            <p>2. Intellectual Property: Clients receive full ownership of final assets upon full payment.</p>
            <p>3. Payments: Project retainers are non-refundable once creative work has begun.</p>
          </div>
        )
      },
      privacy: {
        title: "Privacy Policy",
        body: (
          <div className="space-y-4 text-white/60 text-sm">
            <p>We value your privacy. Your contact details are strictly used for project communication and are never shared with third parties.</p>
            <p>Cookies are used solely to improve user experience on this landing page.</p>
          </div>
        )
      }
    };

    if (pages[id]) {
      setOverlay(pages[id]);
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#050810] to-black pt-32 pb-0 px-6 md:px-12 overflow-hidden border-t border-white/5">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-gradient-to-t from-blue-500/20 to-transparent blur-[120px] rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full animate-float-slow"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-24">
          
          {/* Column 1: Brand */}
          <div className="space-y-8 footer-reveal visible">
            <h2 className="text-3xl font-['Montserrat'] font-extrabold tracking-tighter text-white">
              QARVION
            </h2>
            <p className="text-white/40 leading-relaxed font-['Inter'] text-sm max-w-xs">
              We build powerful digital brands through strategy, design, motion, and high-performing social media marketing that drives real growth.
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:text-[#00D2FF] hover:border-[#00D2FF]/50 hover:bg-[#00D2FF]/5 hover:scale-110 transition-all duration-400 group relative overflow-hidden"
                  aria-label={social.name}
                >
                  <span className="relative z-10 text-[10px] font-bold uppercase tracking-tighter">{social.icon}</span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="footer-reveal visible [transition-delay:0.1s]">
            <h4 className="text-white font-bold font-['Montserrat'] mb-10 uppercase tracking-[0.3em] text-[10px]">SERVICES</h4>
            <ul className="space-y-5">
              {services.map((item) => (
                <li key={item.name}>
                  <a href={`#${item.id}`} className="text-white/40 hover:text-[#00D2FF] transition-all text-sm font-['Inter'] relative group inline-block">
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00D2FF] transition-all duration-500 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="footer-reveal visible [transition-delay:0.2s]">
            <h4 className="text-white font-bold font-['Montserrat'] mb-10 uppercase tracking-[0.3em] text-[10px]">QUICK LINKS</h4>
            <ul className="space-y-5">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  {item.type === 'scroll' ? (
                    <a href={`#${item.id}`} className="text-white/40 hover:text-[#00D2FF] transition-all text-sm font-['Inter'] relative group inline-block">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00D2FF] transition-all duration-500 group-hover:w-full"></span>
                    </a>
                  ) : (
                    <button 
                      onClick={() => openPage(item.id)}
                      className="text-white/40 hover:text-[#00D2FF] transition-all text-sm font-['Inter'] relative group inline-block text-left"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00D2FF] transition-all duration-500 group-hover:w-full"></span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-reveal visible [transition-delay:0.3s]">
            <h4 className="text-white font-bold font-['Montserrat'] mb-10 uppercase tracking-[0.3em] text-[10px]">CONTACT</h4>
            <div className="space-y-8">
              <div>
                <a href="mailto:qarviontech@gmail.com" className="text-white/70 hover:text-[#00D2FF] text-lg font-['Montserrat'] font-bold transition-all group block">
                  qarviontech@gmail.com
                  <span className="block h-[1px] w-12 bg-[#00D2FF] mt-2 group-hover:w-24 transition-all"></span>
                </a>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">WhatsApp</span>
                <a 
                  href="https://wa.me/8801781485506" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/50 font-['Inter'] block hover:text-green-400 transition-colors"
                >
                  +880 1781-485506
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Footer Bar */}
        <div className="relative pt-12 pb-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <button 
            onClick={() => openPage('terms')}
            className="text-white/20 hover:text-white text-[10px] transition-colors uppercase tracking-widest font-bold"
          >
            Terms & Conditions
          </button>
          <p className="text-white/30 text-[10px] font-['Montserrat'] font-medium uppercase tracking-[0.2em]">
            © 2026 QARVION. All rights reserved.
          </p>
          <button 
            onClick={() => openPage('privacy')}
            className="text-white/20 hover:text-white text-[10px] transition-colors uppercase tracking-widest font-bold"
          >
            Privacy Policy
          </button>
        </div>
      </div>

      {/* Page Overlay / Modal Simulation for "Separate Pages" */}
      {overlay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-xl" 
            onClick={() => { setOverlay(null); document.body.style.overflow = 'auto'; }}
          ></div>
          <div className="relative w-full max-w-2xl bg-[#0B1224] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl animate-float-slow">
            <button 
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              onClick={() => { setOverlay(null); document.body.style.overflow = 'auto'; }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-3xl font-['Montserrat'] font-bold text-white mb-6">{overlay.title}</h3>
            <div className="max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
              {overlay.body}
            </div>
            <button 
              className="mt-8 px-8 py-3 rounded-full bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-colors"
              onClick={() => { setOverlay(null); document.body.style.overflow = 'auto'; }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* MASSIVE BACKGROUND LOGO SECTION */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none pb-20">
        <div className="absolute inset-0 z-20 flex flex-col justify-around py-10 opacity-30">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent backdrop-blur-sm"></div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent backdrop-blur-sm"></div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent backdrop-blur-sm"></div>
        </div>

        <div 
          className="text-[20vw] md:text-[25vw] font-['Montserrat'] font-extrabold text-white/[0.05] leading-none text-center tracking-tighter whitespace-nowrap transition-transform duration-[1.5s] ease-out flex justify-center items-center"
          style={{ 
            transform: `translateX(${(scrollProgress - 0.5) * -150}px)`,
            filter: `blur(${Math.max(0, 5 - scrollProgress * 10)}px)`
          }}
        >
          QARVION
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-30"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-[#00D2FF]/5 to-transparent animate-shine-slow"></div>
      </div>
    </footer>
  );
};

export default Footer;
