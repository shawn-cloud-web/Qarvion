import React, { useEffect, useRef } from 'react';

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
                  <a href="mailto:qarviontech@gmail.com" className="hover:text-blue-400 transition-colors">qarviontech@gmail.com</a>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <span>Dubai, UAE</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 p-12 md:p-16 bg-white/[0.01]">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Your Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Project Type</label>
                    <select className="w-full bg-[#0A1121] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer">
                      <option>Logo Design</option>
                      <option>Brand Identity</option>
                      <option>Social Media</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Budget Range</label>
                    <select className="w-full bg-[#0A1121] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer">
                      <option>&lt; $1,000</option>
                      <option>$1,000 - $5,000</option>
                      <option>$5,000 - $10,000</option>
                      <option>$10,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Project Details</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your project..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/20 resize-none"
                  ></textarea>
                </div>

                <button className="group relative w-full py-5 rounded-full font-bold font-['Montserrat'] text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  <span className="relative z-10">Start Your Project</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 group-hover:brightness-125 transition-all"></div>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 animate-shine"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsAndContact;