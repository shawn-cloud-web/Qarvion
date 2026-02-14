
import React, { useState, useEffect, useRef } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tag: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Cuddle Care",
    category: "Brand Identity",
    description: "Branding & Visual Identity",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1528&auto=format&fit=crop", // Abstract clean logo feel
    tag: "brand-identity"
  },
  {
    id: 2,
    title: "NeoWear",
    category: "Social Media Marketing",
    description: "Paid Ads & Growth Strategy",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1598&auto=format&fit=crop", // Modern watch mockup
    tag: "social-media"
  },
  {
    id: 3,
    title: "Wive Branding",
    category: "Brand Identity",
    description: "Visual Identity & Guidelines",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1420&auto=format&fit=crop", // Laptop branding
    tag: "brand-identity"
  },
  {
    id: 4,
    title: "FutureTech",
    category: "Social Media Marketing",
    description: "Performance Marketing & Creatives",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1470&auto=format&fit=crop", // Tech visuals
    tag: "social-media"
  },
  {
    id: 5,
    title: "King Almond",
    category: "Other Assets",
    description: "Product Packaging Design",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1470&auto=format&fit=crop", // Packaging feel
    tag: "other"
  },
  {
    id: 6,
    title: "Moringa Launch",
    category: "Social Media Marketing",
    description: "Launch Strategy & Creative Ads",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1374&auto=format&fit=crop", // Green/Natural product launch
    tag: "social-media"
  }
];

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'brand-identity', label: 'Brand Identity' },
  { id: 'social-media', label: 'Social Media Marketing' },
  { id: 'logo', label: 'Logo Design' },
  { id: 'other', label: 'Other Assets' }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <div 
      className="scroll-reveal group perspective-container"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="tilt-card relative aspect-square rounded-[32px] overflow-hidden bg-white/[0.03] border border-white/5 cursor-pointer"
      >
        {/* Project Image */}
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex flex-col justify-end p-8">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-[#A3FF12] text-xs font-bold uppercase tracking-widest mb-2 block">
              {project.category}
            </span>
            <h3 className="text-white text-2xl font-bold font-['Montserrat'] flex items-center justify-between">
              {project.title}
              <svg className="w-6 h-6 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" fill="none" stroke="#A3FF12" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </h3>
            <p className="text-white/60 text-sm mt-2">{project.description}</p>
          </div>
        </div>

        {/* Animated Border Glow (only on hover) */}
        <div className="absolute inset-0 border-[2px] border-[#A3FF12]/0 group-hover:border-[#A3FF12]/40 rounded-[32px] transition-all duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.tag === activeFilter));
    }
  }, [activeFilter]);

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

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredProjects]);

  return (
    <section id="works" className="relative py-32 px-6 md:px-12 bg-[#050810]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A3FF12]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#A3FF12] text-xs font-extrabold tracking-[0.3em] uppercase scroll-reveal">
            OUR WORK
          </span>
          <h2 className="text-5xl md:text-7xl font-['Montserrat'] font-extrabold text-white scroll-reveal [transition-delay:0.1s]">
            Projects
          </h2>
          <div className="w-24 h-1.5 bg-[#A3FF12] mx-auto rounded-full mt-4 scroll-reveal [transition-delay:0.2s]"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-20 scroll-reveal [transition-delay:0.3s]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-500 border border-white/10 ${
                activeFilter === cat.id 
                ? 'bg-[#A3FF12] text-black shadow-[0_0_20px_rgba(163,255,18,0.4)] animate-pulse-lime' 
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:border-[#A3FF12]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-white/40 italic">New projects coming soon...</p>
            </div>
          )}
        </div>

        {/* View Full Portfolio CTA */}
        <div className="mt-20 text-center scroll-reveal">
          <button className="group relative px-10 py-5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
            <span className="relative z-10 font-bold text-black font-['Montserrat']">View Full Portfolio</span>
            <div className="absolute inset-0 bg-[#A3FF12] shadow-[0_0_30px_rgba(163,255,18,0.5)]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
