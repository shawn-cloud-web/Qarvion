import React, { useState, useEffect } from 'react';
import { LogoIcon } from '../components/Logo';
import { 
  Sparkles, 
  Layers, 
  Palette, 
  TrendingUp, 
  Monitor, 
  Box, 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  Clock, 
  FileText, 
  ChevronDown, 
  HelpCircle,
  Zap,
  PhoneCall
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string, prefillService?: string) => void;
}

const detailedServices = [
  {
    id: "brand-identity",
    title: "Brand Identity & Strategy",
    tagline: "Unmistakable visual recognition that commands higher pricing.",
    icon: Palette,
    accent: "#00D2FF",
    deliverables: [
      "Primary & secondary logomark suite (Vector, SVG, PNG)",
      "Bespoke brand typography & font hierarchy",
      "Signature brand color palette & WCAG accessibility tokens",
      "Comprehensive 30+ page Brand Guidelines PDF",
      "Brand messaging, voice & positioning framework"
    ],
    timeline: "2 - 3 Weeks",
    idealFor: "Startups launching or established companies rebranding."
  },
  {
    id: "web-uiux",
    title: "Web & Digital Product Design",
    tagline: "Bespoke digital experiences that convert passive visitors into buyers.",
    icon: Monitor,
    accent: "#3A7BD5",
    deliverables: [
      "High-fidelity responsive UI/UX prototypes in Figma",
      "Custom responsive design system & component library",
      "Conversion-optimized landing pages & funnels",
      "Micro-interactions & fluid motion specifications",
      "Production-ready developer handoff & asset exports"
    ],
    timeline: "3 - 5 Weeks",
    idealFor: "SaaS products, e-commerce brands, and agency portfolios."
  },
  {
    id: "social-marketing",
    title: "Social Media Strategy & Creatives",
    tagline: "Scroll-stopping static & motion creatives that build devoted audiences.",
    icon: TrendingUp,
    accent: "#A3FF12",
    deliverables: [
      "Monthly custom content calendar & narrative pillars",
      "High-engagement carousel decks & static feed posts",
      "Short-form video concepts & motion reel templates",
      "Profile overhaul: Bio, highlights & banner branding",
      "Community engagement playbook & caption copywriting"
    ],
    timeline: "Ongoing Retainer",
    idealFor: "Brands looking to grow organic reach and social authority."
  },
  {
    id: "performance-ads",
    title: "Paid Ads & Performance Creatives",
    tagline: "High-CTR advertising creatives engineered to lower customer acquisition costs.",
    icon: Zap,
    accent: "#FFB800",
    deliverables: [
      "Direct-response visual hooks & split-testing variations",
      "Ad creatives formatted for Meta, TikTok & Google Display",
      "Compelling sales copywriting tailored for cold & warm traffic",
      "Landing page conversion alignment audit",
      "Bi-weekly creative iteration based on ROAS analytics"
    ],
    timeline: "Monthly Sprint",
    idealFor: "D2C brands and scaling software businesses running paid traffic."
  },
  {
    id: "motion-3d",
    title: "Motion Graphics & 3D Animation",
    tagline: "Dynamic visual storytelling that breathes life into products.",
    icon: Layers,
    accent: "#00D2FF",
    deliverables: [
      "Animated logo intros & digital stingers",
      "Product showcase 3D renders & explode views",
      "Explainer motion graphics & workflow visualizations",
      "Lottie / JSON vector animations for web performance",
      "Custom UI walkthroughs & onboarding animations"
    ],
    timeline: "2 - 4 Weeks",
    idealFor: "Hardware companies, fin-tech, and cutting-edge digital platforms."
  },
  {
    id: "print-packaging",
    title: "Packaging & Corporate Assets",
    tagline: "Tactile luxury assets that create unforgettable unboxing experiences.",
    icon: Box,
    accent: "#A3FF12",
    deliverables: [
      "Die-cut product packaging & label designs",
      "Luxury business cards & embossed stationery sets",
      "Investor pitch decks & corporate presentation templates",
      "Merchandise, apparel & event display graphics",
      "CMYK print-ready files with spot UV & foil specifications"
    ],
    timeline: "2 - 3 Weeks",
    idealFor: "Consumer products, luxury retail, and executive events."
  }
];

const workflowSteps = [
  {
    num: "01",
    title: "Strategic Discovery",
    desc: "We analyze your audience, dissect your competitors, and clarify your brand's unique market position."
  },
  {
    num: "02",
    title: "Concept Prototyping",
    desc: "We generate bold, distinct visual directions, presenting realistic mockups in real-world contexts."
  },
  {
    num: "03",
    title: "Iterative Refinement",
    desc: "Collaborative feedback rounds where we sculpt every nuance to perfection with your direct input."
  },
  {
    num: "04",
    title: "Production & Delivery",
    desc: "We export pixel-perfect source files, comprehensive guidelines, and complete asset kits."
  },
  {
    num: "05",
    title: "Scaling & Amplification",
    desc: "We help deploy your new assets across digital channels, ensuring maximum impact from day one."
  }
];

const pricingTiers = [
  {
    name: "Starter Identity",
    price: "$99",
    desc: "Ideal for emerging ventures needing high-end foundational branding.",
    features: [
      "3 Distinct Logo Concepts",
      "Full Vector & Web File Formats",
      "Primary Color Palette & Typography",
      "3 Rounds of Sprinted Revisions",
      "Basic Brand Style Sheet",
      "Turnaround in 3-5 Business Days"
    ],
    popular: false,
    serviceKey: "Brand Identity"
  },
  {
    name: "Complete Brand Suite",
    price: "$189",
    desc: "Our most popular comprehensive identity & digital asset system.",
    features: [
      "Full Visual Identity System",
      "Comprehensive 30-Page Brand Guidelines",
      "Full Social Media Starter Kit (20+ Assets)",
      "Stationery & Business Collateral",
      "Direct Communication Channel",
      "Full Copyright & Raw Source Files",
      "Turnaround in 7-10 Business Days"
    ],
    popular: true,
    serviceKey: "Brand Identity & Strategy"
  },
  {
    name: "Growth Retainer",
    price: "$349",
    period: "/month",
    desc: "Dedicated ongoing design & marketing sprints for scaling teams.",
    features: [
      "Continuous Design & UI Sprints",
      "Weekly Social & Ad Creative Batches",
      "Landing Page Optimization & A/B Tests",
      "Dedicated Senior Art Director",
      "48-Hour Turnaround on Tasks",
      "Cancel or Pause Anytime"
    ],
    popular: false,
    serviceKey: "Growth Retainer"
  }
];

const faqs = [
  {
    q: "How long does a typical branding or design project take?",
    a: "Standard brand identity suites take between 2 to 3 weeks. Comprehensive web UI/UX builds take 3 to 5 weeks. We establish concrete milestones at kickoff and deliver consistently on schedule."
  },
  {
    q: "What file formats will I receive upon completion?",
    a: "You receive all original, editable vector source files (Figma, Adobe Illustrator .AI, .EPS), print-ready CMYK PDFs, and optimized digital assets (SVG, PNG, WebP) structured in an organized cloud drive."
  },
  {
    q: "How do revisions work?",
    a: "Every project includes dedicated iterative feedback cycles. Because our discovery phase is extremely thorough, our initial concept presentations typically hit the target closely, saving time on endless revisions."
  },
  {
    q: "Can you design a custom package for our unique requirements?",
    a: "Yes! While our standard tiers cover most client needs, we regularly assemble customized scopes for enterprise brands, complex SaaS platforms, and multi-channel campaigns."
  }
];

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string>(detailedServices[0].id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleServiceInquiry = (serviceTitle: string) => {
    onNavigate('contact', serviceTitle);
  };

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
          <span className="text-white font-medium">Services</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 mb-24">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/20 text-[#00D2FF] text-xs font-bold uppercase tracking-widest">
            <LogoIcon size={18} />
            <span>Capabilities & Deliverables</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-['Montserrat'] tracking-tight leading-[1.1]">
            Transforming Ambition Into <br />
            <span className="text-gradient-brand">High-Converting Reality</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-['Inter'] leading-relaxed max-w-3xl">
            From strategic visual identities to high-converting UI/UX and ROI-driven social growth, 
            explore the complete scope of services we offer to help your business outpace the competition.
          </p>
        </div>
      </section>

      {/* Interactive Detailed Services Grid */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[#00D2FF] text-xs font-extrabold tracking-[0.3em] uppercase">FULL SERVICE SUITE</span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-['Montserrat']">
            Our Core Competencies
          </h2>
          <p className="text-white/60 font-['Inter'] text-sm md:text-base">
            Every service is executed by senior specialists with transparent deliverables and zero bloat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {detailedServices.map((service) => {
            const Icon = service.icon;
            const isSelected = selectedService === service.id;

            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                  isSelected 
                    ? 'bg-gradient-to-b from-[#101B3A] to-[#0B132B] border-[#00D2FF]/50 shadow-[0_0_30px_rgba(0,210,255,0.2)]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="space-y-6">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00D2FF]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white/40 flex items-center gap-1.5 font-['Inter']">
                      <Clock className="w-3.5 h-3.5" />
                      {service.timeline}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold font-['Montserrat'] text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-white/60 font-['Inter'] leading-relaxed">{service.tagline}</p>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-2.5 pt-4 border-t border-white/5">
                    <div className="text-xs font-bold text-white/70 uppercase tracking-wider font-['Inter']">Key Deliverables:</div>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-white/70 font-['Inter']">
                        <Check className="w-4 h-4 text-[#00D2FF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/40 font-['Inter']">{service.idealFor}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceInquiry(service.title);
                    }}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#00D2FF] hover:text-[#0B132B] font-bold text-xs transition-all flex items-center gap-1.5 text-white"
                  >
                    Inquire
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5-Step Agency Workflow */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="rounded-3xl bg-[#060A16] border border-white/10 p-8 md:p-16 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[#A3FF12] text-xs font-extrabold tracking-[0.3em] uppercase">HOW IT WORKS</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-['Montserrat']">
              Our 5-Stage Precision Workflow
            </h2>
            <p className="text-white/60 font-['Inter'] text-sm md:text-base">
              Predictable, milestone-driven execution designed to eliminate guesswork and scope creep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {workflowSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 relative group hover:border-[#A3FF12]/40 transition-colors"
              >
                <div className="text-3xl font-extrabold font-['Montserrat'] text-white/20 group-hover:text-[#A3FF12] transition-colors">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold font-['Montserrat'] text-white">{step.title}</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Pricing Packages */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[#00D2FF] text-xs font-extrabold tracking-[0.3em] uppercase">INVESTMENT TIERS</span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-['Montserrat']">
            Clear, Transparent Pricing
          </h2>
          <p className="text-white/60 font-['Inter'] text-sm md:text-base">
            No hidden retainers or surprise invoices. Choose the tier that matches your current growth stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, idx) => (
            <div 
              key={idx}
              className={`rounded-3xl p-8 border flex flex-col justify-between relative transition-all duration-300 ${
                tier.popular 
                  ? 'bg-gradient-to-b from-[#16213E] to-[#0B132B] border-[#00D2FF] shadow-[0_0_35px_rgba(0,210,255,0.25)] -translate-y-2'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 rounded-full bg-[#00D2FF] text-[#0B132B] text-[10px] font-extrabold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold font-['Montserrat'] text-white">{tier.name}</h3>
                  <p className="text-xs text-white/50 font-['Inter'] mt-1">{tier.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-extrabold font-['Montserrat'] text-white">{tier.price}</span>
                  {tier.period && <span className="text-sm text-white/50 font-['Inter']">{tier.period}</span>}
                </div>

                <div className="space-y-3 pt-6 border-t border-white/10">
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-white/70 font-['Inter']">
                      <Check className="w-4 h-4 text-[#00D2FF] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/5">
                <button
                  onClick={() => handleServiceInquiry(tier.name)}
                  className={`w-full py-3.5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-[#00D2FF] text-[#0B132B] hover:shadow-[0_0_20px_rgba(0,210,255,0.4)]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Choose {tier.name}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-6 md:px-12 mb-32 max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#A3FF12] text-xs font-extrabold tracking-[0.3em] uppercase">CLARITY</span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-['Montserrat']">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 font-['Inter']">
            Everything you need to know about working with Qarvion.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-bold text-base md:text-lg font-['Montserrat'] text-white">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#00D2FF] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-white/70 font-['Inter'] leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Inter-Page Links Navigation Bar */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-[#1B2A49] via-[#0F3460] to-[#0B132B] border border-white/10 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold font-['Montserrat'] text-white">
              Ready to see our services in practice?
            </h2>
            <p className="text-white/70 text-sm md:text-base font-['Inter']">
              Discover real-world results in our portfolio or reach out for an instant project estimate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div 
              onClick={() => onNavigate('works')}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#A3FF12] hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase text-[#A3FF12] tracking-wider">Proof of Craft</span>
                <ArrowRight className="w-4 h-4 text-[#A3FF12] group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-xl font-bold font-['Montserrat'] text-white mb-2">Our Works & Cases</h3>
              <p className="text-xs text-white/60 font-['Inter']">Browse 6+ in-depth case studies with measurable business metrics.</p>
            </div>

            <div 
              onClick={() => onNavigate('about')}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#00D2FF] hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase text-[#00D2FF] tracking-wider">The Agency</span>
                <ArrowRight className="w-4 h-4 text-[#00D2FF] group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-xl font-bold font-['Montserrat'] text-white mb-2">About Us</h3>
              <p className="text-xs text-white/60 font-['Inter']">Read our story, agency manifesto, and leadership bios.</p>
            </div>

            <div 
              onClick={() => onNavigate('contact')}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase text-white/70 tracking-wider">Next Step</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-xl font-bold font-['Montserrat'] text-white mb-2">Start a Project</h3>
              <p className="text-xs text-white/60 font-['Inter']">Fill out our brief form or request a custom proposal today.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
