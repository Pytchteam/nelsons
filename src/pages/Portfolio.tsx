import React from 'react';
import { motion } from 'motion/react';
import { Eye, ArrowRight, MapPin, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const GALLERY = [
  {
    id: 1,
    title: 'Ocho Rios Medical Center',
    category: 'Commercial Signage',
    location: 'Ocho Rios, St. Ann',
    image: 'https://picsum.photos/seed/med/800/1000',
    description: 'A complete wayfinding and identity system for a premier medical facility.'
  },
  {
    id: 2,
    title: 'Jamaica National Bank',
    category: 'Window Branding',
    location: 'Montego Bay',
    image: 'https://picsum.photos/seed/bank/800/800',
    description: 'High-security frosted glass and perforated window graphics for privacy and brand flow.'
  },
  {
    id: 3,
    title: 'Island Sip Cafe',
    category: 'Storefront',
    location: 'Discovery Bay',
    image: 'https://picsum.photos/seed/cafe/1000/800',
    description: 'Custom illuminated channel letters and full-color ACM signage.'
  },
  {
    id: 4,
    title: 'Adventure Tours Fleet',
    category: 'Vehicle Wraps',
    location: 'St. Ann',
    image: 'https://picsum.photos/seed/wrap/800/1000',
    description: 'Matching branding for a fleet of 5 tour vans, designed for mobile visibility.'
  },
  {
    id: 5,
    title: 'Reggae Sumfest Stage',
    category: 'Event Media',
    location: 'Montego Bay',
    image: 'https://picsum.photos/seed/stage/1000/1000',
    description: 'Backstage pass printing and massive mesh stage banners for the world stage.'
  },
  {
    id: 6,
    title: 'Skyline Luxury Villas',
    category: 'Signage',
    location: 'Priory',
    image: 'https://picsum.photos/seed/villa/800/800',
    description: 'Elegant brushed aluminum signage for a high-end residential complex.'
  }
];

export default function Portfolio() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
           <div>
             <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest mb-2 block font-black">Visual Proof of Impact</span>
             <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none">
               Transformation <br /> <span className="text-brand-neon italic">Gallery</span>.
             </h1>
           </div>
           <p className="max-w-xs text-white/40 font-mono text-[10px] uppercase tracking-widest leading-loose">
             We help some of Jamaica’s most respected brands look better than their competitors.
           </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
           {GALLERY.map((item, idx) => (
             <motion.div
               key={item.id}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.05 }}
               className="break-inside-avoid relative group overflow-hidden rounded-3xl border border-white/5 bg-brand-charcoal"
             >
               <div className="relative overflow-hidden">
                 <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-matte via-brand-matte/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                 
                 <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 text-brand-neon font-mono text-[9px] uppercase tracking-[0.2em] mb-2">
                       <Tag size={12} />
                       {item.category}
                    </div>
                    <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-4 group-hover:neon-text-glow transition-all">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-white/50 uppercase tracking-widest mb-6">
                       <MapPin size={12} />
                       {item.location}
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      {item.description}
                    </p>
                    <Link 
                      to="/get-quote"
                      className="inline-flex items-center gap-2 bg-brand-neon text-brand-matte w-fit px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:scale-105 transition-all"
                    >
                      Project Quote <ArrowRight size={14} />
                    </Link>
                 </div>
               </div>
             </motion.div>
           ))}
        </div>

        {/* Portfolio Stats Section */}
        <div className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { val: '250+', label: 'Commercial Signages' },
             { val: '1,200', label: 'Satisfied Clients' },
             { val: '85', label: 'Vehicle Wraps Installed' },
             { val: '24hr', label: 'Fastest Local Response' }
           ].map(stat => (
             <div key={stat.label} className="p-8 bg-brand-charcoal rounded-3xl border border-white/5 text-center">
               <p className="text-4xl font-display font-black uppercase text-brand-neon mb-2">{stat.val}</p>
               <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">{stat.label}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
