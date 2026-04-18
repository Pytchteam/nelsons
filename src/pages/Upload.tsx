import React, { useState } from 'react';
import { motion } from 'motion/react';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Upload as UploadIcon, FileUp, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: 1,
    material: 'vinyl',
    finish: 'gloss',
    correction: 'no',
    delivery: 'pickup',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    try {
      // 1. Create Lead
      const leadRef = await addDoc(collection(db, 'leads'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: 'upload_workflow',
        status: 'New',
        createdAt: serverTimestamp()
      });

      // 2. Upload File
      const fileRef = ref(storage, `uploads/${leadRef.id}/${file.name}`);
      await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(fileRef);

      // 3. Create Quote/Order Request
      await addDoc(collection(db, 'quotes'), {
        leadId: leadRef.id,
        productType: 'Digital Upload Request',
        fileUrl,
        fileName: file.name,
        quantity: formData.quantity,
        specs: `Material: ${formData.material}, Finish: ${formData.finish}, Design Correction: ${formData.correction}, Option: ${formData.delivery}`,
        notes: formData.notes,
        status: 'New',
        createdAt: serverTimestamp()
      });

      setComplete(true);
    } catch (err) {
      console.error("Upload Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (complete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass-panel rounded-3xl p-10 text-center"
        >
          <div className="w-20 h-20 bg-brand-neon rounded-full flex items-center justify-center mx-auto mb-8">
            <FileUp className="text-brand-matte w-10 h-10" />
          </div>
          <h1 className="text-4xl font-display font-black uppercase mb-4">Upload <span className="text-brand-neon">Complete</span></h1>
          <p className="text-white/60 mb-8 font-mono text-xs tracking-widest leading-loose">
            Your artwork has been safely transmitted to our pre-press team. We'll verify the resolution and send you a digital proof shortly.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-brand-neon text-brand-matte py-4 rounded-xl font-display font-black uppercase tracking-widest"
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest mb-2 block font-black">Fast-Track Production</span>
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-4 leading-none">
            Upload Your <br /> <span className="text-brand-neon italic">Masterpiece</span>.
          </h1>
          <p className="text-white/50 max-w-xl mx-auto font-mono text-[10px] uppercase tracking-widest">
            Send us your high-res files (PDF, AI, CDR, TIFF) for direct-to-print verification.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* File Upload Zone */}
          <div className="space-y-6">
            <div 
              className={cn(
                "relative h-[400px] border-4 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 transition-all",
                file ? "border-brand-neon bg-brand-neon/5" : "border-white/10 hover:border-brand-neon/50 bg-brand-charcoal"
              )}
            >
              <input 
                type="file" 
                required
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className={cn("p-6 rounded-full mb-6 transition-colors", file ? "bg-brand-neon text-brand-matte" : "bg-white/5 text-brand-neon")}>
                <UploadIcon size={40} />
              </div>
              <h3 className="text-xl font-display font-black uppercase mb-2">
                {file ? file.name : 'Choose File'}
              </h3>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Max size 50MB (PDF, AI, JPG)'}
              </p>
              
              {!file && (
                <div className="mt-8 flex items-center gap-2 text-[9px] font-mono text-brand-neon uppercase tracking-widest">
                  <AlertCircle size={12} />
                  300DPI Resolution Recommended
                </div>
              )}
            </div>

            <div className="p-8 bg-brand-charcoal border border-white/5 rounded-3xl space-y-4">
               <h4 className="text-xs font-display font-bold uppercase tracking-widest text-brand-neon decoration-white/20 underline underline-offset-4">Turnaround Preference</h4>
               <div className="flex gap-4">
                 {['Next Day', 'Express (48h)', 'Standard'].map(opt => (
                    <button key={opt} type="button" className="flex-1 py-3 bg-white/5 rounded-lg border border-white/5 text-[9px] font-mono uppercase tracking-widest hover:border-white/20 transition-colors">
                      {opt}
                    </button>
                 ))}
               </div>
            </div>
          </div>

          {/* Configuration Form */}
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-10 space-y-6">
               <div className="grid grid-cols-2 gap-4">
                 <input 
                    required type="text" placeholder="Your Name" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none text-sm"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                 />
                 <input 
                    type="text" placeholder="Phone Number" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none text-sm"
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                 />
               </div>
               <input 
                  required type="email" placeholder="Email Address" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none text-sm"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
               />

               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                   <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest ml-1">Quantity</label>
                   <input 
                      type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none text-sm"
                      value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                   />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest ml-1">Material</label>
                   <select 
                      className="w-full bg-brand-charcoal border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none text-sm text-white/70"
                      value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})}
                   >
                     <option value="vinyl">Standard Vinyl</option>
                     <option value="banner">Heavyweight Banner</option>
                     <option value="foam">Foam Core Board</option>
                     <option value="metal">ACM (Aluminum Metal)</option>
                   </select>
                 </div>
               </div>

               <div className="space-y-1">
                 <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest ml-1">Need Design Correction?</label>
                 <div className="grid grid-cols-2 gap-2">
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, correction: 'yes'})}
                      className={cn("py-3 rounded-lg border text-[9px] uppercase tracking-widest transition-all", formData.correction === 'yes' ? 'bg-brand-neon border-brand-neon text-brand-matte' : 'bg-white/5 border-white/5 text-white')}
                    >
                      Yes (Fix my spacing/res)
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, correction: 'no'})}
                      className={cn("py-3 rounded-lg border text-[9px] uppercase tracking-widest transition-all", formData.correction === 'no' ? 'bg-white/5 border-white/5 text-white' : 'bg-white/5 border-white/5 text-white')}
                    >
                      No (Print exactly as is)
                    </button>
                 </div>
               </div>

               <textarea 
                  placeholder="Special instructions or finishing details..." rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-neon outline-none text-sm resize-none"
                  value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
               />

               <button 
                  disabled={loading || !file}
                  type="submit"
                  className="w-full bg-brand-neon text-brand-matte py-5 rounded-2xl font-display font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:neon-glow transition-all disabled:opacity-50"
               >
                  {loading ? 'Processing Transmission...' : 'Transmit Artwork to Print'}
                  <ArrowRight size={20} />
               </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
