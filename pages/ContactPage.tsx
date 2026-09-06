import React, { useState, useEffect } from 'react';
import { LogoIcon } from '../components/Logo';
import { 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Check, 
  Copy, 
  ExternalLink,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Zap,
  Lock,
  ChevronDown,
  Globe2,
  Inbox
} from 'lucide-react';
import { saveBrief, sendBriefToEmail, ProjectBrief } from '../utils/inquiries';
import { SubmissionsInboxModal } from '../components/SubmissionsInboxModal';

interface ContactPageProps {
  initialService?: string;
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialService, onNavigate }) => {
  const normalizeService = (svc?: string) => {
    if (!svc) return 'Brand Identity Design';
    if (svc === 'Social Media Growth') return 'Social Media Marketing';
    return svc;
  };

  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    return [normalizeService(initialService)];
  });
  
  // Decreased, market-friendly affordable budget ranges
  const [selectedBudget, setSelectedBudget] = useState<string>('$100 - $250');
  const [timeline, setTimeline] = useState<string>('2-4 Weeks');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [submittedBrief, setSubmittedBrief] = useState<ProjectBrief | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Live Studio Clock (Dhaka Time GMT+6)
  const [dhakaTime, setDhakaTime] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setDhakaTime(formatter.format(now));
      } catch {
        setDhakaTime('Online');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (initialService) {
      const normalized = normalizeService(initialService);
      if (!selectedServices.includes(normalized)) {
        setSelectedServices(prev => [...prev, normalized]);
      }
    }
  }, [initialService]);

  const serviceOptions = [
    'Brand Identity Design',
    'Web & UI/UX Design',
    'Social Media Marketing',
    'Motion Graphics & 3D',
    'Paid Performance Ads',
    'Packaging & Print'
  ];

  // Decreased prices as explicitly requested
  const budgetOptions = [
    '< $100',
    '$100 - $250',
    '$250 - $500',
    '$500+'
  ];

  const timelineOptions = [
    '1-2 Weeks',
    '2-4 Weeks',
    '1-2 Months',
    'Flexible'
  ];

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.details.trim()) {
      return;
    }

    setIsSubmitting(true);

    const briefPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim() || undefined,
      services: selectedServices.length > 0 ? selectedServices : ['General Inquiry'],
      budget: selectedBudget,
      timeline,
      details: formData.details.trim(),
      source: 'contact-page' as const
    };

    // 1. Save locally for guaranteed backup
    const saved = saveBrief(briefPayload);
    setSubmittedBrief(saved);

    // 2. Dispatch email to agency mailbox via FormSubmit
    await sendBriefToEmail(saved);

    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const projectPerks = [
    { icon: FileCheck2, title: '100% Vector Source Files', desc: 'Figma, AI, SVG, and high-res master exports' },
    { icon: ShieldCheck, title: 'Full Commercial IP Rights', desc: 'Complete ownership transferred to your brand' },
    { icon: Zap, title: 'Rapid 24-Hour Review', desc: 'Fast feedback loops and transparent communication' },
    { icon: Lock, title: 'Confidential & NDA Safe', desc: 'Zero data leakage for unreleased projects' }
  ];

  const quickFaqs = [
    {
      q: 'How fast can our project kickoff?',
      a: 'Once your brief is submitted, we review your requirements within 24 hours. Most projects kickoff within 2 to 3 days after discovery alignment.'
    },
    {
      q: 'Do you offer custom package combinations?',
      a: 'Yes! You can select multiple services above (e.g. Brand Identity + Web UI/UX + Social Media) to get a cohesive, integrated brand system.'
    },
    {
      q: 'What communication channels do you use during projects?',
      a: 'We communicate via WhatsApp, Google Meet, or private Slack channels alongside interactive Figma links so you can inspect work in real-time.'
    }
  ];

  return (
    <div className="pt-32 pb-24 text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00D2FF]/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/20 text-[#00D2FF] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start a Conversation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold font-['Montserrat'] tracking-tight">
            Let's Build Something <span className="text-gradient-brand">Exceptional</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 font-['Inter'] leading-relaxed">
            Tell us about your brand vision, goals, and requirements. Every brief submitted is sent directly to our creative desk with a guaranteed 24-hour response.
          </p>
        </div>

        {/* 2-Column Main Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Information & Agency Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Availability Status Card with Live Studio Clock */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Studio Active
                  </span>
                </div>
                {dhakaTime && (
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    <Clock className="w-3 h-3 text-[#00D2FF]" />
                    <span>{dhakaTime}</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-white/70 font-['Inter'] leading-relaxed">
                Currently taking on select branding, design, and growth marketing campaigns with fast 24-hour response.
              </p>
              <div className="pt-3.5 mt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-white/40">Inquiries stored locally</span>
                <button
                  type="button"
                  onClick={() => setIsInboxOpen(true)}
                  className="text-xs text-[#00D2FF] hover:underline font-semibold flex items-center gap-1.5 cursor-pointer bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/5 transition-all"
                >
                  <Inbox className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>View Briefs Inbox</span>
                </button>
              </div>
            </div>

            {/* Direct Contact Coordinates Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0E1730] to-[#0A1124] border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <LogoIcon size={26} />
                <h3 className="text-xl font-bold font-['Montserrat'] text-white">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-4">
                
                {/* Official Agency Email (No raw exposed email address) */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-3 hover:border-[#00D2FF]/30 transition-all">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#00D2FF]/10 flex items-center justify-center text-[#00D2FF] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider">Direct Agency Email</div>
                      <a 
                        href="mailto:qarviontech@gmail.com" 
                        className="text-white hover:text-[#00D2FF] font-semibold text-sm transition-colors flex items-center gap-1.5"
                      >
                        <span>Official Studio Inbox</span>
                        <ExternalLink className="w-3 h-3 text-[#00D2FF]" />
                      </a>
                    </div>
                  </div>
                  <a
                    href="mailto:qarviontech@gmail.com"
                    className="px-3 py-1.5 rounded-lg bg-[#00D2FF]/10 hover:bg-[#00D2FF]/20 text-[#00D2FF] text-xs font-bold transition-colors flex items-center gap-1"
                    title="Send Email"
                  >
                    <span>Send Email</span>
                  </a>
                </div>

                {/* WhatsApp Chat & Call */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-3 hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider">WhatsApp & Contact Number</div>
                      <a 
                        href="https://wa.me/8801725129901" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white hover:text-emerald-400 font-semibold text-sm transition-colors block"
                      >
                        +880 1725-129901
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => copyToClipboard('+8801725129901')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                      title="Copy Contact Number"
                    >
                      {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href="https://wa.me/8801725129901"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                      title="Open WhatsApp Chat"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Response Guarantee */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#00D2FF]/10 flex items-center justify-center text-[#00D2FF] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider">Response Guarantee</div>
                    <span className="text-white text-sm font-medium">Within 24 business hours</span>
                  </div>
                </div>

                {/* Location */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#00D2FF]/10 flex items-center justify-center text-[#00D2FF] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider">Studio Location</div>
                    <span className="text-white text-sm font-medium">Dhaka, Bangladesh • Global Remote Clients</span>
                  </div>
                </div>

              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Connect On Social</div>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://www.facebook.com/Qarvion" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook"
                    title="Facebook"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00D2FF] hover:border-[#00D2FF]/40 hover:bg-[#00D2FF]/10 hover:scale-105 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a 
                    href="https://x.com/Qarvion" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="X"
                    title="X (Twitter)"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00D2FF] hover:border-[#00D2FF]/40 hover:bg-[#00D2FF]/10 hover:scale-105 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                  </a>
                  <a 
                    href="https://www.pinterest.com/murshiduzzamanDm/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Pinterest"
                    title="Pinterest"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 hover:scale-105 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                  </a>
                  <a 
                    href="https://www.behance.net/murshiduzzaman" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Behance"
                    title="Behance"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00D2FF] hover:border-[#00D2FF]/40 hover:bg-[#00D2FF]/10 hover:scale-105 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.171 3-3.455 0-5.555-2.261-5.555-5.538 0-3.347 2.179-5.462 5.372-5.462 3.327 0 4.962 2.172 4.962 5.093 0 .426-.041.85-.097 1.207h-7.669c.105 1.547 1.144 2.454 2.778 2.454 1.357 0 2.227-.611 2.656-1.354l2.774.6zm-7.954-4.5h4.922c-.068-1.246-.948-2.025-2.385-2.025-1.458 0-2.392.793-2.537 2.025zm-9.772 7.5h-6v-16h6.721c3.084 0 5.279 1.487 5.279 4.417 0 1.761-1.062 3.111-2.483 3.691 1.736.574 2.762 2.183 2.762 4.148 0 3.344-2.544 3.744-6.279 3.744zm-3.455-6.553h2.895c1.47 0 2.56-.514 2.56-1.921 0-1.341-1.01-1.879-2.56-1.879h-2.895v3.8zm0-5.747h2.641c1.373 0 2.29-.441 2.29-1.688 0-1.229-.861-1.679-2.29-1.679h-2.641v3.367z"/></svg>
                  </a>
                </div>
              </div>

            </div>

            {/* Direct Delivery Guarantee Info */}
            <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#00D2FF] shrink-0 mt-0.5" />
              <span>
                <strong>Direct Delivery Guarantee:</strong> All project briefs are automatically routed straight to our senior creative director's inbox so our team can review and respond promptly.
              </span>
            </div>

            {/* Direct WhatsApp Action Card */}
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Need a Quick Chat?</div>
                  <div className="text-[11px] text-white/50">Message us on WhatsApp anytime</div>
                </div>
              </div>
              <a
                href="https://wa.me/8801725129901"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Chat Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Clean Project Brief Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#101B3A] via-[#0B132B] to-[#121E3E] border border-white/10 shadow-2xl backdrop-blur-xl relative">
              
              {isSuccess ? (
                /* Success Confirmation View */
                <div className="py-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold font-['Montserrat'] text-white">
                      Project Brief Sent!
                    </h3>
                    <p className="text-white/70 font-['Inter'] max-w-md mx-auto text-sm leading-relaxed">
                      Thank you, <strong className="text-[#00D2FF]">{formData.name}</strong>. Your project brief has been delivered directly to our creative leadership inbox.
                    </p>
                    <p className="text-xs text-white/50 font-['Inter']">
                      We will review your vision and reply to <span className="text-[#00D2FF] font-medium">{formData.email}</span> within 24 business hours.
                    </p>
                  </div>

                  {/* Summary of what was sent */}
                  {submittedBrief && (
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-left text-xs space-y-2.5 max-w-lg mx-auto">
                      <div className="flex justify-between items-center text-white/40 pb-2 border-b border-white/5">
                        <span>Status: <strong className="text-emerald-400">Delivered to Studio Inbox</strong></span>
                        <span>{new Date(submittedBrief.createdAt).toLocaleTimeString()}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-white/80">
                        <div><strong>Client:</strong> {submittedBrief.name}</div>
                        <div><strong>Email:</strong> {submittedBrief.email}</div>
                        <div><strong>Budget:</strong> {submittedBrief.budget}</div>
                        <div><strong>Timeline:</strong> {submittedBrief.timeline}</div>
                      </div>
                      <div className="pt-2 text-white/60">
                        <strong>Services:</strong> {submittedBrief.services.join(', ')}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsInboxOpen(true)}
                      className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Inbox className="w-4 h-4 text-[#00D2FF]" />
                      <span>Review In Briefs Log</span>
                    </button>

                    <a
                      href="mailto:qarviontech@gmail.com"
                      className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-[#00D2FF]" />
                      <span>Open Direct Email App</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onNavigate('works')}
                      className="px-5 py-3 rounded-full bg-[#00D2FF] text-[#0B132B] font-bold text-xs hover:bg-white transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <span>Explore Our Work</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: '', email: '', company: '', details: '' });
                      }}
                      className="px-5 py-3 rounded-full bg-transparent text-white/50 text-xs hover:text-white underline transition-all cursor-pointer"
                    >
                      Submit Another Brief
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Project Brief Form */
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-['Montserrat'] text-white mb-2">
                      Submit Your Project Brief
                    </h2>
                    <p className="text-sm text-white/50 font-['Inter']">
                      Fill out the fields below. Your inquiry is emailed directly to our creative desk.
                    </p>
                  </div>

                  {/* 1. Services Selection */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/70 font-['Inter'] block">
                      1. Services Needed (Select any that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((srv) => {
                        const isSelected = selectedServices.includes(srv);
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => toggleService(srv)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-[#00D2FF] text-[#0B132B] border-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.3)]'
                                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Budget Selection (Decreased Affordable Rates) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/70 font-['Inter']">
                        2. Target Budget Range
                      </label>
                      <span className="text-[11px] text-emerald-400 font-semibold">Affordable pricing</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map((bgt) => (
                        <button
                          type="button"
                          key={bgt}
                          onClick={() => setSelectedBudget(bgt)}
                          className={`py-2.5 px-3 text-center rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                            selectedBudget === bgt
                              ? 'bg-emerald-400 text-[#050810] border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)] font-extrabold'
                              : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {bgt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Estimated Launch Timeline */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/70 font-['Inter'] block">
                      3. Estimated Launch Timeline
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timelineOptions.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setTimeline(t)}
                          className={`py-2 px-3 text-center rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                            timeline === t
                              ? 'bg-white text-[#0B132B] font-bold border-white shadow-md'
                              : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Client Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/70 font-['Inter']">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00D2FF] focus:bg-white/[0.08] transition-all font-['Inter']"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/70 font-['Inter']">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00D2FF] focus:bg-white/[0.08] transition-all font-['Inter']"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/70 font-['Inter']">
                      Company / Brand Name <span className="text-white/40 normal-case">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Corp"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00D2FF] focus:bg-white/[0.08] transition-all font-['Inter']"
                    />
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/70 font-['Inter']">
                      Project Vision & Key Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Tell us about what you want to build, current challenges, inspiration links, or specific deliverables needed..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00D2FF] focus:bg-white/[0.08] transition-all font-['Inter'] resize-none leading-relaxed"
                    ></textarea>
                  </div>

                  {/* Live Interactive Configuration Scope Preview (Interesting element in bottom of form) */}
                  <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50 font-['Inter']">Selected Configuration:</span>
                      <span className="text-emerald-400 font-bold font-mono">{selectedBudget}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/80 font-['Inter']">
                      <span className="text-white/40">Scope:</span>
                      {selectedServices.map((s, idx) => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-[#00D2FF]">
                          {s}{idx < selectedServices.length - 1 ? '' : ''}
                        </span>
                      ))}
                      <span className="text-white/40 ml-auto font-mono text-[11px]">Timeline: {timeline}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#00D2FF] text-[#0B132B] font-extrabold text-sm hover:bg-white hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#0B132B] border-t-transparent rounded-full animate-spin"></div>
                        <span>Dispatching Your Project Brief...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Bottom of Form: Client Trust & Guarantees Strip */}
                  <div className="pt-2 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-center gap-2 text-xs text-white/40 text-center font-['Inter']">
                      <span>Direct Studio Delivery</span>
                      <span>•</span>
                      <span>24-Hour Review Turnaround</span>
                      <span>•</span>
                      <span>Zero Spam Guaranteed</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                      <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
                        <span>Source Files</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
                        <span>100% IP Transfer</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
                        <span>Fast Sprints</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
                        <span>NDA Protected</span>
                      </div>
                    </div>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Interesting Bottom Section: 3-Step What Happens Next Roadmap & Quick FAQs */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold font-['Montserrat'] text-white">
              What Happens After You Submit?
            </h2>
            <p className="text-sm text-white/60 font-['Inter']">
              Our streamlined onboarding ensures zero wasted time and total transparency from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden group hover:border-[#00D2FF]/30 transition-all">
              <div className="text-4xl font-extrabold text-[#00D2FF]/20 mb-3 font-mono">01</div>
              <h3 className="text-lg font-bold font-['Montserrat'] text-white mb-2">
                Brief Analysis (24h)
              </h3>
              <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                Our Creative Director and Lead Designer assess your requirements, market space, and deliverables.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden group hover:border-[#00D2FF]/30 transition-all">
              <div className="text-4xl font-extrabold text-emerald-400/20 mb-3 font-mono">02</div>
              <h3 className="text-lg font-bold font-['Montserrat'] text-white mb-2">
                Tailored Proposal & Call
              </h3>
              <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                You receive a clear breakdown of milestones, exact deliverables, and timeline with no hidden costs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden group hover:border-[#00D2FF]/30 transition-all">
              <div className="text-4xl font-extrabold text-[#00D2FF]/20 mb-3 font-mono">03</div>
              <h3 className="text-lg font-bold font-['Montserrat'] text-white mb-2">
                Kickoff & Live Figma Access
              </h3>
              <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                Sprint begins. You get direct access to interactive design files, progress updates, and revision stages.
              </p>
            </div>
          </div>

          {/* Quick FAQ Dropdowns */}
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00D2FF]">Quick Questions</span>
            </div>
            {quickFaqs.map((faq, index) => (
              <div 
                key={faq.q}
                className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="text-sm font-bold text-white font-['Montserrat']">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${activeFaq === index ? 'rotate-180 text-[#00D2FF]' : ''}`} />
                </button>
                {activeFaq === index && (
                  <div className="px-5 pb-5 pt-1 text-xs text-white/60 font-['Inter'] leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Submissions & Inquiries Viewer Modal */}
      <SubmissionsInboxModal 
        isOpen={isInboxOpen} 
        onClose={() => setIsInboxOpen(false)} 
      />
    </div>
  );
};

export default ContactPage;
