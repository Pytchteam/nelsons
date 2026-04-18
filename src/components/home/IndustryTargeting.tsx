import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Car, Music, ShoppingBag, HardHat, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const industries = [
  { name: 'Restaurants', icon: <Utensils /> },
  { name: 'Car Dealers', icon: <Car /> },
  { name: 'Events', icon: <Music /> },
  { name: 'Retail Stores', icon: <ShoppingBag /> },
  { name: 'Contractors', icon: <HardHat /> },
];

export default function IndustryTargeting() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest mb-2 block">Who We Help</span>
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight">Tailored solutions for <span className="text-brand-neon">Every Vertical</span></h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {industries.map((industry, idx) => (
          <motion.div
            key={industry.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link 
              to="/get-quote"
              className="group flex flex-col items-center justify-center p-8 bg-brand-charcoal border border-white/5 rounded-2xl hover:border-brand-neon hover:bg-brand-neon/5 transition-all aspect-square"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-brand-neon group-hover:text-brand-matte transition-all mb-4">
                {industry.icon}
              </div>
              <h3 className="text-sm font-display font-black uppercase tracking-widest group-hover:text-brand-neon transition-colors text-center">
                {industry.name}
              </h3>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-brand-neon" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
