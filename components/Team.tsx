import React, { useEffect, useRef } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  isFounder?: boolean;
  isPlaceholder?: boolean;
  socials?: {
    fb?: string;
    ig?: string;
    x?: string;
    email?: string;
  };
}

const team: TeamMember[] = [
  {
    id: 1,
    name: "Murshiduzzaman",
    role: "Founder & Creative Director",
    bio: "Brand strategist and digital growth specialist focused on building impactful brand identities and performance-driven marketing systems.",
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1471&auto=format&fit=crop",
    isFounder: true,
    socials: {
      fb: "https://www.facebook.com/Qarvion",
      ig: "https://www.instagram.com/qarvion/",
      x: "https://x.com/Qarvion",
      email: "mailto:qarviontech@gmail.com"
    }
  },
  {
    id: 2,
    name: "Creative Lead",
    role: "Visual Identity",
    bio: "Expert in translating complex brand values into minimal, high-impact visual systems for global startups.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop",
    isPlaceholder: true
  },
  {
    id: 3,
    name: "Growth Strategist",
    role: "Performance Marketing",
    bio: "Data-driven strategist specializing in scaling premium brands through targeted digital outreach.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop",
    isPlaceholder: true
  }
];

const TeamCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <div 
      className={`team-reveal scroll-reveal group perspective-container ${member.isFounder ? 'lg:col-span-1' : ''}`}
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`tilt-card relative p-8 md:p-10 rounded-[32px] bg-white/[0.03] border border-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.07] ${
          member.isFounder 
            ? 'border-blue-500/30 shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_20px_rgba(37,99,235,0.15)]' 
            : 'hover:border-blue-500/20'
        }`}
      >
        <div className="relative mb-8 flex justify-center">
          <div className={`relative ${member.isFounder ? 'w-48 h-48 md:w-56 md:h-56' : 'w-32 h-32 md:w-40 md:h-40'} rounded-full p-1 bg-gradient-to-tr from-blue-600 to-blue-400 group-hover:scale-105 transition-transform duration-700 shadow-2xl`}>
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0B1224] bg-[#1C2541]">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
              />
              {member.isPlaceholder && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Team</span>
                </div>
              )}
            </div>
            {member.isFounder && (
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl -z-10 animate-pulse-slow"></div>
            )}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-['Montserrat'] font-extrabold text-white mb-2 group-hover:text-blue-400 transition-colors duration-400">
            {member.name}
          </h3>
          <p className="text-blue-500 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-6">
            {member.role}
          </p>
          <p className="text-white/50 font-['Inter'] text-sm leading-relaxed mb-8 max-w-xs mx-auto group-hover:text-white/80 transition-colors">
            {member.bio}
          </p>

          <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            {member.socials?.fb && (
              <a href={member.socials.fb} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-blue-400 hover:bg-white/10 transition-all border border-white/5 hover:border-blue-500/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            )}
            {member.socials?.x && (
              <a href={member.socials.x} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-blue-400 hover:bg-white/10 transition-all border border-white/5 hover:border-blue-500/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
              </a>
            )}
            {member.socials?.ig && (
              <a href={member.socials.ig} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-blue-400 hover:bg-white/10 transition-all border border-white/5 hover:border-blue-500/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            )}
            {member.socials?.email && (
              <a href={member.socials.email} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-blue-400 hover:bg-white/10 transition-all border border-white/5 hover:border-blue-500/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
            )}
          </div>
        </div>

        <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
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

    document.querySelectorAll('.team-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" className="relative py-32 px-6 md:px-12 bg-[#060B1A] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-24 space-y-4 team-reveal scroll-reveal">
          <span className="text-blue-500 text-xs font-extrabold tracking-[0.4em] uppercase">OUR TEAM</span>
          <h2 className="text-5xl md:text-7xl font-['Montserrat'] font-extrabold text-white">
            Meet Our <span className="font-serif-italic text-blue-400">Creative</span> Team
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg font-['Inter']">
            The strategic minds behind Qarvion’s branding and marketing success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {team.map((member, idx) => (
            <TeamCard key={member.id} member={member} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;