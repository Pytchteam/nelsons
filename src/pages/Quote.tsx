import React, { useState } from 'react';
import { motion } from 'motion/react';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CheckCircle2, ChevronRight, ChevronLeft, Upload, Send, Printer } from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimatePresence } from 'motion/react';

const STEPS = [
  { id: 'service', title: 'Product Type', subtitle: 'What do you need printed?' },
  { id: 'specs', title: 'Specifications', subtitle: 'Dimensions and details' },
  { id: 'contact', title: 'Contact', subtitle: 'Where should we send the quote?' }
];

export default function Quote() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    productType: '',
    dimensions: '',
    quantity: 1,
    specs: '',
    urgency: 'standard',
    name: '',
    email: '',
    phone: '',
    business: '',
    notes: ''
  });

  const handleFileUpload = async (leadId: string) => {
    if (!file) return null;
    const fileRef = ref(storage, `quotes/${leadId}/${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 1. Create Lead
      const leadRef = await addDoc(collection(db, 'leads'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.business,
        source: 'quote_wizard',
        status: 'New',
        createdAt: serverTimestamp()
      });

      // 2. Upload File if exists
      let fileUrl = null;
      if (file) {
        fileUrl = await handleFileUpload(leadRef.id);
      }

      // 3. Create Quote Request
      await addDoc(collection(db, 'quotes'), {
        leadId: leadRef.id,
        productType: formData.productType,
        dimensions: formData.dimensions,
        quantity: formData.quantity,
        specs: formData.specs,
        urgency: formData.urgency,
        notes: formData.notes,
        fileUrl,
        fileName: file?.name || null,
        status: 'New',
        createdAt: serverTimestamp()
      });

      setComplete(true);
    } catch (err) {
      console.error("Quote Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const next = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const back = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  if (complete) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-panel rounded-3xl p-10 text-center neon-glow"
        >
          <div className="w-20 h-20 bg-brand-neon rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="text-brand-matte w-10 h-10" />
          </div>
          <h1 className="text-4xl font-display font-black uppercase mb-4">Request <span className="text-brand-neon">Locked In</span></h1>
          <p className="text-white/60 mb-8 font-mono text-xs uppercase tracking-widest leading-loose">
            We've received your specs. Our production desk is reviewing your requirements now. Expect a response within 4-12 business hours.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-brand-neon text-brand-matte py-4 rounded-xl font-display font-black uppercase tracking-widest"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Progress Sidebar */}
          <div className="lg:col-span-4 space-y-8">
             <div>
                <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest mb-2 block">Premium Quote Wizard</span>
                <h1 className="text-5xl font-display font-black uppercase tracking-tighter leading-none mb-6">
                  Get Your <br /> Visibility <br /> <span className="text-brand-neon italic">Priced</span>.
                </h1>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  Detailed specs lead to precise quotes and faster turnaround.
                </p>
             </div>

             <div className="space-y-4">
                {STEPS.map((step, idx) => (
                  <div key={step.id} className={cn(
                    "flex items-center gap-4 transition-opacity",
                    currentStep >= idx ? "opacity-100" : "opacity-30"
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs",
                      currentStep === idx ? "bg-brand-neon text-brand-matte" : "border border-white/20 text-white"
                    )}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">{step.title}</h4>
                      <p className="text-[9px] uppercase tracking-widest text-white/40">{step.subtitle}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Wizard Form */}
          <div className="lg:col-span-8">
            <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-display font-black uppercase">What's the project?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['Signage', 'Vehicle Graphics', 'Banners', 'Business Cards', 'Flyers/Print', 'Stickers/Labels', 'Other'].map(type => (
                        <button
                          key={type}
                          onClick={() => setFormData({...formData, productType: type})}
                          className={cn(
                            "p-4 rounded-xl border text-left font-display font-bold uppercase text-xs tracking-widest transition-all",
                            formData.productType === type 
                              ? "bg-brand-neon border-brand-neon text-brand-matte" 
                              : "bg-white/5 border-white/10 text-white hover:border-brand-neon/50"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-display font-black uppercase">Architectural Specs</h3>
                    <div className="grid grid-cols-1 gap-6">
                       <div className="space-y-2">
                         <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Dimensions (e.g., 4ft x 8ft)</label>
                         <input 
                            type="text" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none"
                            placeholder="Enter size..."
                            value={formData.dimensions}
                            onChange={e => setFormData({...formData, dimensions: e.target.value})}
                         />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Quantity</label>
                           <input 
                              type="number" 
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none"
                              value={formData.quantity}
                              onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Urgency</label>
                           <select 
                              className="w-full bg-brand-charcoal border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none text-white/70"
                              value={formData.urgency}
                              onChange={e => setFormData({...formData, urgency: e.target.value})}
                           >
                             <option value="standard">Standard (3-5 days)</option>
                             <option value="urgent">Urgent (48 hours)</option>
                             <option value="rush">Next Day Rush</option>
                           </select>
                         </div>
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Artwork (Optional)</label>
                         <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-brand-neon transition-colors">
                           <input 
                              type="file" 
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={(e) => setFile(e.target.files?.[0] || null)}
                           />
                           <Upload className={cn("mx-auto w-8 h-8 mb-4 transition-colors", file ? "text-brand-neon" : "text-white/20")} />
                           <p className="text-xs uppercase font-mono tracking-widest">
                             {file ? file.name : 'Drop file or click to upload'}
                           </p>
                         </div>
                       </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-display font-black uppercase">Final Identity</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <input 
                          type="text" required placeholder="Name" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                       />
                       <input 
                          type="text" placeholder="Company" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none"
                          value={formData.business}
                          onChange={e => setFormData({...formData, business: e.target.value})}
                       />
                    </div>
                    <input 
                       type="email" required placeholder="Email Address" 
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none"
                       value={formData.email}
                       onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <textarea 
                       rows={4} placeholder="Additional notes or specific instructions..."
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none resize-none"
                       value={formData.notes}
                       onChange={e => setFormData({...formData, notes: e.target.value})}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-12 flex justify-between items-center">
                <button 
                  onClick={back}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 text-white/40 hover:text-white disabled:opacity-0 transition-opacity uppercase font-mono text-[10px] tracking-widest"
                >
                  <ChevronLeft size={16} /> Back
                </button>

                {currentStep < STEPS.length - 1 ? (
                  <button 
                    onClick={next}
                    disabled={!formData.productType && currentStep === 0}
                    className="bg-brand-neon text-brand-matte px-8 py-3 rounded-xl font-display font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    Continue <ChevronRight size={18} />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    disabled={loading || !formData.email || !formData.name}
                    className="bg-brand-neon text-brand-matte px-10 py-4 rounded-xl font-display font-black uppercase tracking-widest flex items-center gap-2 hover:neon-glow transition-all"
                  >
                    {loading ? 'Transmitting...' : (
                      <>
                        Request Quote <Send size={18} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
            
            {/* Context Info */}
            <div className="mt-8 grid grid-cols-2 gap-4">
               <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="w-8 h-8 rounded bg-brand-neon/10 flex items-center justify-center text-brand-neon">
                    <Printer size={16} />
                 </div>
                 <p className="text-[9px] uppercase tracking-widest leading-none">Standard turnaround is 3-5 days for most signage.</p>
               </div>
               <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="w-8 h-8 rounded bg-brand-neon/10 flex items-center justify-center text-brand-neon">
                    <CheckCircle2 size={16} />
                 </div>
                 <p className="text-[9px] uppercase tracking-widest leading-none">Ocho Rios Medical, Jamaica National & more trust our team.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
