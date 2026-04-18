import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Info } from 'lucide-react';

const projects = [
  {
    title: "Storefront Revival",
    category: "Store Branding",
    before: "https://picsum.photos/seed/oldstore/800/600",
    after: "https://picsum.photos/seed/newstore/800/600",
    impact: "+200% Walk-in traffic reported"
  },
  {
    title: "Vehicle Fleet Overhaul",
    category: "Mobile Media",
    before: "https://picsum.photos/seed/oldcar/800/600",
    after: "https://picsum.photos/seed/newcar/800/600",
    impact: "Built-in trust for service calls"
  },
  {
    title: "Office Wall Graphics",
    category: "Internal Branding",
    before: "https://picsum.photos/seed/oldwall/800/600",
    after: "https://picsum.photos/seed/newwall/800/600",
    impact: "Employee morale boost"
  }
];

export default function TransformationSlider() {
  const [active, setActive] = useState(0);
  const [showAfter, setShowAfter] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Gallery Selection */}
        <div className="lg:col-span-4 space-y-4">
          {projects.map((project, idx) => (
            <button
              key={project.title}
              onClick={() => { setActive(idx); setShowAfter(true); }}
              className={`w-full text-left p-6 rounded-2xl transition-all border ${
                active === idx 
                  ? 'bg-white text-brand-matte border-white' 
                  : 'bg-transparent border-brand-border text-brand-secondary hover:border-white/30'
              }`}
            >
              <span className={`text-[10px] font-mono uppercase tracking-[0.2em] mb-2 block ${active === idx ? 'text-brand-matte/50' : 'text-brand-neon'}`}>
                {project.category}
              </span>
              <h4 className="text-xl font-display font-black uppercase tracking-tight">{project.title}</h4>
              {active === idx && (
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-brand-neon uppercase tracking-widest">
                  <Info className="w-3 h-3" />
                  {project.impact}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Visual Comparison Area */}
        <div className="lg:col-span-8 relative">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl">
            <motion.img 
              key={active + (showAfter ? 'after' : 'before')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={showAfter ? projects[active].after : projects[active].before} 
              alt="Transformation"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Controls */}
            <div className="absolute top-6 right-6 flex gap-2">
              <button 
                onClick={() => setShowAfter(false)}
                className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${!showAfter ? 'bg-brand-neon text-brand-matte' : 'bg-brand-matte/50 backdrop-blur text-white'}`}
              >
                Before
              </button>
              <button 
                onClick={() => setShowAfter(true)}
                className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${showAfter ? 'bg-brand-neon text-brand-matte' : 'bg-brand-matte/50 backdrop-blur text-white'}`}
              >
                After
              </button>
            </div>

            <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-brand-matte/50 backdrop-blur px-4 py-2 rounded-full border border-white/10">
               <Eye className="w-4 h-4 text-brand-neon" />
               <span className="text-[10px] font-mono uppercase tracking-[0.25em]">Click to compare</span>
            </div>
          </div>
          
          {/* Neon Glow under active image */}
          <div className="absolute -inset-4 bg-brand-neon/5 blur-[100px] -z-10" />
        </div>
      </div>
    </div>
  );
}
