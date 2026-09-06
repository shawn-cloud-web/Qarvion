import React, { useEffect, useState } from 'react';
import Logo, { LogoIcon } from '../components/Logo';
import { 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Target, 
  Award, 
  Users, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle,
  Briefcase,
  Compass,
  MessageSquare,
  Globe
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const teamMembers = [
  {
    name: "Murshiduzzaman",
    role: "Founder & Creative Director",
    bio: "Brand strategist and digital growth specialist focused on building impactful brand identities and performance-driven marketing systems.",
    image: "/Murshiduzzaman.png",
    experience: "8+ Years in Brand Strategy",
    isFounder: true,
    socials: {
      fb: "https://www.facebook.com/Qarvion",
      x: "https://x.com/Qarvion",
      pinterest: "https://www.pinterest.com/murshiduzzamanDm/",
      behance: "https://www.behance.net/murshiduzzaman"
    }
  },
  {
    name: "Elena Rostova",
    role: "Lead UI/UX & Digital Architect",
    bio: "Obsessed with micro-interactions, responsive typography, and design systems that bridge luxury aesthetics with frictionless conversion.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop",
    experience: "6+ Years in Product Design"
  },
  {
    name: "Marcus Vance",
    role: "Head of Performance Growth",
    bio: "Data-led performance marketer specializing in paid social acquisition, funnel optimization, and hyper-targeted conversion campaigns.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop",
    experience: "7+ Years in Growth Marketing"
  }
];

const AboutTeamCard: React.FC<{ member: (typeof teamMembers)[0] }> = ({ member }) => {
  const [currentSrc, setCurrentSrc] = useState<string>(member.image);
  const [loadFailed, setLoadFailed] = useState(false);

  const founderCandidates = [
    "/Murshiduzzaman.png",
    "/murshiduzzaman.png",
    "/images/Murshiduzzaman.png",
    "/images/murshiduzzaman.png",
    "/Murshiduzzaman.jpeg",
    "/Murshiduzzaman.jpg",
    "/murshiduzzaman.jpg"
  ];

  const handleImageError = () => {
    if (member.isFounder) {
      const currentIndex = founderCandidates.indexOf(currentSrc);
      if (currentIndex !== -1 && currentIndex < founderCandidates.length - 1) {
        setCurrentSrc(founderCandidates[currentIndex + 1]);
        return;
      }
    }
    setLoadFailed(true);
  };

  return (
    <div className="rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-[#00D2FF]/40 transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between">
      <div>
        <div className="relative aspect-[4/3] overflow-hidden bg-white/5 flex items-center justify-center">
          {!loadFailed ? (
            <img 
              src={currentSrc} 
              alt={member.name}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105" 
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1224] to-[#1C2541] text-white p-4 text-center">
              <span className="text-4xl font-extrabold text-[#00D2FF] font-['Montserrat']">MZ</span>
              <span className="text-xs text-white/50 tracking-wider uppercase mt-2">Murshiduzzaman</span>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0B132B]/80 backdrop-blur-md text-[#00D2FF] border border-white/10">
              {member.experience}
            </span>
          </div>
        </div>
        <div className="p-8 pb-4 space-y-3">
          <h3 className="text-2xl font-bold font-['Montserrat'] text-white">{member.name}</h3>
          <div className="text-sm font-semibold text-[#00D2FF] font-['Inter']">{member.role}</div>
          <p className="text-sm text-white/60 font-['Inter'] leading-relaxed pt-2">
            {member.bio}
          </p>
        </div>
      </div>

      {'socials' in member && member.socials && (
        <div className="px-8 pb-8 pt-2 flex items-center gap-3">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider mr-1">Connect:</span>
          {member.socials.fb && (
            <a 
              href={member.socials.fb} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook Profile"
              title="Facebook"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00D2FF]/10 text-white/50 hover:text-[#00D2FF] border border-white/10 hover:border-[#00D2FF]/40 flex items-center justify-center transition-all hover:scale-110"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          )}
          {member.socials.x && (
            <a 
              href={member.socials.x} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="X Profile"
              title="X (Twitter)"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00D2FF]/10 text-white/50 hover:text-[#00D2FF] border border-white/10 hover:border-[#00D2FF]/40 flex items-center justify-center transition-all hover:scale-110"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
            </a>
          )}
          {member.socials.pinterest && (
            <a 
              href={member.socials.pinterest} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Pinterest Profile"
              title="Pinterest"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-red-500/10 text-white/50 hover:text-red-400 border border-white/10 hover:border-red-500/40 flex items-center justify-center transition-all hover:scale-110"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
            </a>
          )}
          {member.socials.behance && (
            <a 
              href={member.socials.behance} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Behance Portfolio"
              title="Behance"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00D2FF]/10 text-white/50 hover:text-[#00D2FF] border border-white/10 hover:border-[#00D2FF]/40 flex items-center justify-center transition-all hover:scale-110"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.171 3-3.455 0-5.555-2.261-5.555-5.538 0-3.347 2.179-5.462 5.372-5.462 3.327 0 4.962 2.172 4.962 5.093 0 .426-.041.85-.097 1.207h-7.669c.105 1.547 1.144 2.454 2.778 2.454 1.357 0 2.227-.611 2.656-1.354l2.774.6zm-7.954-4.5h4.922c-.068-1.246-.948-2.025-2.385-2.025-1.458 0-2.392.793-2.537 2.025zm-9.772 7.5h-6v-16h6.721c3.084 0 5.279 1.487 5.279 4.417 0 1.761-1.062 3.111-2.483 3.691 1.736.574 2.762 2.183 2.762 4.148 0 3.344-2.544 3.744-6.279 3.744zm-3.455-6.553h2.895c1.47 0 2.56-.514 2.56-1.921 0-1.341-1.01-1.879-2.56-1.879h-2.895v3.8zm0-5.747h2.641c1.373 0 2.29-.441 2.29-1.688 0-1.229-.861-1.679-2.29-1.679h-2.641v3.367z"/></svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const pillars = [
  {
    icon: Sparkles,
    title: "100% Bespoke Craft",
    description: "We strictly reject generic themes and cookie-cutter templates. Every typography choice, motion curve, and color system is engineered uniquely for your brand positioning."
  },
  {
    icon: Target,
    title: "Conversion-Led Design",
    description: "Stunning design without business metrics is just art. We marry high-end aesthetic luxury with measured conversion rates, lower CAC, and higher engagement."
  },
  {
    icon: ShieldCheck,
    title: "Full Asset Ownership",
    description: "You own every single vector, raw source file, Figma workspace, and ad creative system from day one. No hostage fees or recurring licensing tricks."
  },
  {
    icon: Zap,
    title: "Relentless Speed & Agile Sprints",
    description: "Traditional agencies take 4 months to brief. We deliver production-ready identity suites and initial launch deliverables within 2 to 4 weeks."
  }
];

const comparisonData = [
  { feature: "Custom Concept from Scratch", qarvion: true, traditional: "Sometimes", freelancers: "Rarely" },
  { feature: "Dedicated Senior Strategist", qarvion: true, traditional: "Junior Account Exec", freelancers: false },
  { feature: "Turnaround Time", qarvion: "2-4 Weeks", traditional: "3-6 Months", freelancers: "Unpredictable" },
  { feature: "Full Source File & IP Ownership", qarvion: true, traditional: "Extra Fee / Licensing", freelancers: "Varies" },
  { feature: "Direct Slack / Channel Access", qarvion: true, traditional: false, freelancers: false },
  { feature: "Post-Launch Growth Support", qarvion: true, traditional: "Heavy Retainer Only", freelancers: false }
];

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
          <span className="text-white font-medium">About Us</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 mb-28">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/20 text-[#00D2FF] text-xs font-bold uppercase tracking-widest">
            <LogoIcon size={18} />
            <span>About Qarvion Agency</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-['Montserrat'] tracking-tight leading-[1.1]">
            We Build Brands That <br />
            <span className="text-gradient-brand">Command Market Authority</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-['Inter'] leading-relaxed max-w-3xl">
            Founded with a conviction that modern businesses deserve better than bloated agencies and recycled templates. 
            Qarvion operates as a hybrid creative and growth agency, partnering with visionaries to craft timeless identities and scalable acquisition engines.
          </p>
        </div>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
          <div className="space-y-1">
            <div className="text-3xl md:text-5xl font-extrabold font-['Montserrat'] text-white">170+</div>
            <div className="text-sm text-white/50 font-['Inter']">Projects Shipped Worldwide</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-5xl font-extrabold font-['Montserrat'] text-[#00D2FF]">99.4%</div>
            <div className="text-sm text-white/50 font-['Inter']">On-Time Milestone Delivery</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-5xl font-extrabold font-['Montserrat'] text-white">14+</div>
            <div className="text-sm text-white/50 font-['Inter']">Countries Represented</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-5xl font-extrabold font-['Montserrat'] text-[#A3FF12]">4.9 / 5</div>
            <div className="text-sm text-white/50 font-['Inter']">Client Satisfaction Score</div>
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="rounded-3xl bg-gradient-to-br from-[#101B3A]/80 via-[#0B132B]/90 to-[#16213E]/80 border border-white/10 p-8 md:p-16 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D2FF]/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute -right-16 -bottom-16 opacity-10 pointer-events-none">
            <LogoIcon size={360} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00D2FF]">OUR MANIFESTO</span>
              <h2 className="text-3xl md:text-5xl font-bold font-['Montserrat'] leading-tight">
                Design that commands respect, backed by <span className="text-gradient-brand">numbers that prove it.</span>
              </h2>
              <p className="text-white/70 font-['Inter'] leading-relaxed">
                In an era crowded with generic digital noise, true distinctiveness is the rarest competitive advantage. 
                We don't merely design logos or run ad campaigns; we architect entire brand personalities that evoke trust, stir emotion, and convert audiences into lifelong advocates.
              </p>
              <p className="text-white/70 font-['Inter'] leading-relaxed">
                Whether scaling a seed-stage tech disruptor or repositioning a global legacy enterprise, our team combines elite design execution with strategic marketing rigor.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('works')}
                  className="px-6 py-3 rounded-full bg-white text-[#0B132B] font-bold text-sm hover:bg-[#00D2FF] transition-all flex items-center gap-2 group"
                >
                  See Our Case Studies
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  Book Discovery Call
                  <ArrowUpRight className="w-4 h-4 text-[#00D2FF]" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                <Globe className="w-6 h-6 text-[#00D2FF]" />
                <h3 className="font-bold text-lg text-white font-['Montserrat']">Global Reach</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                  Working across North America, Europe, Middle East, and Asia with agile time-zone coordination.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                <Award className="w-6 h-6 text-[#A3FF12]" />
                <h3 className="font-bold text-lg text-white font-['Montserrat']">Award-Grade Finish</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                  Every deliverable meets strict international standards for typographic balance and layout hierarchy.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                <Users className="w-6 h-6 text-[#00D2FF]" />
                <h3 className="font-bold text-lg text-white font-['Montserrat']">Collaborative Flow</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                  Direct communication with specialists, continuous async Figma updates, and no middleman friction.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                <MessageSquare className="w-6 h-6 text-[#A3FF12]" />
                <h3 className="font-bold text-lg text-white font-['Montserrat']">Agile Iteration</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                  Rapid feedback cycles ensure we hone in on the ideal direction in days rather than months.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[#00D2FF] text-xs font-extrabold tracking-[0.3em] uppercase">HOW WE WORK</span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-['Montserrat']">
            Our Four Non-Negotiables
          </h2>
          <p className="text-white/60 font-['Inter'] text-sm md:text-base">
            These foundational standards govern every project we undertake, from initial discovery to live production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#00D2FF]/30 transition-all duration-300 hover:-translate-y-1 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#00D2FF]/10 flex items-center justify-center text-[#00D2FF] group-hover:bg-[#00D2FF] group-hover:text-[#0B132B] transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-['Montserrat'] text-white">{pillar.title}</h3>
                <p className="text-sm text-white/60 font-['Inter'] leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[#A3FF12] text-xs font-extrabold tracking-[0.3em] uppercase">THE DIFFERENCE</span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-['Montserrat']">
            Why Qarvion Beats The Rest
          </h2>
          <p className="text-white/60 font-['Inter']">
            A transparent look at how our nimble, high-craft model compares to traditional alternatives.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[650px] rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
            <table className="w-full text-left font-['Inter'] text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="py-5 px-6 font-bold text-white uppercase text-xs tracking-wider">Features & Guarantees</th>
                  <th className="py-5 px-6 font-bold text-[#00D2FF] uppercase text-xs tracking-wider bg-[#00D2FF]/5">Qarvion Agency</th>
                  <th className="py-5 px-6 font-semibold text-white/50 uppercase text-xs tracking-wider">Traditional Agency</th>
                  <th className="py-5 px-6 font-semibold text-white/50 uppercase text-xs tracking-wider">Freelance Platforms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 text-white font-medium">{row.feature}</td>
                    <td className="py-4 px-6 bg-[#00D2FF]/5 font-semibold text-[#00D2FF]">
                      {row.qarvion === true ? (
                        <span className="flex items-center gap-1.5 text-[#00D2FF]">
                          <CheckCircle2 className="w-4 h-4" /> Yes, Guaranteed
                        </span>
                      ) : (
                        row.qarvion
                      )}
                    </td>
                    <td className="py-4 px-6 text-white/60">
                      {row.traditional === false ? (
                        <span className="flex items-center gap-1.5 text-white/40">
                          <XCircle className="w-4 h-4" /> No
                        </span>
                      ) : (
                        row.traditional
                      )}
                    </td>
                    <td className="py-4 px-6 text-white/50">
                      {row.freelancers === false ? (
                        <span className="flex items-center gap-1.5 text-white/30">
                          <XCircle className="w-4 h-4" /> No
                        </span>
                      ) : (
                        row.freelancers
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[#00D2FF] text-xs font-extrabold tracking-[0.3em] uppercase">LEADERSHIP</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-['Montserrat'] text-white mt-2">
              Meet The Strategists Behind Qarvion
            </h2>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="self-start md:self-auto px-6 py-3 rounded-full bg-white/10 hover:bg-[#00D2FF] hover:text-[#0B132B] font-bold text-sm transition-all flex items-center gap-2"
          >
            Work Directly With Us
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <AboutTeamCard key={idx} member={member} />
          ))}
        </div>
      </section>

      {/* Inter-Page Links Navigation Bar */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-[#1B2A49] via-[#0F3460] to-[#0B132B] border border-white/10 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold font-['Montserrat'] text-white">
              Where would you like to explore next?
            </h2>
            <p className="text-white/70 text-sm md:text-base font-['Inter']">
              Navigate seamlessly across our agency departments to see what we build and how we can elevate your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div 
              onClick={() => onNavigate('services')}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#00D2FF] hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase text-[#00D2FF] tracking-wider">Capabilities</span>
                <ArrowRight className="w-4 h-4 text-[#00D2FF] group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-xl font-bold font-['Montserrat'] text-white mb-2">Our Services</h3>
              <p className="text-xs text-white/60 font-['Inter']">Explore our 6 core design & growth pillars, workflow, and pricing tiers.</p>
            </div>

            <div 
              onClick={() => onNavigate('works')}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#A3FF12] hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase text-[#A3FF12] tracking-wider">Portfolio</span>
                <ArrowRight className="w-4 h-4 text-[#A3FF12] group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-xl font-bold font-['Montserrat'] text-white mb-2">Our Works</h3>
              <p className="text-xs text-white/60 font-['Inter']">See live case studies, client results, and visual design showcases.</p>
            </div>

            <div 
              onClick={() => onNavigate('contact')}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase text-white/70 tracking-wider">Connect</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-xl font-bold font-['Montserrat'] text-white mb-2">Contact & Inquire</h3>
              <p className="text-xs text-white/60 font-['Inter']">Fill our interactive project brief or schedule a 15-minute discovery call.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
