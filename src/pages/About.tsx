import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Award, Printer, Users } from 'lucide-react';
import { cn } from '../lib/utils';

export default function About() {
  return (
    <div className="pt-24 pb-20 min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        {/* About Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-brand-neon/10 border border-brand-neon text-brand-neon font-bold text-[11px] uppercase tracking-widest mb-6">
              Establishment & Legacy
            </div>
            <h1 className="text-5xl md:text-7xl font-sans font-black uppercase tracking-tight leading-[0.9] mb-8">
              The Architecture <br /> of <span className="text-brand-neon italic">Presence.</span>
            </h1>
            <p className="text-lg text-brand-secondary leading-relaxed mb-8 max-w-xl">
              Nelson’s Signs & Printery isn't just a shop—it's where brands are engineered for impact. For years, we’ve served as the silent force behind Jamaica's most visible businesses, transforming raw ideas into powerful physical presence.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-black text-brand-text mb-1">15+</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary">Years of Visibility</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-brand-text mb-1">5k+</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary">Transformations</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[24px] overflow-hidden intake-shadow border border-brand-border bg-brand-charcoal">
               <img 
                src="https://picsum.photos/seed/printery-shop/1200/900" 
                alt="Inside the Printery" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
               <div className="absolute bottom-8 left-8">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-brand-neon flex items-center justify-center text-black">
                     <Printer size={24} />
                   </div>
                   <div>
                     <p className="text-white font-bold uppercase tracking-tight">Production Floor</p>
                     <p className="text-brand-neon text-[10px] font-bold uppercase">St. Ann, Jamaica</p>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </section>

        {/* Our Approach */}
        <section className="mb-24 py-24 bg-brand-charcoal rounded-[32px] border border-brand-border px-8 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-4 text-brand-text">What Drives Our Output?</h2>
            <div className="w-24 h-1 bg-brand-neon mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="text-brand-neon"><Users size={40} /></div>
              <h3 className="text-xl font-bold uppercase">Collaborative Strategy</h3>
              <p className="text-sm text-brand-secondary leading-loose">We don't take orders; we build partnerships. We work with you to understand the specific visibility challenges of your location and industry.</p>
            </div>
            <div className="space-y-4">
              <div className="text-brand-neon"><ShieldCheck size={40} /></div>
              <h3 className="text-xl font-bold uppercase">Industrial Precision</h3>
              <p className="text-sm text-brand-secondary leading-loose">Our substrates and inks are chosen for longevity. In the Jamaican climate, we ensure your brand doesn't just look good today, but for years to come.</p>
            </div>
            <div className="space-y-4">
              <div className="text-brand-neon"><Award size={40} /></div>
              <h3 className="text-xl font-bold uppercase">Elite Execution</h3>
              <p className="text-sm text-brand-secondary leading-loose">From the smallest business card to full architectural channel letters, our standard of excellence is unwavering.</p>
            </div>
          </div>
        </section>

        {/* Command Center (Contact & Map) */}
        <section id="location" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-2 text-brand-text">Command Center</h2>
              <p className="text-brand-secondary">Visit our production facility in the heart of St. Ann.</p>
            </div>

            <div className="bg-white p-8 rounded-[12px] intake-shadow text-black space-y-8">
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-brand-neon/10 text-black rounded-[8px]">
                   <MapPin size={24} />
                 </div>
                 <div>
                   <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-1">Headquarters</h4>
                   <p className="font-bold text-sm uppercase leading-tight">Nelson's Signs and Printery<br />Parry Town, Ocho Rios<br />St. Ann, Jamaica</p>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="p-3 bg-brand-neon/10 text-black rounded-[8px]">
                   <Phone size={24} />
                 </div>
                 <div>
                   <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-1">Direct Line</h4>
                   <p className="font-bold text-sm uppercase">+1 (876) 555-0123</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">WhatsApp & Voice</p>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="p-3 bg-brand-neon/10 text-black rounded-[8px]">
                   <Clock size={24} />
                 </div>
                 <div>
                   <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-1">Operations</h4>
                   <p className="font-bold text-sm uppercase">Mon - Fri: 8:00 AM - 5:00 PM</p>
                   <p className="font-bold text-sm uppercase">Sat: 9:00 AM - 1:00 PM</p>
                 </div>
              </div>

              <a 
                href="https://wa.me/18765550123" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-black text-white py-4 rounded-[6px] font-bold uppercase tracking-widest hover:bg-brand-neon hover:text-black transition-all"
              >
                Start a Conversation
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 h-[600px] w-full rounded-[24px] overflow-hidden intake-shadow border border-brand-border relative">
            {/* Google Map Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1430.4357418931142!2d-77.10431267597116!3d18.41190539162973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edaff83feaf3d9f%3A0xd874f2b525475ca4!2sNelson&#39;s%20Signs%20and%20Printery!5e0!3m2!1sen!2sjm!4v1713401527581!5m2!1sen!2sjm"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nelson's Signs and Printery Location"
              className="grayscale contrast-125 brightness-100"
            ></iframe>
            
            {/* Map Overlay for Dark Theme Integration */}
            <div className="absolute inset-0 pointer-events-none border-[12px] border-brand-charcoal/20" />
          </div>
        </section>
      </div>
    </div>
  );
}
