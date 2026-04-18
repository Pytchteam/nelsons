import React from 'react';
import { motion } from 'motion/react';
import { Layers, Monitor, Truck, Briefcase, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const pillars = [
  {
    title: 'Business Essentials',
    icon: <Briefcase className="w-8 h-8" />,
    items: ['Business Cards', 'Flyers & Brochures', 'Commercial IDs', 'Invoices'],
    image: 'https://picsum.photos/seed/cards/600/400'
  },
  {
    title: 'Brand Visibility',
    icon: <Monitor className="w-8 h-8" />,
    items: ['Banners & Billboards', 'Exterior Signage', 'Lightboxes', 'Flags'],
    image: 'https://picsum.photos/seed/signs/600/400'
  },
  {
    title: 'Store Branding',
    icon: <Layers className="w-8 h-8" />,
    items: ['Window Graphics', 'Wall Murals', 'Floor Decals', 'Frosted Glass'],
    image: 'https://picsum.photos/seed/store/600/400'
  },
  {
    title: 'Moving Media',
    icon: <Truck className="w-8 h-8" />,
    items: ['Vehicle Wraps', 'Partial Decals', 'Fleet Branding', 'Magnetic Signs'],
    image: 'https://picsum.photos/seed/car/600/400'
  }
];

export default function ServicePillars() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-center md:text-left">
        <div>
          <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest mb-2 block">Our Expertise</span>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight">Built for <span className="text-brand-neon underline decoration-white/20 underline-offset-8">Impact</span></h2>
        </div>
        <p className="text-brand-secondary max-w-sm font-mono text-xs uppercase tracking-widest leading-loose">
           From simple output to complex architectural branding systems. We do it all.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pillars.map((pillar, idx) => (
          <motion.div 
            key={pillar.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative overflow-hidden bg-brand-charcoal rounded-3xl border border-brand-border hover:border-brand-neon transition-colors"
          >
            <div className="absolute top-0 right-0 p-8 text-brand-neon/20 group-hover:text-brand-neon transition-colors">
              {pillar.icon}
            </div>
            
            <div className="p-10 flex flex-col h-full">
              <h3 className="text-3xl font-display font-black uppercase mb-6">{pillar.title}</h3>
              
              <ul className="space-y-3 mb-12">
                {pillar.items.map(item => (
                  <li key={item} className="flex items-center gap-3 text-brand-secondary group-hover:text-white transition-colors">
                    <div className="w-1.5 h-1.5 bg-brand-neon rounded-full" />
                    <span className="text-xs uppercase font-mono tracking-widest">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex justify-between items-center">
                <div className="flex gap-4">
                    <Link 
                        to="/get-quote" 
                        className="bg-brand-neon text-brand-matte px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors"
                    >
                        Request Quote
                    </Link>
                    <Link 
                        to="/upload-design" 
                        className="border border-white/20 text-white px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest hover:border-brand-neon transition-colors"
                    >
                        Order Online
                    </Link>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-neon group-hover:text-brand-matte transition-all">
                  <Plus className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Hover Image Reveal */}
            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
               <img 
                src={pillar.image} 
                alt={pillar.title} 
                className="w-full h-full object-cover scale-150 group-hover:scale-100 transition-transform duration-1000"
                referrerPolicy="no-referrer"
               />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
