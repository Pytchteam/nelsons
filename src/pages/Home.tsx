import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Star, Zap, Target, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import GuidedFlow from '../components/home/GuidedFlow';
import ServicePillars from '../components/home/ServicePillars';
import TransformationSlider from '../components/home/TransformationSlider';
import IndustryTargeting from '../components/home/IndustryTargeting';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-neon/5 to-transparent -z-10" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-neon/10 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-brand-neon/10 border border-brand-neon text-brand-neon font-bold text-[11px] uppercase tracking-widest mb-4">
                Business Visibility Partner
              </div>
              
              <h1 className="text-6xl md:text-[64px] font-sans font-black leading-[0.95] tracking-[-2px] uppercase mb-6">
                Make Your Business <br />
                <span className="text-brand-neon italic">Impossible</span> <br />
                to Ignore.
              </h1>
              
              <p className="text-lg text-brand-secondary max-w-[500px] mb-8 leading-[1.4]">
                We don’t just print. We position brands for growth with premium signage, vehicle wraps, and commercial visibility systems.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/get-quote" 
                  className="bg-brand-neon text-brand-matte px-8 py-5 rounded font-display font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all text-sm group"
                >
                  Get a Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/build-product" 
                  className="bg-brand-text text-brand-matte px-8 py-5 rounded font-display font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all text-sm group"
                >
                  <Hammer className="w-5 h-5 text-brand-neon" />
                  Build Your Brand
                </Link>
                <Link 
                  to="/portfolio" 
                  className="border border-brand-border hover:border-brand-neon text-brand-text px-8 py-5 rounded font-display font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-colors text-sm"
                >
                  View Transformations
                </Link>
              </div>

              {/* Trust Strip Local */}
              <div className="mt-12 flex flex-wrap gap-8 opacity-50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-neon" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">48Hr Priority Turnaround</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-neon" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Brand-Grade Materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-neon" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Local Design Support</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square relative flex items-center justify-center">
                {/* Visual Representation of "Visibility" */}
                <div className="absolute inset-0 border-[20px] border-brand-neon/5 rounded-3xl animate-pulse" />
                <div className="absolute inset-10 border border-white/10 rounded-2xl" />
                <div className="relative z-10 w-full h-full bg-brand-charcoal rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border border-white/10">
                   <img 
                    src="https://picsum.photos/seed/printing/1000/1000" 
                    alt="Premium Signage Example"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-matte via-transparent to-transparent" />
                   <div className="absolute bottom-8 left-8 right-8">
                     <span className="text-[10px] font-mono text-brand-neon uppercase tracking-widest mb-2 block">Featured Transformation</span>
                     <h3 className="text-2xl font-display font-bold uppercase tracking-tight">Ocho Rios Medical Center</h3>
                     <p className="text-sm text-white/50 mt-1 uppercase tracking-widest font-mono">Full External Branding System</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guided Intent Flow */}
      <section className="bg-brand-charcoal py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-4">
              What are you trying to achieve?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto italic">
              Instead of browsing a catalog, tell us your goal. We'll architect the solution.
            </p>
          </div>
          <GuidedFlow />
        </div>
      </section>

      {/* Service Pillars */}
      <section className="py-24">
        <ServicePillars />
      </section>

      {/* Build Your Own Section */}
      <section className="py-24 bg-brand-charcoal overflow-hidden border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* Abstract Visual of Building */}
              <div className="aspect-square bg-white rounded-[24px] intake-shadow p-12 flex flex-col justify-between text-black relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/10 rounded-full blur-3xl" />
                
                <div>
                  <div className="w-16 h-16 bg-black text-brand-neon rounded-[12px] flex items-center justify-center mb-8">
                    <Hammer size={32} />
                  </div>
                  <h3 className="text-4xl font-black uppercase leading-tight mb-4 tracking-tighter">
                    Architect Your Own <br /> <span className="text-brand-neon bg-black px-2">Visibility</span> Job.
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                    Upload your own master files, specify dimensions, and choose your substrate. We handle the architectural rendering and precision output.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-black/40">
                    <div className="w-8 h-[1px] bg-black/20" />
                    Proprietary Build System
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-full h-1 bg-brand-neon rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest mb-4 block">New Protocol</span>
              <h2 className="text-5xl md:text-6xl font-sans font-black uppercase tracking-tight leading-[0.9] mb-8">
                The Master <br /> Build Protocol.
              </h2>
              <div className="space-y-8 mb-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border border-brand-neon flex items-center justify-center shrink-0 font-bold text-brand-neon">01</div>
                  <div>
                    <h4 className="font-bold uppercase mb-1">Select Substrate</h4>
                    <p className="text-sm text-brand-secondary">Choose from high-performance vinyl, aluminum, acrylic, or textile systems.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border border-brand-neon flex items-center justify-center shrink-0 font-bold text-brand-neon">02</div>
                  <div>
                    <h4 className="font-bold uppercase mb-1">Input Scale</h4>
                    <p className="text-sm text-brand-secondary">Define precise dimensions for architectural integration.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border border-brand-neon flex items-center justify-center shrink-0 font-bold text-brand-neon">03</div>
                  <div>
                    <h4 className="font-bold uppercase mb-1">Upload Assets</h4>
                    <p className="text-sm text-brand-secondary">Securely bridge your design files to our production floor.</p>
                  </div>
                </div>
              </div>

              <Link 
                to="/build-product" 
                className="inline-flex items-center gap-4 bg-brand-neon text-brand-matte px-10 py-5 rounded-[8px] font-display font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
              >
                Launch Builder
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Slider */}
      <section className="bg-brand-charcoal py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
          <div>
            <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest mb-2 block">Before & After</span>
            <h2 className="text-4xl font-display font-black uppercase">From Dark to <span className="text-brand-neon italic">Visible</span></h2>
          </div>
          <Link to="/portfolio" className="text-xs font-mono uppercase tracking-widest border-b border-brand-neon pb-1 hover:text-brand-neon transition-colors">See all work</Link>
        </div>
        <TransformationSlider />
      </section>

      {/* Industry Targeting */}
      <section className="py-24 border-t border-white/5">
        <IndustryTargeting />
      </section>

      {/* CTA Final */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-neon -z-10 translate-y-1/2" />
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase mb-8 leading-none">
              Ready to be <br />
              <span className="text-brand-neon bg-brand-matte px-4 py-2 inline-block -rotate-1">Unmissable?</span>
            </h2>
            <Link 
                to="/get-quote" 
                className="inline-flex items-center gap-4 bg-white text-brand-matte px-12 py-6 rounded-full font-display font-black uppercase tracking-tighter text-xl hover:scale-110 active:scale-95 transition-transform"
            >
                Launch Your Brand
                <Target className="w-8 h-8" />
            </Link>
        </div>
      </section>
    </div>
  );
}
