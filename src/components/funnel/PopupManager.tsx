import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Clock, Upload, Send, Sparkles } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { cn } from '../../lib/utils';

export default function PopupManager() {
  const [activePopup, setActivePopup] = useState<'entry' | 'exit' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', business: '', intent: '' });

  useEffect(() => {
    // 1. Entry Popup Logic (After 5 seconds)
    const entryTimer = setTimeout(() => {
      const hasSeenEntry = sessionStorage.getItem('hasSeenEntryPopup');
      if (!hasSeenEntry && !activePopup) {
        setActivePopup('entry');
        sessionStorage.setItem('hasSeenEntryPopup', 'true');
      }
    }, 5000);

    // 2. Exit Intent Logic
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        const hasSeenExit = sessionStorage.getItem('hasSeenExitPopup');
        if (!hasSeenExit && !activePopup) {
          setActivePopup('exit');
          sessionStorage.setItem('hasSeenExitPopup', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      clearTimeout(entryTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activePopup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        status: 'New',
        source: activePopup === 'entry' ? 'entry_popup' : 'exit_popup',
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setActivePopup(null);
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Popup Error:", err);
    }
  };

  const closePopup = () => setActivePopup(null);

  return (
    <AnimatePresence>
      {activePopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-matte/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-white text-black rounded-[12px] overflow-hidden relative intake-shadow"
          >
            <button 
              onClick={closePopup}
              className="absolute top-6 right-6 text-black/30 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-10">
              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-brand-neon rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="text-brand-matte w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-sans font-black uppercase mb-4">You're on the Radar</h3>
                  <p className="text-gray-500">One of our visibility specialists will reach out shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 text-brand-neon mb-4">
                      {activePopup === 'entry' ? <Sparkles size={24} /> : <Clock size={24} />}
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                        {activePopup === 'entry' ? 'Start Your Legacy' : 'Hold Up!'}
                      </span>
                    </div>
                    <h3 className="text-4xl font-sans font-black uppercase leading-none">
                      {activePopup === 'entry' ? 'What are you Building?' : 'Wait, Need a Quick Quote?'}
                    </h3>
                    <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                      Capture high-converting visibility for your business. Let's get the details right.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        required
                        type="text" 
                        placeholder="Name" 
                        className="bg-gray-50 border border-gray-100 rounded-[8px] px-4 py-3 text-sm focus:border-brand-neon outline-none placeholder:text-gray-400"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder="Company Name" 
                        className="bg-gray-50 border border-gray-100 rounded-[8px] px-4 py-3 text-sm focus:border-brand-neon outline-none placeholder:text-gray-400"
                        value={formData.business}
                        onChange={e => setFormData({...formData, business: e.target.value})}
                      />
                    </div>
                    <input 
                      required
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-[8px] px-4 py-3 text-sm focus:border-brand-neon outline-none placeholder:text-gray-400"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <select 
                      className="w-full bg-gray-50 border border-gray-100 rounded-[8px] px-4 py-3 text-sm focus:border-brand-neon outline-none text-gray-500"
                      value={formData.intent}
                      onChange={e => setFormData({...formData, intent: e.target.value})}
                    >
                      <option value="">What's your goal?</option>
                      <option value="start_business">Start a New Business</option>
                      <option value="promote">Promote an Event/Product</option>
                      <option value="signage">New Physical Signage</option>
                      <option value="custom">Custom Print Job</option>
                    </select>

                    <button 
                      type="submit"
                      className="w-full bg-black text-white py-4 rounded-[6px] font-bold uppercase tracking-widest hover:bg-brand-neon hover:text-black transition-all flex items-center justify-center gap-3"
                    >
                      {activePopup === 'entry' ? 'Get Started' : 'Send Quote Request'}
                      <ArrowRight size={20} />
                    </button>
                  </form>
                </>
              )}
            </div>
            
            {/* Design Ornament */}
            <div className="h-2 bg-brand-neon absolute bottom-0 left-0 right-0" />
            <div className="absolute top-2 right-2 w-6 h-6 bg-brand-neon/10 rounded-[4px] -z-10" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ArrowRight({ size }: { size: number }) {
  return <motion.svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></motion.svg>;
}
