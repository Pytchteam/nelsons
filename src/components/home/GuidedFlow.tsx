import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, TrendingUp, Sparkles, Printer, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const steps = [
  {
    id: 'start',
    icon: <Rocket className="w-10 h-10" />,
    title: 'Start a Business',
    description: 'I need the essentials to look professional from Day 1.',
    recommendation: {
      type: 'Starter Brand Kit',
      link: '/packages#starter',
      items: ['Business Cards', 'Flyers', 'Basic Storefront Sign', 'Logo Support']
    }
  },
  {
    id: 'promote',
    icon: <TrendingUp className="w-10 h-10" />,
    title: 'Promote an Event',
    description: 'I need to get the word out fast and at scale.',
    recommendation: {
      type: 'Promo Pack',
      link: '/packages#growth',
      items: ['Vinyl Banners', 'Poster Sets', 'Window Perforation', 'Handouts']
    }
  },
  {
    id: 'upgrade',
    icon: <Sparkles className="w-10 h-10" />,
    title: 'Upgrade My Store',
    description: 'I want to modernize my signage and storefront.',
    recommendation: {
      type: 'Visibility System',
      link: '/packages#premium',
      items: ['Channel Letters', 'Vehicle Wraps', 'Directional Signage', 'Window Wraps']
    }
  },
  {
    id: 'custom',
    icon: <Printer className="w-10 h-10" />,
    title: 'Print Something Simple',
    description: 'I already have a file and just need quick output.',
    recommendation: {
      type: 'Direct Upload',
      link: '/upload-design',
      items: ['High-speed Printing', 'Standard Materials', 'Local Pickup']
    }
  }
];

export default function GuidedFlow() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="bg-white text-black p-8 md:p-12 rounded-[12px] intake-shadow relative overflow-visible">
        {/* Decorative Neon Square */}
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-brand-neon rounded-[4px] -z-10" />
        
        <div className="mb-10">
          <div className="text-[11px] font-bold uppercase tracking-widest opacity-40 mb-2">Step 1 of 3</div>
          <h2 className="text-3xl font-sans font-black uppercase tracking-tight leading-tight">What are you trying <br /> to get done?</h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {steps.map((step) => (
            <motion.button
              key={step.id}
              onClick={() => setSelected(step.id)}
              whileHover={{ x: 5 }}
              className={cn(
                "flex items-center justify-between p-5 rounded-[8px] border-2 transition-all duration-200 text-left group",
                selected === step.id 
                  ? "bg-black border-black text-white" 
                  : "bg-transparent border-[#EEEEEE] text-black hover:bg-gray-50 hover:border-gray-300"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "transition-colors",
                  selected === step.id ? "text-brand-neon" : "text-gray-400 group-hover:text-black"
                )}>
                  {React.cloneElement(step.icon as React.ReactElement, { size: 24, className: 'w-6 h-6' })}
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest">{step.title}</h3>
                </div>
              </div>
              <ArrowRight size={18} className={cn("transition-transform", selected === step.id ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0")} />
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 pt-8 border-t border-gray-100"
            >
              <div className="bg-gray-50 p-6 rounded-[8px] flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100">
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Our Recommendation</span>
                  <h4 className="text-xl font-bold uppercase tracking-tight text-black mb-3">
                    {steps.find(s => s.id === selected)?.recommendation.type}
                  </h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {steps.find(s => s.id === selected)?.recommendation.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <Check className="w-3 h-3 text-brand-neon" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <Link 
                  to={steps.find(s => s.id === selected)?.recommendation.link || '/'}
                  className="bg-black text-white px-8 py-4 rounded-[6px] font-bold uppercase text-[12px] tracking-widest flex items-center gap-3 hover:bg-brand-neon hover:text-black transition-all shadow-lg shadow-black/10"
                >
                  Configure Solution
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <p className="mt-6 text-[11px] text-center text-gray-400 font-medium uppercase tracking-widest">
          Guided Intake & Solution Recommendation
        </p>
      </div>
    </div>
  );
}
