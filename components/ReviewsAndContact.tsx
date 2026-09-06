
import React, { useEffect, useRef, useState } from 'react';
import { saveBrief, sendBriefToEmail } from '../utils/inquiries';

interface Testimonial {
  id: number;
  stars: number;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    stars: 5,
    quote: "The branding exceeded our expectations. Qarvion truly understands positioning and growth strategy.",
    author: "Dean",
    role: "Founder, Omega Tech",
    avatar: "https://i.pravatar.cc/150?u=dean"
  },
  {
    id: 2,
    stars: 5,
    quote: "Amazing workflow and support throughout the entire campaign. Our ROI increased within 30 days.",
    author: "Alex",
    role: "CEO, Flux Media",
    avatar: "https://i.pravatar.cc/150?u=alex"
  },
  {
    id: 3,
    stars: 5,
    quote: "The social media strategy transformed our engagement and ad performance. Incredible results.",
    author: "Sarah",
    role: "Marketing Director, Nova Labs",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 4,
    stars: 5,
    quote: "Professional, fast, and results-driven. Highly recommend Qarvion for any scaling brand.",
    author: "Michael",
    role: "Startup Founder",
    avatar: "https://i.pravatar.cc/150?u=michael"
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[400px] p-8 rounded-[32px] bg-white/[0.03] border border-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.07] hover:border-blue-500/30 hover:-translate-y-3 group">
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.stars)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-blue-500 fill-current group-hover:animate-pulse" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <p className="text-white/70 italic mb-8 font-['Inter'] leading-relaxed">
        "{testimonial.quote}"
      </p>
      <div className="flex items-center gap-4">
        <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full border border-white/10" />
        <div>
          <h4 className="text-white font-bold font-['Montserrat']">{testimonial.author}</h4>
          <p className="text-white/40 text-xs">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

const ReviewsAndContact: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Brand Identity Design',
    budget: '$100 - $250',
    details: ''
  });

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

    document.querySelectorAll('.rev-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newBrief = saveBrief({
      name: formData.name,
      email: formData.email,
      services: [formData.projectType],
      budget: formData.budget,
      details: formData.details,
      source: 'home-page'
    });

    // Forward directly to qarviontech@gmail.com
    await sendBriefToEmail(newBrief);

    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-[#060B1A] via-[#0B1224] to-[#0E1A35] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
         <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping [animation-duration:3s]"></div>
         <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse [animation-delay:1s]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        <div className="text-center mb-16 space-y-4 rev-reveal scroll-reveal">
          <span className="text-blue-500 text-xs font-extrabold tracking-[0.4em] uppercase">OUR RESULTS</span>
          <h2 className="text-4xl md:text-6xl font-['Montserrat'] font-extrabold text-white">
            Our Clients <span className="text-blue-400">Love Working With Us</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg font-['Inter']">
            Hear what our clients say about Qarvion’s branding and marketing expertise.
          </p>
        </div>

        <div className="relative w-full overflow-hidden mb-32 py-10 rev-reveal scroll-reveal [transition-delay:0.2s]">
          <div className="flex gap-8 animate-scroll-fast hover:[animation-play-state:paused] w-max">
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#060B1A] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#060B1A] to-transparent z-10"></div>
        </div>

        <div 
          ref={formRef}
          className="relative max-w-6xl mx-auto rounded-[40px] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl rev-reveal scroll-reveal [transition-delay:0.3s]"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>

          <div className="flex flex-col lg:flex-row min-h-[600px]">
            <div className="lg:w-1/2 p-12 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5">
              <h3 className="text-4xl md:text-6xl font-['Montserrat'] font-extrabold text-white mb-6 leading-tight">
                <span className="font-serif-italic text-blue-400 block mb-2">Ready</span> 
                to start your project?
              </h3>
              <p className="text-white/50 text-xl font-['Inter'] leading-relaxed mb-8">
                Tell us about your vision and we’ll get back to you within 24 hours to discuss how we can scale your brand.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Email Us</div>
                    <a href="mailto:qarviontech@gmail.com" className="text-white hover:text-blue-400 font-semibold transition-colors">Official Agency Inbox</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Call / Chat</div>
                    <a href="https://wa.me/8801725129901" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 font-semibold transition-colors">+880 1725-129901 (WhatsApp)</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <span>Dhaka, Bangladesh • Global Clients</span>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-3">Connect With Us</div>
                  <div className="flex items-center gap-3">
                    <a 
                      href="https://www.facebook.com/Qarvion" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="Facebook"
                      title="Facebook"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-blue-400 hover:bg-white/10 hover:scale-110 transition-all"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a 
                      href="https://x.com/Qarvion" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="X"
                      title="X (Twitter)"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-blue-400 hover:bg-white/10 hover:scale-110 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                    </a>
                    <a 
                      href="https://www.pinterest.com/murshiduzzamanDm/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="Pinterest"
                      title="Pinterest"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-red-400 hover:bg-white/10 hover:scale-110 transition-all"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                    </a>
                    <a 
                      href="https://www.behance.net/murshiduzzaman" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="Behance"
                      title="Behance"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-blue-400 hover:bg-white/10 hover:scale-110 transition-all"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.171 3-3.455 0-5.555-2.261-5.555-5.538 0-3.347 2.179-5.462 5.372-5.462 3.327 0 4.962 2.172 4.962 5.093 0 .426-.041.85-.097 1.207h-7.669c.105 1.547 1.144 2.454 2.778 2.454 1.357 0 2.227-.611 2.656-1.354l2.774.6zm-7.954-4.5h4.922c-.068-1.246-.948-2.025-2.385-2.025-1.458 0-2.392.793-2.537 2.025zm-9.772 7.5h-6v-16h6.721c3.084 0 5.279 1.487 5.279 4.417 0 1.761-1.062 3.111-2.483 3.691 1.736.574 2.762 2.183 2.762 4.148 0 3.344-2.544 3.744-6.279 3.744zm-3.455-6.553h2.895c1.47 0 2.56-.514 2.56-1.921 0-1.341-1.01-1.879-2.56-1.879h-2.895v3.8zm0-5.747h2.641c1.373 0 2.29-.441 2.29-1.688 0-1.229-.861-1.679-2.29-1.679h-2.641v3.367z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 p-12 md:p-16 bg-white/[0.01]">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-5 animate-float-slow py-8">
                  <div className="w-16 h-16 rounded-full bg-[#00D2FF]/20 border border-[#00D2FF]/40 flex items-center justify-center text-[#00D2FF] mb-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-['Montserrat'] font-bold text-white">Project Inquiry Received!</h3>
                  <p className="text-white/70 text-sm max-w-sm leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your project inquiry has been securely stored in our agency system and forwarded directly to our creative directors.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full max-w-xs">
                    <a
                      href={`mailto:qarviontech@gmail.com?subject=${encodeURIComponent(`Project Brief from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.projectType}\nBudget: ${formData.budget}\nDetails: ${formData.details}`)}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#00D2FF] text-[#0B132B] font-bold text-xs hover:bg-white transition-all text-center"
                    >
                      Send Direct Copy via Email
                    </a>
                    <button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', projectType: 'Brand Identity Design', budget: '$100 - $250', details: '' });
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 text-xs font-bold hover:bg-white/10 transition-colors"
                    >
                      Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Your Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Your Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Project Type</label>
                      <select 
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-[#0A1121] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="Logo Design">Logo Design</option>
                        <option value="Brand Identity Design">Brand Identity Design</option>
                        <option value="Web & UI/UX Design">Web & UI/UX Design</option>
                        <option value="Social Media Growth">Social Media Growth</option>
                        <option value="Paid Performance Ads">Paid Performance Ads</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Budget Range</label>
                      <select 
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#0A1121] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="< $100">&lt; $100 (Starter sprint)</option>
                        <option value="$100 - $250">$100 - $250 (Popular)</option>
                        <option value="$250 - $500">$250 - $500 (Complete Suite)</option>
                        <option value="$500+">$500+ (Full 360 System)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Project Details</label>
                    <textarea 
                      required
                      rows={4} 
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Tell us about your brand vision, target timeline, and goals..." 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/20 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="group relative w-full py-5 rounded-full font-bold font-['Montserrat'] text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span className="relative z-10">Submit Project Inquiry</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 group-hover:brightness-125 transition-all"></div>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 animate-shine"></div>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsAndContact;
