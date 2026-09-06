import React, { useState, useEffect } from 'react';
import { LogoIcon } from '../components/Logo';
import { 
  Briefcase, 
  ArrowRight, 
  ArrowUpRight, 
  Star, 
  X, 
  ExternalLink, 
  TrendingUp, 
  Check, 
  Filter
} from 'lucide-react';

interface WorksPageProps {
  onNavigate: (page: string, prefillService?: string) => void;
}

interface ProjectDetail {
  id: number;
  title: string;
  category: string;
  tag: string;
  metric: string;
  metricLabel: string;
  description: string;
  image: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  client: string;
  timeline: string;
}

const projectsList: ProjectDetail[] = [
  {
    id: 1,
    title: "Cuddle Care",
    category: "Brand Identity",
    tag: "brand-identity",
    metric: "+240%",
    metricLabel: "Brand Recognition Uplift",
    description: "Holistic visual identity & brand system for modern parental wellness products.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1528&auto=format&fit=crop",
    challenge: "The baby care market is flooded with generic pastel designs that lack premium credibility and emotional resonance.",
    solution: "We engineered a warm, typographic logomark combined with an earthy, gender-neutral color system and tactile packaging guidelines.",
    deliverables: ["Visual Identity System", "Custom Typography", "Eco-friendly Packaging", "Brand Style Guide"],
    client: "Cuddle Care Inc. (London)",
    timeline: "3 Weeks"
  },
  {
    id: 2,
    title: "NeoWear",
    category: "Social Media & Growth",
    tag: "social-media",
    metric: "4.2x",
    metricLabel: "Return on Ad Spend (ROAS)",
    description: "Paid social advertising sprint & viral content framework for luxury smart accessories.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1598&auto=format&fit=crop",
    challenge: "High customer acquisition costs on Meta and saturated competition in consumer wearable technology.",
    solution: "Designed high-contrast 3D motion hooks and direct-response carousel formats emphasizing craftsmanship and health sensors.",
    deliverables: ["Meta & TikTok Ad Suite", "3D Motion Renders", "High-Converting Landers", "Copywriting Playbook"],
    client: "NeoWear Tech (San Francisco)",
    timeline: "Ongoing Retainer"
  },
  {
    id: 3,
    title: "Wive Digital Platform",
    category: "Web & UI/UX Design",
    tag: "web-design",
    metric: "+185%",
    metricLabel: "Free-to-Paid Conversion",
    description: "Intuitive SaaS interface and design system for next-gen collaboration tools.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1420&auto=format&fit=crop",
    challenge: "Complex product workflows were causing high churn during user onboarding and free trial conversions.",
    solution: "Redesigned the entire onboarding flow with streamlined micro-interactions, responsive typography, and a dark-mode first design system.",
    deliverables: ["Full SaaS UI/UX Suite", "Design Tokens & Components", "Interactive Prototypes", "Developer Specifications"],
    client: "Wive Workspace (Berlin)",
    timeline: "5 Weeks"
  },
  {
    id: 4,
    title: "FutureTech Systems",
    category: "Social Media & Growth",
    tag: "social-media",
    metric: "+320k",
    metricLabel: "Organic Impressions / Mo",
    description: "Full-funnel digital branding and organic social media content architecture.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1470&auto=format&fit=crop",
    challenge: "Deep-tech B2B software often appears dry and inaccessible to prospective enterprise buyers.",
    solution: "Introduced dynamic infographic reels and thought-leadership carousels translating complex AI capabilities into clear business value.",
    deliverables: ["Monthly Content Retainer", "Data Visualizations", "LinkedIn Growth Sprints", "Video Reel Editing"],
    client: "FutureTech AI (Toronto)",
    timeline: "6 Month Campaign"
  },
  {
    id: 5,
    title: "King Almond Confections",
    category: "Packaging & Assets",
    tag: "packaging",
    metric: "35%",
    metricLabel: "Retail Shelf Velocity Boost",
    description: "Artisanal confectionery packaging with gold-foil accents and bespoke illustrations.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1470&auto=format&fit=crop",
    challenge: "Securing placement in upscale specialty grocery stores required luxury aesthetic elevation.",
    solution: "Constructed rigid box structures with metallic foil stamping and custom botanical illustrations depicting orchard harvests.",
    deliverables: ["Die-Line Engineering", "Foil Stamping Specs", "Barcode & FDA Layouts", "Retail Display Units"],
    client: "King Almond Foods (Dubai)",
    timeline: "4 Weeks"
  },
  {
    id: 6,
    title: "Moringa Organic Elixirs",
    category: "Brand Identity",
    tag: "brand-identity",
    metric: "+210%",
    metricLabel: "DTC First-Month Sales",
    description: "Clean organic branding and high-energy DTC launch strategy for superfood beverages.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1374&auto=format&fit=crop",
    challenge: "Standing out in health food stores while conveying verified organic certifications without appearing clinical.",
    solution: "Designed vibrant minimalist typography, vivid fruit botanical palettes, and lifestyle marketing collateral.",
    deliverables: ["Can Packaging System", "E-Commerce Shopify Theme", "Social Launch Campaign", "Merch Designs"],
    client: "Moringa Life (Melbourne)",
    timeline: "3.5 Weeks"
  }
];

const categories = [
  { id: 'all', name: 'All Works' },
  { id: 'brand-identity', name: 'Brand Identity' },
  { id: 'social-media', name: 'Social & Growth' },
  { id: 'web-design', name: 'Web & UI/UX' },
  { id: 'packaging', name: 'Packaging' }
];

const clientReviews = [
  {
    quote: "Qarvion fundamentally reshaped our product positioning. Our CAC dropped by 45% immediately following the rebrand.",
    author: "Dean Campbell",
    role: "Founder, Omega Tech",
    stars: 5
  },
  {
    quote: "The quality of craftsmanship and adherence to deadlines was unlike any other creative agency we have contracted.",
    author: "Alex Vane",
    role: "CEO, Flux Media",
    stars: 5
  },
  {
    quote: "Their social media creative sprint delivered our highest-converting ad campaign of the entire year.",
    author: "Sarah Lindqvist",
    role: "Marketing Director, Nova Labs",
    stars: 5
  }
];

const WorksPage: React.FC<WorksPageProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectDetail | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? projectsList
    : projectsList.filter(p => p.tag === activeFilter);

  return (
    <div className="pt-28 pb-24 text-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 md:px-12 mb-8">
        <nav className="flex items-center gap-2 text-sm text-white/50 font-['Inter']">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-[#00D2FF] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-white font-medium">Our Works</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 mb-20">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/20 text-[#00D2FF] text-xs font-bold uppercase tracking-widest">
            <LogoIcon size={18} />
            <span>Selected Portfolio & Case Studies</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-['Montserrat'] tracking-tight leading-[1.1]">
            Work That Delivers <br />
            <span className="text-gradient-lime">Measurable Business Impact</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-['Inter'] leading-relaxed max-w-3xl">
            Explore how we partner with ambitious startups and modern brands to engineer award-winning visual systems, 
            high-converting digital products, and ROI-driven marketing campaigns.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 pt-12 mt-8 border-t border-white/10">
          <span className="text-xs font-bold uppercase tracking-wider text-white/40 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === cat.id
                  ? 'bg-[#A3FF12] text-[#050810] shadow-[0_0_20px_rgba(163,255,18,0.4)]'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedCaseStudy(project)}
              className="group rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden cursor-pointer hover:border-[#A3FF12]/50 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0B132B]/85 backdrop-blur-md text-[#A3FF12] border border-white/10">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-xs font-bold text-white">
                  <TrendingUp className="w-3.5 h-3.5 text-[#A3FF12]" />
                  <span>{project.metric}</span>
                </div>
              </div>

              <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold font-['Montserrat'] text-white group-hover:text-[#A3FF12] transition-colors flex items-center justify-between">
                    {project.title}
                    <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-[#A3FF12] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-sm text-white/60 font-['Inter'] mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40 font-['Inter']">
                  <span>{project.client}</span>
                  <span className="text-[#A3FF12] font-semibold group-hover:underline">Read Case Study →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Modal Preview */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <div className="bg-[#0B132B] border border-white/20 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A3FF12]">{selectedCaseStudy.category}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-['Montserrat'] text-white mt-1">
                {selectedCaseStudy.title}
              </h2>
              <p className="text-sm text-white/60 mt-1">{selectedCaseStudy.client} • Timeline: {selectedCaseStudy.timeline}</p>
            </div>

            {/* Modal Image */}
            <div className="rounded-2xl overflow-hidden aspect-video border border-white/10">
              <img
                src={selectedCaseStudy.image}
                alt={selectedCaseStudy.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Result Metric Banner */}
            <div className="p-6 rounded-2xl bg-[#A3FF12]/10 border border-[#A3FF12]/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#A3FF12] font-['Inter']">Key Result Achieved</div>
                <div className="text-sm text-white/80 font-['Inter']">{selectedCaseStudy.metricLabel}</div>
              </div>
              <div className="text-3xl md:text-4xl font-extrabold font-['Montserrat'] text-[#A3FF12]">
                {selectedCaseStudy.metric}
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-['Inter']">
              <div className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider">The Challenge</h4>
                <p className="text-white/70 leading-relaxed">{selectedCaseStudy.challenge}</p>
              </div>
              <div className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <h4 className="font-bold text-[#A3FF12] uppercase text-xs tracking-wider">Our Solution</h4>
                <p className="text-white/70 leading-relaxed">{selectedCaseStudy.solution}</p>
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">Delivered Scope</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedCaseStudy.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-white/70 bg-white/5 p-2.5 rounded-xl">
                    <Check className="w-3.5 h-3.5 text-[#A3FF12] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => {
                  setSelectedCaseStudy(null);
                  onNavigate('contact', selectedCaseStudy.category);
                }}
                className="px-6 py-3 rounded-full bg-[#A3FF12] text-[#050810] font-bold text-sm hover:shadow-[0_0_20px_rgba(163,255,18,0.5)] transition-all flex items-center gap-2"
              >
                Inquire About Similar Project
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="px-6 py-3 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Client Quotes */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[#00D2FF] text-xs font-extrabold tracking-[0.3em] uppercase">CLIENT ADVOCATES</span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-['Montserrat']">
            Validated by Growth Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clientReviews.map((review, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
              <div className="flex gap-1 text-[#00D2FF]">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-white/70 italic font-['Inter'] leading-relaxed">
                "{review.quote}"
              </p>
              <div className="pt-4 border-t border-white/5">
                <div className="font-bold text-white text-sm font-['Montserrat']">{review.author}</div>
                <div className="text-xs text-white/50 font-['Inter']">{review.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inter-Page Links Navigation Bar */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-[#1B2A49] via-[#0F3460] to-[#0B132B] border border-white/10 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold font-['Montserrat'] text-white">
              Inspired by what you see?
            </h2>
            <p className="text-white/70 text-sm md:text-base font-['Inter']">
              Let's create your next breakthrough case study together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div 
              onClick={() => onNavigate('contact')}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#A3FF12] hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase text-[#A3FF12] tracking-wider">Start Now</span>
                <ArrowRight className="w-4 h-4 text-[#A3FF12] group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-xl font-bold font-['Montserrat'] text-white mb-2">Get a Project Quote</h3>
              <p className="text-xs text-white/60 font-['Inter']">Share your vision and receive a custom roadmap and proposal.</p>
            </div>

            <div 
              onClick={() => onNavigate('services')}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#00D2FF] hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase text-[#00D2FF] tracking-wider">Capabilities</span>
                <ArrowRight className="w-4 h-4 text-[#00D2FF] group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-xl font-bold font-['Montserrat'] text-white mb-2">Explore All Services</h3>
              <p className="text-xs text-white/60 font-['Inter']">Review full deliverables, design packages, and pricing tiers.</p>
            </div>

            <div 
              onClick={() => onNavigate('about')}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase text-white/70 tracking-wider">Our Standards</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-xl font-bold font-['Montserrat'] text-white mb-2">Agency Philosophy</h3>
              <p className="text-xs text-white/60 font-['Inter']">Learn how our senior team delivers without traditional agency bloat.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorksPage;
