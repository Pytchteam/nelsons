import React from 'react';
import { motion } from 'motion/react';
import { Printer, Monitor, Truck, Layers, Briefcase, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Business Essentials',
    slug: 'essentials',
    icon: <Briefcase className="w-10 h-10" />,
    items: [
      { name: 'Business Cards', desc: 'Premium silk, matte, or UV finishes.' },
      { name: 'Letterheads', desc: 'Professional corporate stationaries.' },
      { name: 'Flyers & Brochures', desc: 'High-volume marketing materials.' },
      { name: 'Commercial IDs', desc: 'Durable staff identification cards.' }
    ]
  },
  {
    title: 'Brand Visibility',
    slug: 'visibility',
    icon: <Monitor className="w-10 h-10" />,
    items: [
      { name: 'Vinyl Banners', desc: 'Heavy-duty grommeted exterior banners.' },
      { name: 'ACM Signage', desc: 'Permanent architectural metal signs.' },
      { name: 'Lightboxes', desc: 'Illuminated night-time visibility.' },
      { name: 'Banners & Billboards', desc: 'Large format outdoor advertising.' }
    ]
  },
  {
    title: 'Store Branding',
    slug: 'store',
    icon: <Layers className="w-10 h-10" />,
    items: [
      { name: 'Window Graphics', desc: 'Perforated or solid vinyl wraps.' },
      { name: 'Wall Murals', desc: 'Internal branding and environment design.' },
      { name: 'Frosted Glass', desc: 'Privacy film for offices and retail.' },
      { name: 'Floor Decals', desc: 'Directional and promotional flooring.' }
    ]
  },
  {
    title: 'Vehicle Media',
    slug: 'vehicle',
    icon: <Truck className="w-10 h-10" />,
    items: [
      { name: 'Full Vehicle Wraps', desc: 'Mobile billboards for cars and vans.' },
      { name: 'Partial Decals', desc: 'Strategic logo placement for fleets.' },
      { name: 'Magnetic Signs', desc: 'Removable branding for service vehicles.' },
      { name: 'One-Way Vision', desc: 'Rear window branding for visibility.' }
    ]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest mb-2 block font-black">Our Printing Powerhouse</span>
          <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.9] mb-8">
            Visibility <br /> <span className="text-brand-neon italic">Architecture</span>.
          </h1>
          <p className="text-white/50 max-w-xl font-mono text-[10px] uppercase tracking-[0.3em] leading-loose">
            From industrial signage to high-fidelity print. We own the production chain.
          </p>
        </div>

        <div className="space-y-32">
          {services.map((service, idx) => (
            <div key={service.slug} className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
              {/* Giant Index Number Background */}
              <div className="absolute -top-20 -left-10 text-[15rem] font-display font-black text-white/[0.02] select-none -z-10">
                0{idx + 1}
              </div>

              <div className="lg:col-span-5">
                <div className="mb-8 text-brand-neon">
                  {service.icon}
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase leading-none mb-8">
                  {service.title}
                </h2>
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/get-quote" 
                    className="w-fit bg-brand-neon text-brand-matte px-8 py-4 rounded-xl font-display font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    Get a Quote <ArrowRight size={16} />
                  </Link>
                  <Link 
                    to="/upload-design" 
                    className="w-fit text-white/50 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-widest flex items-center gap-2"
                  >
                    Have a file? Upload here <Plus size={14} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                 {service.items.map(item => (
                   <div key={item.name} className="p-8 bg-brand-charcoal border border-white/5 rounded-3xl hover:border-white/20 transition-all group">
                     <h3 className="text-lg font-display font-black uppercase tracking-tight text-white mb-2 group-hover:text-brand-neon transition-colors">
                       {item.name}
                     </h3>
                     <p className="text-white/40 text-xs font-mono uppercase tracking-widest leading-relaxed">
                       {item.desc}
                     </p>
                   </div>
                 ))}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Order Callout */}
        <div className="mt-40 p-20 bg-brand-charcoal rounded-[4rem] border border-white/5 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-brand-neon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
           <Printer className="mx-auto w-16 h-16 text-brand-neon mb-8" />
           <h2 className="text-4xl font-display font-black uppercase leading-none mb-4">Don’t see what you need?</h2>
           <p className="text-white/50 max-w-xl mx-auto mb-10 text-sm">
             Our facility is equipped for custom fabrication, CNC cutting, and specialized materials. If you can dream it, we can print and install it.
           </p>
           <Link to="/get-quote" className="inline-block bg-white text-brand-matte px-10 py-5 rounded-full font-display font-black uppercase tracking-widest text-sm hover:bg-brand-neon hover:text-brand-matte transition-all">
             Submit Custom Inquiry
           </Link>
        </div>
      </div>
    </div>
  );
}
