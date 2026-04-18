import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Zap, Target, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const packages = [
  {
    id: 'starter',
    title: 'The Founder Kit',
    price: '$45,000 JMD',
    badge: 'Best for new businesses',
    icon: <Zap className="w-8 h-8" />,
    bestFor: 'Startups and new store launches looking for Day 1 professionalism.',
    description: 'The core visibility essentials to establish your brand locally.',
    items: [
      'Logo Print Support & Verification',
      '500 Premium Business Cards',
      '1,000 Promotional Flyers',
      '1 Custom Vinyl Banner (3x6ft)',
      'Basic Directional Signage'
    ]
  },
  {
    id: 'growth',
    title: 'Market Penetration',
    price: '$120,000 JMD',
    badge: 'Most Popular',
    icon: <Star className="w-8 h-8 text-brand-neon" />,
    bestFor: 'Growing local businesses ready to own their street visibility.',
    description: 'High-impact signage and mobile media to dominate the local area.',
    items: [
      'Storefront Window Graphics (Full Wrap)',
      'A-Frame Sidewalk Sign',
      '2 Vehicle Door Decals',
      '5,000 Event Handouts',
      'Social Media "Opening Soon" Graphic'
    ],
    highlight: true
  },
  {
    id: 'premium',
    title: 'The Visibility Fortress',
    price: '$350,000 JMD+',
    badge: 'Revenue Accelerator',
    icon: <Target className="w-8 h-8 text-brand-neon" />,
    bestFor: 'Professional establishments requiring a complete architectural overhaul.',
    description: 'A total transformation of your physical and mobile presence.',
    items: [
      'Channel Lettering / Illumination',
      'Full Vehicle Wrap (SUV/Van)',
      'Complete Storefront Branding',
      'Large Format Billboard (1 Month)',
      'VIP Stationary Set (Letterheads/Envelopes)'
    ]
  }
];

export default function Packages() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest mb-2 block font-black">Strategic Revenue Packs</span>
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-6">
            Architected for <span className="text-brand-neon italic">Growth</span>.
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto font-mono text-[10px] uppercase tracking-widest leading-loose">
            Stop buying individual items. Start investing in a visibility system. These kits are engineered to scale your brand faster.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "relative flex flex-col p-10 rounded-3xl border transition-all duration-500",
                pkg.highlight 
                  ? "bg-white text-brand-matte border-white shadow-[0_0_50px_rgba(50,255,14,0.1)] -translate-y-4" 
                  : "bg-brand-charcoal border-white/5 text-white hover:border-brand-neon/30"
              )}
            >
              {pkg.badge && (
                <div className={cn(
                  "absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                  pkg.highlight ? "bg-brand-neon text-brand-matte" : "bg-white/10 text-brand-neon"
                )}>
                  {pkg.badge}
                </div>
              )}

              <div className="mb-8">
                <div className={cn("mb-6", pkg.highlight ? "text-brand-matte" : "text-brand-neon")}>
                  {pkg.icon}
                </div>
                <h3 className="text-3xl font-display font-black uppercase mb-2 leading-none">{pkg.title}</h3>
                <p className={cn("text-sm", pkg.highlight ? "text-brand-matte/60" : "text-white/40")}>{pkg.description}</p>
              </div>

              <div className="mb-10 space-y-4 flex-grow">
                 {pkg.items.map(item => (
                   <div key={item} className="flex items-start gap-3">
                     <Check className={cn("w-4 h-4 mt-0.5 shrink-0", pkg.highlight ? "text-brand-neon" : "text-brand-neon")} />
                     <span className={cn("text-[11px] font-mono uppercase tracking-widest leading-relaxed", pkg.highlight ? "text-brand-matte/80" : "text-white/70")}>{item}</span>
                   </div>
                 ))}
              </div>

              <div className="pt-8 border-t border-current opacity-20 mb-8" />

              <div className="space-y-6">
                <div>
                   <p className={cn("text-[10px] font-mono uppercase tracking-widest mb-1", pkg.highlight ? "text-brand-matte/40" : "text-white/40")}>Starting from</p>
                   <p className="text-3xl font-display font-black uppercase">{pkg.price}</p>
                </div>

                <Link 
                  to="/get-quote"
                  className={cn(
                    "w-full py-4 rounded-xl font-display font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95",
                    pkg.highlight ? "bg-brand-matte text-white" : "bg-brand-neon text-brand-matte"
                  )}
                >
                  Acquire Package
                  <ArrowRight size={18} />
                </Link>
                
                <p className={cn("text-center text-[9px] font-mono uppercase tracking-[0.2em]", pkg.highlight ? "text-brand-matte/50" : "text-white/30")}>
                   Best for: {pkg.bestFor}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-panel p-12 rounded-[3.5rem] border border-brand-neon/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/10 blur-[100px] -z-10" />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-display font-black uppercase leading-none mb-6">Need a custom <span className="text-brand-neon italic">Architecture</span>?</h2>
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  If your project spans multiple locations or requires a unique fabrication approach, our consultative design team can build a custom package tailored specifically to your revenue goals.
                </p>
                <Link to="/contact" className="text-brand-neon font-display font-bold uppercase tracking-widest border-b-2 border-brand-neon pb-2 flex items-center gap-2 w-fit">
                  Contact Specialist <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: 'Bulk Discount', sub: 'Save up to 25% on kits' },
                   { label: 'Brand Unity', sub: 'Identical colors across all media' },
                   { label: 'Priority Build', sub: 'Jump the queue' },
                   { label: 'Free Pre-press', sub: 'Artwork cleanup included' }
                 ].map(item => (
                   <div key={item.label} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
                     <p className="text-brand-neon font-display font-black uppercase tracking-tight mb-1">{item.label}</p>
                     <p className="text-white/30 text-[10px] uppercase font-mono tracking-widest leading-none">{item.sub}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
