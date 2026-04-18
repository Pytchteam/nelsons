import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest mb-2 block font-black">Direct Communication Rail</span>
            <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Let's <br /> <span className="text-brand-neon italic">Sync</span>.
            </h1>
            <p className="text-white/50 max-w-sm mb-12 font-mono text-[10px] uppercase tracking-widest leading-loose">
              Have a complex architectural project? Our senior theorists are ready to consult on your visibility strategy.
            </p>

            <div className="space-y-8">
               <div className="flex items-center gap-6 group">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-brand-neon group-hover:bg-brand-neon group-hover:text-brand-matte transition-all">
                    <Phone size={24} />
                 </div>
                 <div>
                   <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">Call the Studio</p>
                   <p className="text-xl font-display font-bold">+1 (876) 555-0123</p>
                 </div>
               </div>
               <div className="flex items-center gap-6 group">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-brand-neon group-hover:bg-brand-neon group-hover:text-brand-matte transition-all">
                    <MessageCircle size={24} />
                 </div>
                 <div>
                   <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">WhatsApp Instant</p>
                   <p className="text-xl font-display font-bold">+1 (876) 555-0123</p>
                 </div>
               </div>
               <div className="flex items-center gap-6 group">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-brand-neon group-hover:bg-brand-neon group-hover:text-brand-matte transition-all">
                    <MapPin size={24} />
                 </div>
                 <div>
                   <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">Ocho Rios Studio</p>
                   <p className="text-xl font-display font-bold">Main St, Ocho Rios, St. Ann</p>
                 </div>
               </div>
            </div>
          </div>

          <div className="glass-panel p-10 rounded-3xl border border-white/10">
             <h3 className="text-2xl font-display font-black uppercase mb-8">Transmission Form</h3>
             <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none text-sm" />
                  <input type="text" placeholder="Company" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none text-sm" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none text-sm" />
                <textarea rows={5} placeholder="Project details or collaboration ideas..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none text-sm resize-none"></textarea>
                <button className="w-full bg-brand-neon text-brand-matte py-5 rounded-xl font-display font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:neon-glow transition-all">
                   Send Message <Send size={20} />
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}
